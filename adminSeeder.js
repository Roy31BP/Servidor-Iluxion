require('dotenv').config(); // Cargar variables de entorno desde .env
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./src/models/AdminModel'); // Asegúrate de que la ruta sea correcta

console.log("🔍 MONGO_URI:", process.env.MONGO_URI); // Comprobación

const MONGO_URI = process.env.MONGO_URI;

const admins = [
  {
    username: 'admin1',
    email: 'admin1@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    username: 'admin2',
    email: 'admin2@example.com',
    password: bcrypt.hashSync('password456', 10),
  },
  {
    username: 'admin3',
    email: 'admin3@example.com',
    password: bcrypt.hashSync('password789', 10),
  },
];

const seedAdmins = async () => {
  console.log("🔄 Conectando a la base de datos...");

  try {
    if (!MONGO_URI) {
      throw new Error("❌ No se encontró MONGO_URI en .env");
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Conectado correctamente a MongoDB");

    await Admin.deleteMany();
    await Admin.insertMany(admins);

    console.log("✅ Administradores insertados correctamente.");
  } catch (error) {
    console.error("❌ Error durante el seeding:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Conexión cerrada");
  }
};

seedAdmins();
