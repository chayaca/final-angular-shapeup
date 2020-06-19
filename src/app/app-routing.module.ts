import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectOptionsComponent } from './project-options/project-options.component';
import { AreaComponent } from './area/area.component';
import { DrawShapesComponent } from './draw-shapes/draw-shapes.component';
import { DisplayResultComponent } from './display-result/display-result.component';


const routes: Routes = [
  {
    path: 'project-options',
    component: ProjectOptionsComponent
},
{
  path: 'area',
  component: AreaComponent
},
{
  path: 'draw-shapes',
  component: DrawShapesComponent
},
{
  path: 'display-result',
  component: DisplayResultComponent
},
]; //{ path: 'project-details/:id', component: ProjectDetailsComponent }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
