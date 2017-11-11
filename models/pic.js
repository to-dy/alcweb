var cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: 'tody',
    api_key: '452632437361316',
    api_secret: 'R80d77U8qsF3fZIUJLkHPFg9zT4'
});

module.exports = cloudinary;