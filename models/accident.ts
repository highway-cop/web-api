import { ObjectId } from "mongodb";

interface Accident {

    _id: ObjectId;

    latitude: number;

    longitude: number;

}

export default Accident;