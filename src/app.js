const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();

// Lista de orígenes permitidos
const allowedOrigins = ['http://localhost:5174', 'http://localhost:5173'];
// Configuración de CORS


app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // permitir Postman o curl
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS no permitido desde ${origin}`));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const adminProtectedRoutes = require("./routes/adminProtectedRoutes");
const productRoutes = require("./routes/productRoutes");
const providerRoutes = require("./routes/providerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const clientAuthRoutes = require("./routes/clientAuthRoutes");
const adminOrderRoutes = require ("./routes/adminOrderRoutes");


// Ruta principal de prueba
app.get('/', (req, res) => {
  res.send('Hola mundo');
});



// Endpoints API
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin", adminProtectedRoutes);
app.use("/api/products", productRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/clientes', clientAuthRoutes);
app.use('/api/admin/orders', adminOrderRoutes);


// Archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

// Configuración de PayPal
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});


module.exports = app;
