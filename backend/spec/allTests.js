const newman = require('newman');
const fs = require('fs-extra');

fs.unlinkSync('.success');

var globalFailError = false;

fs.readdirSync('./collections').forEach(collection => {
    console.log(`Running: ${collection}...`);
    newman.run(
        {
            collection: require(`./collections/${collection}`),
            globals: require('./env/postman_globals.json'),
            reporters: 'cli'
        },
        err => {
            if (err) {
                globalFailError = true;
            }
        }
    );
});

if (globalFailError) {
    process.exitCode = 1;
} else {
    fs.createFileSync('.success')
}
