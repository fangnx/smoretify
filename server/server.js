import express from 'express';
import config from '../config/config';

const app = new express();
const port = config.port;
app.listen(port, () => console.log(`App listening on port ${port} !`));
