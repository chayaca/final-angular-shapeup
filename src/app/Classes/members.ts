import { Projects } from './projects';

export class Members {
    public id: number;
    public userName: string;
    public accountDate: Date;
    public userPassword: string;
    public email: string;
    public projects: Projects[];
}
