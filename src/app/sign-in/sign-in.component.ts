import { Component, OnInit } from '@angular/core';
import { Members } from '../Classes/members';
import { ActivatedRoute, Router } from '@angular/router';
import { ShapeUpServiceService } from '../shape-up-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  public currentM=new Members();
  model=new Members();
  bool:boolean;
  constructor(private router: Router, private shapeUpService: ShapeUpServiceService) { 
    this.bool=false;
  }
  ngOnInit() {
  }
  getBool(){
    return this.bool;
  }
//   GetMembers(name:string, password:string){
//       this.shapeUpService.GetMember(name, password).subscribe((res:Members) => {
//       console.log(res);
//       var data=res;
//       console.log(data);
//       this.currentM.id=data.id;
//       this.currentM.userName=data.userName;
//       this.currentM.userPassword=data.userName;
//       this.currentM.projects=data.projects;
//       this.currentM.accountDate=data.accountDate;
//       this.currentM.email=data.email;
//       console.log(this.currentM);
//    debugger
//     if(this.currentM!=null){
//       this.router.navigate(['./project-options']);
//     }
//     else{
//       this.bool=true;
//     }
//   });
// }
  
GetMembers(name:string, password:string){
this.shapeUpService.GetMember(name, password).subscribe(data=>{
  this.shapeUpService.member=data;
  this.currentM=data;
  debugger;
 if(this.currentM!=null){
    this.router.navigate(['./project-options']);
  }
  else{
  this.bool=true;
  }
});
}

}