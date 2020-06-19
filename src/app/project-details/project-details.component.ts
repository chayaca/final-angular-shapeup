import { Component, OnInit, Input } from '@angular/core';
import { Projects } from '../Classes/projects';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ShapeUpServiceService } from '../shape-up-service.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProjectOptionsComponent } from '../project-options/project-options.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],

})
export class ProjectDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  // public p: Projects = new Projects();
  public pr: Projects;
  public currentP: Projects = new Projects();
  newProject: boolean = true;
  @Input() p: Projects = new Projects();
  @Input() projectChanged: Observable<void>;
  private eventsSubscription: Subscription;

  constructor(private fb: FormBuilder, private router: Router, private activeRout: ActivatedRoute, private ShapesService: ShapeUpServiceService) { }


  ngOnInit() {
    debugger
    // this.id = +this.activeRout.snapshot.paramMap.get('id');
    this.onProjectChanged();
    this.eventsSubscription = this.projectChanged.subscribe(() => this.onProjectChanged());
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  private onProjectChanged() {
   
this.p=this.ShapesService.currentProject;
    this.id = this.p.id;
    console.log("id for project" + this.id);
    if (this.id == -1 || !this.id) {
      sessionStorage.setItem("isNewProject", "true");
      this.newProject = true;
      this.p = new Projects();
    }
    else { 
      this.newProject = false;
      sessionStorage.setItem("isNewProject", "false");
      debugger;
      this.p = this.ShapesService.currentProject;
      console.log("Data for project =>" + JSON.stringify(this.p));
    }
  }

  AddProject(projectName: string, orderDate: Date, dueDate: Date) {
    this.pr.projectName = projectName;
    this.pr.orderDate = orderDate;
    this.pr.dueDate = dueDate;
    this.ShapesService.AddProject(this.pr).subscribe(data => {
      this.currentP.id = data.id;
      this.currentP.projectName = projectName;
      this.currentP.orderDate = data.orderDate;
      this.currentP.dueDate = data.dueDate;
      this.ShapesService.currentProject=data;
    })
    if(this.currentP==null){
      alert("The details is required");
    }
    else
      this.router.navigate(['./area']);
    
  }
  olddrawing(projectName: string, orderDate: Date, dueDate: Date) {
    this.pr.projectName = projectName;
    this.pr.orderDate = orderDate;
    this.pr.dueDate = dueDate;
    this.ShapesService.EditProject(this.pr).subscribe(data => {
      this.currentP.id = data.id;
      this.currentP.projectName = projectName;
      this.currentP.orderDate = data.orderDate;
      this.currentP.dueDate = data.dueDate;
      this.ShapesService.currentProject=data;
    });
    if(this.currentP==null){
      alert("The details is required");
    }
    else
      this.router.navigate(['./area']);
  }
  DeleteProject() {
    this.ShapesService.DeleteProject(this.pr).subscribe();
  }
}
