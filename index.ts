import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { router } from './routes/api'

dotenv.config();

const app = express();

const port = process.env['PORT'] || 3000;
const origin = process.env['ORIGIN'] || '*';

app.use(cors({ origin }));

app.use('/api', router);

app.listen(port, () => {
    console.info(`Server running on port ::${port}`);
});
