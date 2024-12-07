const { Property } = require('../model');
const path = require('path');

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const { userId, title, description, address, contact, price } = req.body;

    const newProperty = await Property.create({
      userId,
      title,
      description,
      address,
      contact,
      price,
    });

    res.status(201).json({
      message: 'Property created successfully',
      property: newProperty,
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ message: 'Error creating property' });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json({ properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a property by ID
exports.getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ property });
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  const { id } = req.params;
  const { title, description, address, contact, price } = req.body;

  try {
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Update only the provided fields
    if (title) property.title = title;
    if (description) property.description = description;
    if (address) property.address = address;
    if (contact) property.contact = contact;
    if (price) property.price = price;

    await property.save();

    res.status(200).json({
      message: 'Property updated successfully',
      property,
    });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    await property.destroy();

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Find a property by ID (used for uploads or other specific cases)
exports.findPropertyById = async (id) => {
  try {
    const property = await Property.findByPk(id);
    return property;
  } catch (error) {
    console.error('Error finding property:', error);
    throw new Error('Unable to find property');
  }
};

// Upload a photo for a property
exports.uploadPhoto = async (req, res) => {
  const { id } = req.params; // Get the propertyId from the URL params

  try {
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Save the photo path in the database
    property.photo = path.join('uploads', req.file.filename); // Create the path to save the photo
    await property.save();

    res.status(200).json({
      message: 'Photo uploaded successfully',
      property,
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
