import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config();

import { router } from './routes/api'
import Mongo from './database/connection'

const app = express();

const port = process.env['PORT'] || 3000;
const origin = process.env['ORIGIN'] || '*';

app.use(cors({ origin }));

app.use('/api', router);

Mongo.connect().then(() =>
    app.listen(port, () => {
        console.info(`Server running on port ::${port}`);
    })
);
