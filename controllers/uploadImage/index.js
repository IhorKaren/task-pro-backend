const { ctrlWrapper } = require("../../helpers");
const upload = require("./uploadImage");


module.exports = {
    upload: ctrlWrapper(upload)
};