const { User } = require('../model/');

exports.updateUser = async (req, res) => {
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

exports.deleteUser = async (req, res) => {
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

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll(); // Fetch all users
      res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

