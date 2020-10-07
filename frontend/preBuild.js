const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
    try {
        fs.mkdirSync(to);
    } catch (error) {}
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

fs.rmdirSync('./src/app/backend-datatypes', { recursive: true });
copyFolderSync('../backend/src/models', './src/app/backend-datatypes');
