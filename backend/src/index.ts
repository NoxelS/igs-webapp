import logger from '@shared/logger';

import app from './server';


// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info(`Server is starting on port ${port} in ${process.env.NODE_ENV} mode.`);
});
