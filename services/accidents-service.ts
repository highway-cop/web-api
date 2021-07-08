import { upperCase } from 'lodash';

import Accident from '../models/accident';
import Geolocation from '../models/geolocation';

import Mongo from '../database/connection';

class Accidents {

    public static getByCity(name: string, offset: number = 0, limit: number = 50): Promise<Geolocation[]> {
        const city = upperCase(name);

        return Mongo.db
            .collection<Accident>('accidents')
            .find({ municipio: city })
            .project<Geolocation>({
                _id: false,
                lat: '$latitude',
                lng: '$longitude'
            })
            .skip(offset)
            .limit(limit)
            .toArray();
    }

}

export default Accidents;