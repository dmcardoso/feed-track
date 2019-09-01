const multer = require('multer');
const md5 = require('md5');

module.exports = (app) => {
    const storage = multer.diskStorage({
        destination(req, file, callback) {
            console.log(file);
            callback(null, app.upload_dir);
        },
        filename(req, file, callback) {
            console.log(file);
            callback(null, md5(`${file.originalname}${Date.now()}`));
        },
    });

    const upload = multer({ storage });

    return { upload };
};
