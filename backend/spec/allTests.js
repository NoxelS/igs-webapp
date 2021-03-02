const newman = require('newman');
const fs = require('fs-extra');

fs.readdirSync('./collections').forEach(collection => {
    console.log(`Running: ${collection}...`);
    newman.run(
        {
            collection: require(`./collections/${collection}`),
            globals: require('./env/postman_globals.json'),
            reporters: 'cli'
        },
        (err, summary) => {
            if (summary.run.failures.length != 0) {
                fs.createFile('.failed');
            }
        }
    );
});
