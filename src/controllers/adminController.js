const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");

// Crear nuevo admin o empleado
const createAdmin = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!["admin", "empleado"].includes(role)) {
    return res.status(400).json({ message: "Rol inválido" });
  }

  try {
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Correo ya registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Admin({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar todos los usuarios sin contraseñas
const listAdmins = async (req, res) => {
  try {
    const users = await Admin.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar usuario
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    const user = await Admin.findById(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (username) user.username = username;
    if (email) user.email = email;
    if (role && ["admin", "empleado"].includes(role)) user.role = role;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar usuario
const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Admin.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAdmin,
  listAdmins,
  updateAdmin,
  deleteAdmin,
};
