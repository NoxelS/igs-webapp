const fs = require('fs-extra');
const childProcess = require('child_process');
try {
    // Remove current build
    fs.removeSync('./dist/');
    fs.copySync('./dist/keys', './dist/keys', { overwrite: true, recursive: true });
} catch (error) {
    // Running in docker
}

console.log('Running build...');

// Transpile the typescript files
const proc = childProcess.exec('tsc --build tsconfig.prod.json');
proc.on('close', code => {
    if (code !== 0) {
        throw Error('Build failed');
    }
});
