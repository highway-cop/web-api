import { Router } from 'express';
import { get, toNumber } from 'lodash';

import Accidents from '../services/accidents-service';

const router = Router();

router.get('/accidents/city', (req, res) => {
    const name = get(req.query, 'name') as string;

    const offset = toNumber(get(req.query, 'offset', 0));
    const limit = toNumber(get(req.query, 'limit', 50));

    Accidents.getByCity(name, offset, limit)
        .then(accidents => {
            res.status(200).json(accidents);
        });
});

router.get('/accidents/near', (req, res) => {
    const lng = toNumber(get(req.query, 'lng', 0));
    const lat = toNumber(get(req.query, 'lat', 0));

    const range = Math.min(toNumber(get(req.query, 'range', 10000)), 80000);

    Accidents.getNear(lng, lat, range)
        .then(accidents => {
            res.status(200).json(accidents);
        });
});

export { router };