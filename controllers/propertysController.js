const { Op } = require("sequelize");
const { User, Property } = require("../models/index")

const uploadProperty = async (req, res) => {
  try {
    // Extract landlord ID from the authenticated user
    const landlordId = req.user.id;
    const { location, imageUrl, title, description, price } = req.body;

    // Create a new property
    const property = await Property.create({
      location,
      imageUrl,
      title,
      description,
      price,
      landlordId
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
      const { location } = req.query;

      const whereClause = {};
      if (location) whereClause.location = { [Op.iLike]: `%${location}%` };

      const properties = await Property.findAll({ where: whereClause });
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


const getPropertyDetails = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Find the property with associated landlord details (User)
    const property = await Property.findOne({
      where: { id: propertyId },
      attributes: ["id", "title", "description", "price", "location", "imageUrl"],
      include: [
        {
          model: User,
          as: "landlord", // Ensure this matches the alias in your association
          attributes: ["firstname", "lastname", "email"],
        },
      ],
    });

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ property });
  } catch (error) {
    console.error("Error fetching property details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving property details" });
  }
};

module.exports = {
  uploadProperty,
  searchProperties,
  getPropertyDetails,
};