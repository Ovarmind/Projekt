import DataModel from '../schemas/data.schema';
import { IData } from "../models/data.model";


export default class DataService {

    public async createData(dataParams: IData) {
       try {
           const dataModel = new DataModel(dataParams);
           await dataModel.save();
       } catch (error) {
           console.error('Wystąpił błąd podczas tworzenia danych:', error);
           throw new Error('Wystąpił błąd podczas tworzenia danych');
       }
    }
    
    public async query(deviceID: string) {
       try {
           const data = await DataModel.find({deviceId: deviceID}, { __v: 0, _id: 0 });
           return data;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
     }

     public async get(deviceId: string){
        try{
            const newest = await DataModel.find({deviceId: deviceId}, { __v: 0, _id: 0 }).limit(1).sort({$natural:-1});
            return newest;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
     }

     public async getAllNewest(): Promise<any[]> {
    const latestData: any[] = [];

    try {
        const promises = Array.from({ length: 17 }, (_, i) =>
            DataModel.find({ deviceId: i }, { __v: 0, _id: 0 })
                .limit(1)
                .sort({ $natural: -1 })
                .then((entries) => {
                    if (entries.length) {
                        latestData.push(entries[0]);
                    } else {
                        latestData.push({ deviceId: i });
                    }
                })
                .catch((error) => {
                    console.error(`Błąd podczas pobierania danych dla urządzenia ${i}: ${error.message}`);
                    latestData.push({ deviceId: i, error: true });
                })
        );

        await Promise.all(promises);
        return latestData;
    } catch (err) {
        throw new Error(`getAllNewest failed: ${err}`);
    }
}

public async deleteAllDevicesData(): Promise<number> {
    const ids = Array.from({ length: 17 }, (_, i) => i);
    const result = await DataModel.deleteMany({ deviceId: { $in: ids } });
    return result.deletedCount ?? 0;
}

     }
     
