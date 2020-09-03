const fs = require('fs-extra');
const childProcess = require('child_process');

// Remove current build
fs.removeSync('./dist/');

// Transpile the typescript files
const proc = childProcess.exec('tsc --build tsconfig.prod.json');
proc.on('close', code => {
    if (code !== 0) {
        throw Error('Build failed');
    }
});
