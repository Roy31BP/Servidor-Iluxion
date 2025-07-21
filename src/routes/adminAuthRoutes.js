const express = require("express");

const { loginAdmin, logoutAdmin } = require("../controllers/adminAuthController");
const {
  createAdmin,
  listAdmins,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

const { adminAuthMiddleware, authRolMiddleware } = require("../middleware/authRolMiddleware");

const router = express.Router();

// Rutas públicas

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

// Rutas protegidas - sólo admins pueden acceder
router.use(adminAuthMiddleware);
router.use(authRolMiddleware);

router.post("/", createAdmin);// Crear admin o empleado
router.get("/", listAdmins);            // Listar todos los usuarios
router.put("/:id", updateAdmin);        // Actualizar usuario
router.delete("/:id", deleteAdmin);     // Eliminar usuario

module.exports = router;
