import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Interface } from '../models/Interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: String|null = "";
  open = false;
  dropped = false;
  mesAgences: any[] = [];      //
  mesVoitures: any[] = [];     //
  mesReservations: any[] = []; //
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
  loadVoitures(){
    this.service.loadVoituresByUser().subscribe((d)=>{
      this.mesVoitures = d;
    })
  }
}
