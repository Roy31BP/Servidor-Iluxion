const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Usuario no encontrado" });

    // Aquí verifica contraseña, por ejemplo con bcrypt
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    // Generar token con id y rol en el payload
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Aquí modifica para enviar token y usuario completo
    res.json({
      token,
      user: {
        _id: admin._id,
        email: admin.email,
        role: admin.role,
        name: admin.name, // agrega más campos si quieres
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

const logoutAdmin = async (req, res) => {
    try {
        res.json({ message: "Logout exitoso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginAdmin, logoutAdmin };