const { Property } = require("../models/Property");
const { Op } = require("sequelize");
const { Landlord } = require("../models/Landlord");

const uploadProperty = async (req, res) => {
  try {
    // Extract landlord ID from the authenticated user
    const landlordId = req.user.id;
    const { type, location, phoneNumber } = req.body;

    // Create a new property
    const property = await Property.create({
      type,
      location,
      phoneNumber,
      landlordId,
    });

    res.status(201).json({
      message: "Property uploaded successfully",
      property,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const searchProperties = async (req, res) => {
  try {
    const { minPrice, maxPrice, location, limit = 10, offset = 0 } = req.query;

    // Build the query filters dynamically
    const filters = {};
    if (minPrice) filters.price = { [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) filters.price = { ...filters.price, [Op.lte]: parseFloat(maxPrice) };
    if (location) filters.location = { [Op.iLike]: `%${location}%` }; 
    
    // Fetch filtered properties with pagination
    const { rows: properties, count: total } = await Property.findAndCountAll({
      where: filters,
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: ["id", "title", "description", "price", "location", "contactDetails"],
    });

    res.status(200).json({
      properties,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getPropertyDetails = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Find the property with associated landlord details
    const property = await Property.findOne({
      where: { id: propertyId },
      attributes: ["id", "title", "description", "price", "location", "imageUrl"],
      include: [
        {
          model: Landlord,
          attributes: ["name", "contactDetails"],
          as: "landlord",
        },
      ],
    });

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ property });
  } catch (error) {
    console.error("Error fetching property details:", error);
    res.status(500).json({ error: "An error occurred while retrieving property details" });
  }
};

module.exports = {
  uploadProperty,
  searchProperties,
  getPropertyDetails,
};