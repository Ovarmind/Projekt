import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router, response } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.post(`${this.path}/:id`, this.addData);
        this.router.get(`${this.path}/:id`, this.getId);
        this.router.get(`${this.path}/:id/latest`, this.najw);
        this.router.get(`${this.path}/:id/:num`, this.wypiszx);
        this.router.delete(`${this.path}/all`, this.usunall);
        this.router.delete(`${this.path}/usun/:id`, this.usunById);
    }

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response) => {
        let output = testArr;
        console.log(output)
        response.json(output);
}

    private addData = async (request: Request, response: Response) => {
        const {element} = request.body;
        testArr.push(element)
        response.json(testArr)
}

    private getId = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        let output = testArr[id]
        console.log(output);
        response.json(output);
}

    private najw = async (request: Request, response: Response) => {
        const maxValue = Math.max(...testArr);
        console.log(maxValue);
        response.json(maxValue);
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
        testArr.length = 0;
        console.log(testArr);
        response.json("DATA DELETED");
    }

    private usunById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        testArr.splice(id, 1);
        console.log(testArr);
        response.json(testArr);
    }



}

export default DataController;