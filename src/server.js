const app = require('./app');

const PORT = 5003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
