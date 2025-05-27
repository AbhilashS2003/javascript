const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));