const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");

const adminAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No autorizado, token faltante" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token inválido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Admin.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

const authRolMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado. Solo admins." });
  }
  next();
};

module.exports = { adminAuthMiddleware, authRolMiddleware };