const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "avatar",
    allowedFormats: ["jpg", "png"],
    filename: (req, file, cb) => {
        const fileName = `avatar_${req.user.userId}`;
        cb(null, fileName);
    },
});

const uploadAvatar = multer({ storage });

module.exports = uploadAvatar;