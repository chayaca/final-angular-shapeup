import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ShapeUpServiceService } from '../shape-up-service.service';
import { Area } from '../Classes/area';
import { Shapes } from '../Classes/Shapes';
import { Points } from '../Classes/Points';
import { Router } from '@angular/router';




export interface Units {
  unit: string;
}
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  [x: string]: any;
  public currentA: Shapes = new Shapes();
  area = new Area();

  viewNavbar: boolean;
  _currentShape: any = {};
  ArrShapes: Array<Shapes>;
  constructor(private areaService: ShapeUpServiceService, private router: Router) { }
  
  myControl = new FormControl();
  options: string[] = ['kilometre', 'centimetre', 'metre', 'mile', 'yard', 'foot', 'inch', 'millimeter'];

  filteredOptions: Observable<string[]>;

  ngOnInit() {
    if (sessionStorage.getItem("isNewProject") == "true")
      this.viewNavbar = false;
    else {this.viewNavbar = true;
      this.viewNavbar =true;
    }
    //this.areaService.Shownavbar=this.viewNavbar;
    debugger;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.areaService.GetShapes().subscribe((data: Array<Shapes>) => {
        this.ArrShapes = data;
        this.currentA = this.ArrShapes.find(a => a.area=true);
        this.areaService.GetPoints(this.currentA.id).subscribe((data: Array<Points>)=>{
          this.currentA.points=data;
        })
        this.area.id=this.currentA.id;
        this.area.unitNum=this.currentA.unit;
        this.area.height=this.currentA.points[2].y-this.currentA.points[0].y;
        this.area.height=this.currentA.points[1].x-this.currentA.points[0].x;
        this.unitType(this.area);
  });}
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    debugger
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  saveArea() {
    let areashape = new Shapes()
    switch (this.area.unit) {
      case 'kilometre':
        areashape.unit = 1;
        this.area.unitNum = 1;
        break;
      case 'centimetre':
        areashape.unit = 2;
        this.area.unitNum = 2;
      case 'metre':
        areashape.unit = 3;
        this.area.unitNum = 3;
        break;
      case 'mile':
        areashape.unit = 4;
        this.area.unitNum = 4;
      case 'yard':
        areashape.unit = 5;
        this.area.unitNum = 5;
        break;
      case 'foot':
        areashape.unit = 6;
        this.area.unitNum = 6;
      case 'inch':
        areashape.unit = 7;
        this.area.unitNum = 7;
        break;
      case 'millimeter':
        areashape.unit = 8;
        this.area.unitNum = 8;
        break;
    }
    areashape.area = true;
    let point = new Points();
    point.x = 0;
    point.y = 0;
    areashape.points.push(point);
    point = new Points();
    point.x = this.area.width;
    point.y = 0;
    areashape.points.push(point);
    point = new Points();
    point.x = this.area.width;
    point.y = this.area.height;
    areashape.points.push(point);
    point = new Points();
    point.x = 0;
    point.y = this.area.height;
    areashape.points.push(point);
    this.areaService.AddShape(areashape).subscribe(data => {
      this.areaService.area = data;
      this.currentA = data;
    });
  }
  back() {
    this.saveArea();
    this.router.navigate(['./project-options']);
  }
  unitType(shape){
    switch (this.area.unitNum) {
      case 1:
        shape.unit = 'kilometre';
        this.area.unit = 'kilometre';
        break;
      case 2:
        shape.unit = 'centimetre';
        this.area.unit = 'centimetre';
      case 3:
        shape.unit = 'metre';
        this.area.unit = 'metre';
        break;
      case 4:
        shape.unit = 'mile';
        this.area.unit = 'mile';
      case 5:
        shape.unit = 'yard';
        this.area.unit = 'yard';
        break;
      case 6:
        shape.unit = 'foot';
        this.area.unit =  'foot';
      case 7:
        shape.unit = 'inch';
        this.area.unit = 'inch';
        break;
      case 8:
        shape.unit = 'millimeter';
        this.area.unit = 'millimeter';
        break;
    }
  }
  updateArea() {
      let areashape = new Shapes()
      this.unitType(areashape);
      areashape.area = true;
      let point = new Points();
      point.x = 0;
      point.y = 0;
      areashape.points.push(point);
      point = new Points();
      point.x = this.area.width;
      point.y = 0;
      areashape.points.push(point);
      point = new Points();
      point.x = this.area.width;
      point.y = this.area.height;
      areashape.points.push(point);
      point = new Points();
      point.x = 0;
      point.y = this.area.height;
      areashape.points.push(point);
      this.areaService.EditShape(areashape).subscribe(data => {
        this.currentA = data;
        this.areaService.area = data;
      });
      this.router.navigate(['./draw-shapes']);
    }
    next(){
    this.saveArea();
    this.router.navigate(['./draw-shapes']);
  }

  
  
  

}
