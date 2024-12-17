const { Property, Payment, User } = require("../models/index");
const axios = require("axios"); // Import Axios for HTTP requests

const PAYSTACK_SECRET_KEY = "sk_test_f15f02047d10b50011b80cf0430fa5ac52552861";
const PAYSTACK_BASE_URL = "https://api.paystack.co";

const makePayment = async (req, res) => {
  try {
    const { propertyId, tenantId, amount, email } = req.body;

    // Validate input
    if (!propertyId || !tenantId || !amount || !email) {
      return res.status(400).json({
        error: "Property ID, Tenant ID, Amount, and Email are required",
      });
    }

    // Ensure property exists
    const property = await Property.findOne({ where: { id: propertyId } });
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Ensure tenant exists
    const tenant = await User.findOne({ where: { id: tenantId } });
    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    // Initialize a Paystack transaction
    const paystackResponse = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: parseInt(amount * 100), // Convert amount to kobo (Paystack uses kobo)
        metadata: {
          propertyId,
          tenantId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract authorization URL (redirect link to Paystack payment page)
    const { authorization_url, access_code, reference } = paystackResponse.data.data;

    // Save the payment record as "Pending" in the database
    await Payment.create({
      propertyId,
      tenantId,
      amount,
      commission: amount * 0.05, // Example: 5% commission
      status: "pending",
      reference, // Save the Paystack payment reference
    });

    // Return Paystack payment link
    res.status(201).json({
      message: "Payment initiated successfully",
      authorization_url, // Send this link to the client to complete payment
      reference,
    });
  } catch (error) {
    console.error("Error initializing payment:", error.response?.data || error.message);

    res.status(500).json({
      error: "An error occurred while initiating the payment",
      details: error.response?.data || error.message,
    });
  }
};

module.exports = { makePayment };