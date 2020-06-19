import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { Points } from '../Classes/Points';
import { Shapes } from '../Classes/Shapes';
import { Router } from '@angular/router';
import { ShapeUpServiceService } from '../shape-up-service.service';

@Component({
  selector: 'app-draw-shapes',
  templateUrl: './draw-shapes.component.html',
  styleUrls: ['./draw-shapes.component.css']
})
export class DrawShapesComponent implements OnInit {
  [x: string]: any;
  model=new Points();
  points=Array<Points>();
  realPoints=Array<Points>();
  shapes=Array<Shapes>();
  s = new Shapes();
  viewNavbar: boolean;
  unit=this.shapeService.area.unit;
  indexOfPoint=0;
  indexOfShape=0;
  height: number;
  width:number;
  currentShape=new Shapes();
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  @ViewChildren('scanvas') scanvas:QueryList<ElementRef<HTMLCanvasElement>>;
  @ViewChild('saveButton', {static: true})
  saveButton: ElementRef;
  @ViewChild('update', {static: true})
  updateButton: ElementRef;
  @ViewChild('delete', {static: true})
  deleteButton: ElementRef;
  @ViewChild('stable', {static: true})
  stable: ElementRef;
  private ctx: CanvasRenderingContext2D;
  private sctx: CanvasRenderingContext2D;
  private button: HTMLElement;
  private ubutton: HTMLElement;
  private dbutton: HTMLElement;
  private table: HTMLElement;
  addPoint(p:Points){
    console.log(p.char);
    console.log((this.ctx.canvas.height-(p.y+this.ctx.canvas.height))/20);
    console.log(p.x, p.y);
    this.ctx.fillText(p.char, p.x, p.y);
  }
  clearScreen(){
    if(this.currentShape!=null)
    {
      this.updateShape();
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.drawCoordinates();
    this.points=Array<Points>();
    this.realPoints=Array<Points>();
    this.indexOfPoint=0;
  }
  changePoint(x:number, y:number, id:number){
    this.points[id].x=x;
    this.points[id].y=y;
    this.realPoints[id].x=(x*20+235)-210;
    this.realPoints[id].y=this.ctx.canvas.height-(y*20+30);
    this.drawLine(x, y, true);
  }
  updateShape(){
    this.orderPoints();
    this.currentShape.points=Array<Points>();
    this.points.forEach(p => {
      let point=new Points();
      point.x=parseInt(p.x.toString());
      point.y=parseInt(p.y.toString());
    });
    this.shapeService.EditShape(this.currentShape).subscribe((data:Shapes)=>{
      this.currentShape=data;
      this.shapeService.GetPoints(this.currentShape.id).subscribe((data:Points[])=>{
        this.currentShape.points=data;
      })
      this.shapeService.currentShape=this.currentShape;
    })
    this.currentShape.tempId=this.indexOfShape;
    this.shapes.push(this.currentShape);
    this.currentShape=null;
    this.ubutton.style.display='none';
    this.dbutton.style.display='none';
    this.clearScreen();
    this.changeDetection.detectChanges();
    this.table.style.display='inline';
    this.indexOfShape++; 
    let i=0;
    this.scanvas.forEach(canvas => {
      this.sctx = canvas.nativeElement.getContext('2d');
      this.sctx.beginPath();    
    this.sctx.moveTo(this.shapes[i].points[0].x*4, this.sctx.canvas.height-(this.shapes[i].points[0].y*4));
    console.log(this.shapes[i].points[0].x*4);
    console.log(this.sctx.canvas.height-(this.shapes[i].points[0].y*4));
    this.shapes[i].points.forEach(p=>{
      this.sctx.lineTo((p.x*4), (this.sctx.canvas.height-(p.y*4)));
      console.log((p.x*4));
      console.log((this.sctx.canvas.height-(p.y*4)));
    })
    this.sctx.lineTo(this.shapes[i].points[0].x*4, this.sctx.canvas.height-(this.shapes[i].points[0].y*4));
    console.log(this.shapes[i].points[0].x*4);
    console.log(this.sctx.canvas.height-(this.shapes[i].points[0].y*4));
    this.sctx.closePath();
    this.sctx.strokeStyle = "goldenrod";
    this.sctx.stroke();
    this.sctx.save();
    i++;
    }); 
    
  }
  deleteShape(){
    this.ubutton.style.display='none';
    this.dbutton.style.display='none';
    this.clearScreen();
    this.shapeService.DeleteShape(this.currentShape.id);
  }
  drawShape(id:number){
    this.button.style.display='none';
    this.ubutton.style.display='inline';
    this.dbutton.style.display='inline';
    this.shapes[id].points.forEach(p=>{
      this.drawLine(p.x, p.y, false);
    })
    this.drawLine(this.shapes[id].points[0].x, this.shapes[id].points[0].y, false);
    this.currentShape=this.shapes[id];
    this.shapes.splice(id, 1);
    this.indexOfShape=0;
    this.shapes.forEach(s=>{
      s.id=this.indexOfShape;
      this.indexOfShape++;
    })
  }
  drawLine(x:number, y:number, change:boolean){
    this.model.x=0;
    this.model.y=0;
    if(change===false){
    let p=new Points();
    p.x=x;
    p.y=y;
    let index=this.indexOfPoint+1;{
      while(index>26){
        index-=26;
      }
    }
    p.id=this.indexOfPoint;
    p.char=String.fromCharCode(index+64);
    this.points.push(p);
    let rp=new Points();
    rp.x=(x*20+235)-210;
    rp.y=this.ctx.canvas.height-(y*20+30);
    rp.id=this.indexOfPoint;
    rp.char=String.fromCharCode(index+64);
    this.indexOfPoint++;
    this.realPoints.push(rp)
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.drawCoordinates();
    this.ctx.font = "bold 12px sans-serif";
    this.ctx.beginPath();
    this.ctx.moveTo(this.realPoints[0].x, this.realPoints[0].y);
    this.realPoints.forEach(p=>{
      this.addPoint(p);
      this.ctx.lineTo(p.x, p.y);
    })
    if(this.points.length>1&&this.points[this.points.length-1].x==this.points[0].x
      &&this.points[this.points.length-1].y==this.points[0].y){
      this.ctx.closePath();
      this.button.style.display='inline';
    }
    this.ctx.strokeStyle = "goldenrod";
    this.ctx.stroke();
    this.ctx.save();
  }
  getCursorPosition(event){
    console.log(event.clientX, event.clientY);
    this.model.x = (event.clientX-235)/20;
    this.model.y = ((this.ctx.canvas.height-event.clientY)-30)/20;
    console.log(((event.clientY-30)/20));
  }
  drawCoordinates(){
    console.log(this.ctx.canvas.height);
    console.log(this.ctx.canvas.width);
    for (var x = 0.5; x < 1200; x += 10) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, 500);
    }
    for (var y = 0.5; y < 500; y += 10) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(1200, y);
    }
    this.ctx.strokeStyle = "#eee";
    this.ctx.stroke();
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(0, 470);
    this.ctx.lineTo(1200, 470);
    this.ctx.moveTo(30, 0);
    this.ctx.lineTo(30, 600);
    this.ctx.strokeStyle = "#000";
    this.ctx.stroke();
    this.ctx.font = "bold 12px sans-serif";
    let i=1;
    for (var x = 47.5; x < 1200; x += 20) {
      this.ctx.fillText(i.toString(), x, 490);
      i++;
    }
    i=1;
    for (var y = 455; y > 0; y -= 20) {
      this.ctx.fillText(i.toString(), 10, y);
      i++;
    }
    this.ctx.save();
  }
  orderPoints(){
    let miny=0;
    let i=0;
    this.points.forEach(p=>{
      if(p.y<this.points[miny].y) miny=i;
      else if(p.y==this.points[miny].y&&p.x<this.points[miny].x)miny=i;
      i++;
    })
    let tpoints=Array<Points>();
    for(i=miny; i<this.points.length-1; i++){
      let p=new Points();
      p.x=this.points[i].x;
      p.y=this.points[i].y;
      tpoints.push(p);
    }
    for(i=0; i<miny;i++){
      let p=new Points();
      p.x= parseInt(this.points[i].x.toString());
      p.y=parseInt(this.points[i].y.toString());
      tpoints.push(p);
    }
    this.points=Array<Points>();
    tpoints.forEach(p=>{
      this.points.push(p);
    })
  }
  saveShape(){
    this.orderPoints();
    let s=new Shapes();
    s.area=false;
    this.points.forEach(p=>{
      let pnt=new Points();
      pnt.x=parseInt(p.x.toString());
      pnt.y=parseInt(p.y.toString());
      s.points.push(pnt);
    })
    s.result=null;
    s.unit=this.unit;
    this.shapeService.AddShape(s).subscribe((data: Shapes)=>{
      this.currentShape=data;
      this.shapeService.GetPoints(this.currentShape.id).subscribe((data:Points[])=>{
      this.currentShape.points=data;
      })
      this.shapeService.currentShape=this.currentShape;
    })
    s.tempId=this.indexOfShape;
    this.shapes.push(s);
    this.clearScreen();
    this.changeDetection.detectChanges();
    this.table.style.display='inline';
    this.indexOfShape++; 
    this.button.style.display='none';
    let i=0;
    this.scanvas.forEach(canvas => {
      this.sctx = canvas.nativeElement.getContext('2d');
      this.sctx.beginPath();    
    this.sctx.moveTo(this.shapes[i].points[0].x*4, this.sctx.canvas.height-(this.shapes[i].points[0].y*4));
    console.log(this.shapes[i].points[0].x*4);
    console.log(this.sctx.canvas.height-(this.shapes[i].points[0].y*4));
    this.shapes[i].points.forEach(p=>{
      this.sctx.lineTo((p.x*4), (this.sctx.canvas.height-(p.y*4)));
      console.log((p.x*4));
      console.log((this.sctx.canvas.height-(p.y*4)));
    })
    this.sctx.lineTo(this.shapes[i].points[0].x*4, this.sctx.canvas.height-(this.shapes[i].points[0].y*4));
    console.log(this.shapes[i].points[0].x*4);
    console.log(this.sctx.canvas.height-(this.shapes[i].points[0].y*4));
    this.sctx.closePath();
    this.sctx.strokeStyle = "goldenrod";
    this.sctx.stroke();
    this.sctx.save();
    i++;
    }); 
    
  }
  constructor(private changeDetection: ChangeDetectorRef,private router: Router, private shapeService:ShapeUpServiceService) { }
  ngOnInit() {
    if (sessionStorage.getItem("isNewProject") == "true")
      this.viewNavbar = false;
    else this.viewNavbar = true;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.table = this.stable.nativeElement;
    this.button = this.saveButton.nativeElement;
    this.ubutton = this.updateButton.nativeElement;
    this.dbutton = this.deleteButton.nativeElement;
    this.drawCoordinates();
    this.shapeService.GetShapes().subscribe((data:Shapes[])=>{
        this.shapes=data.filter(s=>s.area==false);
        this.shapes.forEach(s=>{
          this.shapeService.GetPoints(s.id).subscribe((data:Points[])=>{
            s.points=data;
          })
        })
    })
    this.shapes.forEach(s=>{
      this.shapes[this.indexOfShape].tempId=this.indexOfShape;
      this.indexOfShape++;
    })
    this.changeDetection.detectChanges();
  }
  back(){
    this.router.navigate(['./area']);
  }
  finish()
{
  this.router.navigate(['./display-result']);
}}
