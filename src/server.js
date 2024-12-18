const app = require('./app');
require('dotenv').config();

PORT = process.env.PORT || 5003

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});