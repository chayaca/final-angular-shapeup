import { Component, OnInit } from '@angular/core';
import { Members } from '../Classes/members';
import { ShapeUpServiceService } from '../shape-up-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  currentM=new Members();
  constructor(private router: Router, private newMemberService:ShapeUpServiceService) { }
  chg=new Members();
  changeMember(name:string, email:string, password:string)
  {    
    this.chg.email=email;
    this.chg.userPassword=password;
    this.chg.userName=name;
    this.newMemberService.ChangeMemberPassword(this.chg).subscribe(data=>
      {
        this.currentM.id=data.id;
        this.currentM.userName=data.userName;
        this.currentM.userPassword=data.userName;
        this.currentM.projects=data.projects;
        this.currentM.accountDate=data.accountDate;
        this.currentM.email=data.email;
        this.newMemberService.member=data;
        console.log(this.currentM);
      });
      if(this.currentM==null){
        alert("Your user name or email is incorrect");
      }
      else{
        this.router.navigate(['./project-options']);
      }
    }  
  ngOnInit() {
  }

}
