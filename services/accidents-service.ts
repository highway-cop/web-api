import { upperCase } from 'lodash';

import Mongo from '../database/connection';

const projection = {
    _id: false,
    date: {
        $dateToString: {
            format: "%d/%m/%Y",
            date: "$data"
        }
    },
    city: '$municipio',
    road: '$br',
    km: '$km',
    type: '$tipo_acidente',
    reason: '$causa_acidente',
    location: {
        lat: {
            $arrayElemAt: ['$localizacao.coordinates', 1]
        },
        lng: {
            $arrayElemAt: ['$localizacao.coordinates', 0]
        }
    }
};

class Accidents {

    public static getByCity(name: string, offset: number = 0, limit: number = 50): Promise<road.domain.AccidentProjection[]> {
        const city = upperCase(name);

        return Mongo.db
            .collection<road.domain.Accident>('accidents')
            .find({ municipio: city })
            .project<road.domain.AccidentProjection>(projection)
            .skip(offset)
            .limit(limit)
            .toArray();
    }

    public static getNear(lng: number, lat: number, range: number = 50000): Promise<road.domain.AccidentProjection[]> {
        return Mongo.db
            .collection<road.domain.Accident>('accidents')
            .find({
                localizacao: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [lng, lat]
                        },
                        $maxDistance: range
                    }
                }
            })
            .project<road.domain.AccidentProjection>(projection)
            .toArray();
    }

}

export default Accidents;