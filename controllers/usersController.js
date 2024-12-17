const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require('../models/User');

const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    // Validate password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Ensures name is provided and that it's a string
    if (!firstname || typeof firstname !== 'string') { 
      return res.status(400).json({
        message: 'Invalid name. Name is required and it must be a string.'
      });
    }

    // Ensures name is provided and that it's a string
    if (!lastname || typeof lastname !== 'string') { 
      return res.status(400).json({
        message: 'Invalid name. Name is required and it must be a string.'
      });
    }
    // Ensures email is provided ad that it's a string and contains '@'
    if (!email || typeof email!== 'string' ||!email.includes('@')) { 
      return res.status(400).json({
        message: 'Invalid email. Email is required and it must be a valid email address.'
      });
    }

    // Ensures password is provided ad that it's a string and at least 8 characters long
    if (!password || typeof password!== 'string' || password.length < 8) { 
      return res.status(400).json({
        message: 'Invalid password. Password is required and it must be at least 8 characters long.'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

const assignRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate the role
    if (!["landlord", "tenant"].includes(role)) {
      return res.status(400).json({ message: "Invalid role provided. Role must be 'landlord' or 'tenant'." });
    }

    // Find the user
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's role
    await user.update({ role });

    return res.status(200).json({ message: "Role assigned successfully", user });
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
  const { firstname, lastname, email, password, confirmPassword } = req.body;

  try {

    if (!firstname || typeof firstname !== 'string') { 
      return res.status(400).json({
        message: 'Invalid name. firstname is required and it must be a string.'
      });
    }
    
    if (!lastname || typeof lastname !== 'string') { 
      return res.status(400).json({
        message: 'Invalid name. lastname is required and it must be a string.'
      });
    }
    // Ensures email is provided ad that it's a string and contains '@'
    if (!email || typeof email!== 'string' ||!email.includes('@')) { 
      return res.status(400).json({
        message: 'Invalid email. Email is required and it must be a valid email address.'
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user with provided data
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    await user.save();

    res.status(200).json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      confirmPassword: user.password
    });
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
    assignRole,
};