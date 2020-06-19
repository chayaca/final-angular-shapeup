import { Component, Input } from '@angular/core';
import { Members } from './Classes/members';
import { Projects } from './Classes/projects';
import { ShapeUpServiceService } from './shape-up-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;
  title = 'ShapeUp';
  currentM: Members;
  Members: Members[];
  currentP: Projects;
  Projects: Projects[];
  showN:boolean;

  
 constructor(navbarservice:ShapeUpServiceService){
  
 }
ngOnInit() {
  // this.showN= this.navbarservice.Shownavbar;

 }
//   Navbar(){
//     if (sessionStorage.getItem("isNewProject") == "false")
//       this.showN = true;
//     else this.showN = false;
//     debugger
//  }
 
}
