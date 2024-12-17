const { Property, Payment } = require('../models/index');


const makePayment = async (req, res) => {
  try {
    const { propertyId, tenantId, amount } = req.body;

    // Validate input
    if (!propertyId || !tenantId || !amount) {
      return res.status(400).json({ error: 'Property ID, Tenant ID, and Amount are required' });
    }

    // Find the property to ensure it exists
    const property = await Property.findOne({ where: { id: propertyId } });
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Find the tenant to ensure they exist
    const tenant = await Tenant.findOne({ where: { id: tenantId } });
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // Create a new payment record
    const payment = await Payment.create({
      propertyId,
      tenantId,
      amount,
      status: 'Pending',
    });

    // Simulate payment processing (e.g., integration with a payment gateway)
    // For now, we'll just mark it as completed
    payment.status = 'Completed';
    await payment.save();

    // Respond with payment details
    res.status(201).json({
      message: 'Payment processed successfully',
      payment,
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'An error occurred while processing the payment' });
  }
};

module.exports = { makePayment };