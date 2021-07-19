import { upperCase } from 'lodash';

import Mongo from '../database/connection';

class Accidents {

    public static getByCity(name: string, offset: number = 0, limit: number = 50): Promise<road.domain.AccidentByCityResponse[]> {
        const city = upperCase(name);

        return Mongo.db
            .collection<road.domain.Accident>('accidents')
            .find({ municipio: city })
            .project<road.domain.AccidentByCityResponse>({
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
            })
            .skip(offset)
            .limit(limit)
            .toArray();
    }

}

export default Accidents;