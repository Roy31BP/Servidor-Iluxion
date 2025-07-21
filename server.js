const connectDB = require("./src/config/db");
const app = require("./src/app");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
});