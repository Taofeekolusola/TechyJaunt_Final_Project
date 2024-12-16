const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require('../models/User');
const { Tenant } = require('../models/Tenant');
const { Landlord } = require('../models/Landlord');

const signup = async (req, res) => {
  try {
    const { firstname, email, password, lastname, cornfirmPassword, role, tenantDetails, landlordDetails } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the User
    const user = await User.create({ firstname, email, password: hashedPassword, lastname, cornfirmPassword, role });

    if (role === "tenant") {
      // Create Tenant details
      const tenant = await Tenant.create({
        ...tenantDetails,
        userId: user.id, // Link to User
      });
      return res.status(201).json({ user, tenant });
    }

    if (role === "landlord") {
      // Create Landlord details
      const landlord = await Landlord.create({
        ...landlordDetails,
        userId: user.id, // Link to User
      });
      return res.status(201).json({ user, landlord });
    }

    return res.status(400).json({ message: "Invalid role provided" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

const login = async (req, res) => {
    const {email, password} = req.body;
  
      const user = await User.findOne({ where: {email}})
      if (!user) {
          return res.status(401).json({ 
              message: 'Invalid email' 
          });    
      }
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
          return res.status(401).json({ 
              message: 'Invalid password'
          });
      }
      const payload = {
          id: user.id,
          email: user.email,
      }
      const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '7d'}) 
      res.status(201).json({ 
          message: "Login Successful", token 
      })
};
  
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user with provided data
    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  console.log('Received ID to delete:', id);

  try {
    const user = await User.findByPk(id);

    console.log('User found:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Deleting user...');
    await user.destroy();

    console.log('User deleted successfully');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll(); // Fetch all users
      res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => { 
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User fetched successfully', user });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [
        { model: Landlord, as: 'landlordDetails' },
        { model: Tenant, as: 'tenantDetails' },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter role-specific data
    if (user.role === 'landlord') {
      return res.json({ user, landlordDetails: user.landlordDetails });
    } else if (user.role === 'tenant') {
      return res.json({ user, tenantDetails: user.tenantDetails });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    signup,
    login,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getUserDetails,
};