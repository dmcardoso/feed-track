const formidable = require('formidable');
const path = require('path');
const md5 = require('md5');
const { upload_dir } = require('../../config/paths');

const upload = (req, res, callback) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = upload_dir;
    // 2mb
    form.maxFileSize = 2 * 1024 * 1024;

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(400).send('Não foi possível fazer o upload da mídia');
        }

        if (files) {
            Object.keys(files).forEach((value, index) => {
                fields[value] = files[value].name;
            });
        }

        callback(files, fields);
    });

    form.on('fileBegin', (name, file) => {
        const base = file.path.split(path.basename(file.path))[0];
        const ext = file.name.split('.')[1];
        const new_file_name = `${md5(file.name + new Date())}.${ext}`;

        file.path = base + new_file_name;
        file.name = new_file_name;
    });
};

module.exports = { upload };
