import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Voiture } from '../models/VoitreModel';

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.css']
})
export class VoitureComponent implements OnInit {

  public voitures: Voiture[] = [];

  ngOnInit(): void {
      this.loadVoitures();
  }

  constructor(private service: AuthService){}

  loadVoitures():void{
    this.service.loadAllVoitures().subscribe(d=>{
      this.voitures = d;
    })
  }
  
}
