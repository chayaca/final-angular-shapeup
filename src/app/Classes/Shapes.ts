import { Points } from "./Points";
import { Result } from "./Result";

export class Shapes {
    public id: number;
    public tempId: number;
    public area: boolean;
    public unit: number;
    public points: Array<Points>;
    public result: Result;
    public status:boolean;
    constructor() {
       this.result=new Result();
       this.points=new Array<Points>();
    }
}