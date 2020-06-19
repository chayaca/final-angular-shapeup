import { Component, OnInit } from '@angular/core';
import { Projects } from '../Classes/projects';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ShapeUpServiceService } from 'src/app/shape-up-service.service';
import { AppComponent } from '../app.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { BehaviorSubject, Subject } from 'rxjs';
// import { Index } from '@syncfusion/ej2-angular-circulargauge';
// import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-project-options',
  templateUrl: './project-options.component.html',
  styleUrls: ['./project-options.component.css']
  
})
export class ProjectOptionsComponent implements OnInit {
  
  projectChangedSubject: Subject<void> = new Subject<void>();

  private subscription: Subscription;

  _currentProject: any = {};
  data: string[] = [];
  // private data = new BehaviorSubject({
  //   enabled: false,
  //   toolTip: false
  // });
  //public eventStream$ = this.data.asObservable()
  constructor(private router: Router, private ShapesService: ShapeUpServiceService) { }


  http: HttpClient;
  model = new Projects();
  doneProjects: Array<Projects>;
  undoneProjects: Array<Projects>;
  Arrprojects: Array<Projects>;
  // projects:Projects;
  // this.ShapesService.EditProjectTitle().subscribe((data:Array<Projects>)=>{
  //   data.forEach(element => {
  //     console.log(element);
  //     if(element.Status==0){
  //       this.undoneProjects.add(element);
  //     }
  //     else{
  //       this.doneProjects.add(element);
  //     }});
  // })
   //this.projectsService.DeleteProject()

  //  this.subscription=this.ShapesService.get().subscribe(
  //    __currentProject=>{
  //      this.__currentProject=__currentProject;
  //    });

  // ngOnDestory(){
  //   this.subscription.unsubscribe();
  // }

  ngOnInit() {
    //זימון הפונקציה שמביאה רשימה ל 
      this.ShapesService.GetProjects().subscribe((data: Array<Projects>) => {
      this.Arrprojects = data;
      this.undoneProjects = this.Arrprojects.filter(a => a.projectStatus == false)
      this.doneProjects = this.Arrprojects.filter(a => a.projectStatus == true)
      console.log(this.doneProjects);
      console.log(this.undoneProjects);
      //חלוקה לשני רשימות
    });
  }
  doubleclick(projectId) {
    debugger;
    if (!projectId || projectId == -1) {
      this.ShapesService.currentProject = new Projects();
      this.ShapesService.currentProject.id = -1;
    }
    else {
      this.ShapesService.currentProject = this.Arrprojects.find(p => p.id == projectId);
    }
    this.projectChangedSubject.next();
    // this.router.navigate(['/first-page'],{ queryParams: {id:'1002'}});
    //  this.router.navigate(['project-details,id'],{ queryParams: {id:'1002'}});
    //  this.router.navigate(['/project-details',projectId]);
    // this.ShapesService.Shownavbar = this.show;
  }

}
