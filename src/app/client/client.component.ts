import { Component, OnInit } from '@angular/core';
import { Interface } from '../models/Interfaces';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  token: String|null = "";
  open = true;
  dropped = false;
  interfaces: Interface[] = [];
  constructor(private service: AuthService){}
  ngOnInit(): void {
    this.token = sessionStorage.getItem("token")
    this.service.loadInterfaces(sessionStorage.getItem("userid")).subscribe((d)=>{
        console.log(
          d
        );
        this.interfaces=d;
    })
    
  }

  openMenu(){
    this.open=!this.open
  }
  dropdown(){
    this.dropped = !this.dropped;
  }
}
