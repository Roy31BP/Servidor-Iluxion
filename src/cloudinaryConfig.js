// cloudinaryConfig.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "TU_CLOUD_NAME",
  api_key: "TU_API_KEY",
  api_secret: "TU_API_SECRET",
});

module.exports = cloudinary;
