import { Component } from '@angular/core';
import { Interface } from '../models/Interfaces';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  open = false;
  dropped = false;
  token!:any;
  interfaces: Interface[] = [];
  constructor(private service: AuthService, private router: Router) {
    
  }
  ngOnInit(): void {
    this.token = sessionStorage.getItem("token")
    this.service.loadInterfaces(sessionStorage.getItem("userid")).subscribe((d)=>{
        console.log(
          d
        );
        this.interfaces=d;
    },
    (err)=>{
      this.router.navigate(['/login'])
    }) 
  }
  openMenu(){
    this.open=!this.open
  }
  dropdown(){
    this.dropped = !this.dropped;
  }
}
