import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router, response } from 'express';
import {checkIdParam} from '../middlewares/deviceIdParam.middleware';
import DataService from '../modules/services/data.service';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    private dataService = new DataService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.post(`${this.path}/:id`, checkIdParam, this.addData);
        this.router.get(`${this.path}/:id`, checkIdParam, this.getId);
        this.router.get(`${this.path}/:id/latest`, checkIdParam, this.najw);
        this.router.get(`${this.path}/:id/:num`, checkIdParam, this.wypiszx);
        this.router.delete(`${this.path}/all`, this.usunall);
        this.router.delete(`${this.path}/usun/:id`, checkIdParam, this.usunById);
    }

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response) => {
        // let output = testArr;
        // console.log(output)
        // response.json(output);
        const allData = await this.dataService.getAllNewest();
        response.status(200).json(allData);
}

    private addData = async (request: Request, response: Response) => {
        // const {elem} = request.body;
        // testArr.push(elem)
        // response.json(testArr)
    const { air } = request.body;
   const { id } = request.params;

   const data = {
       temperature: air[0].value,
       pressure: air[1].value,
       humidity: air[2].value,
       deviceId: id,
       readingDate : new Date()
   }
  
   try {
      
       await this.dataService.createData(data);
       response.status(200).json(data);
   } catch (error) {
       console.error(`Validation Error: ${error.message}`);
       response.status(400).json({ error: 'Invalid input data.' });
   }
}

    private getId = async (request: Request, response: Response) => {
        const { id } = request.params;
        // let output = testArr[id]
        // console.log(output);
        // response.json(output);
        const allData = await this.dataService.query(id);
        response.status(200).json(allData);
}

    private najw = async (request: Request, response: Response) => {
        const { id } = request.params;
        // let output = testArr[id]
        // console.log(output);
        // response.json(output);
        const allData = await this.dataService.get(id);
        response.status(200).json(allData);
    }

    private wypiszx = async (request: Request, response: Response) => {
        let output = []
        const id = Number(request.params.id);
        let num = Number(request.params.num);

        for(let i = id; 0 < num; num--){
            output.push(testArr[i])
            i++;
        }
        console.log(output);
        response.json(output)

    }

    private usunall = async (request: Request, response: Response) => {
        try {
        const deletedCount = await this.dataService.deleteAllDevicesData();
        response.status(200).json({ message: `Usunięto ${deletedCount} rekordów.` });
    } catch (error) {
        console.error("Błąd podczas usuwania danych:", error);
        response.status(500).json({ error: "Wystąpił błąd podczas usuwania danych." });
    }
    }

    private usunById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        testArr.splice(id, 1);
        console.log(testArr);
        response.json(testArr);
    }



}

export default DataController;