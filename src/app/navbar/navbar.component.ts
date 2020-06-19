import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {

  }
    
    navigate(path) {
        this.router.navigate([{outlets: {primary: path, sidemenu:path}}], 
                             {relativeTo: this.route});
    }
//   constructor(route: ActivatedRoute) {

//     route.params.subscribe(params => console.log("side menu id parameter",params['id']));

// }
  ngOnInit() {
  }

}
