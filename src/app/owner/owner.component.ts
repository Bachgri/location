import { Component, OnInit } from '@angular/core';
import { Interface } from '../models/Interfaces';
import { AuthService } from '../auth.service';
import { Client } from '../models/Client';
import {Router} from "@angular/router"

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  token: String|null = "";
  open = false;
  dropped = false;
  interfaces: Interface[] = [];
  allInterfaces: Interface[] = [];
  public clients: Client[] = []
  public editedClient!: Client;
  public deletedClient!: Client;
  public addedClient: Client = {
    id: null ,
    name:'',
    email:'',
    phone:'',
    permet:'',
    cin:'',
    username:'',
    role :{'id':1},
    interfaces:[],
    ville:'',
    password:'',
    type:'CLIENT'
  };

  constructor(private service: AuthService, private router: Router ){}
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
    this.service.loadAllInterfaces( ).subscribe((d)=>{
      console.log(
        d
      );
      this.allInterfaces=d;
  })
    this.service.loadClient(sessionStorage.getItem('userid')).subscribe((data)=>{
      this.clients = data;
      console.log('====================================');
      console.log(this.clients);
      console.log('====================================');
    })
  }

  openMenu(){
    this.open=!this.open
  }
  dropdown(){
    this.dropped = !this.dropped;
  }
  onOpenModal(client:any, mode: any){
    const container = document.getElementById("myContainer");
    const btn = document.createElement('button');
    console.log('====================================');
    console.log(mode);
    console.log('====================================');
    btn.type='button';
    btn.style.display='none';
    btn.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      btn.setAttribute('data-target', '#addEmployeeModal');
    }
    if(mode === 'edit'){
      this.editedClient=client;
      let intt: any[] = [];
      this.editedClient.interfaces.forEach((d)=>{
        intt.push(d['id']+'')  
      })
      this.editedClient.interfaces = intt; 
      btn.setAttribute('data-target', '#editEmployeeModal');
    }
    if(mode === 'delete'){
      this.deletedClient=client;
      btn.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(btn);
    btn.click();
  }

  loadClient(){
    this.service.loadClient(sessionStorage.getItem('userid')).subscribe((data)=>{
      this.clients = data;
      console.log('====================================');
      console.log(this.clients);
      console.log('====================================');
    })
  }

  onEditeClient(form: any){
    this.editedClient.role = {'id':1};
    let intt: any[] = [] 
    this.editedClient.interfaces.forEach((inter)=>{
      intt.push({'id': Number(inter)});
    })
    this.editedClient.interfaces = intt;
    console.log("editedclient : " , this.editedClient);
    this.service.editClient(this.editedClient).subscribe((d)=>{
      console.log(d);
      this.editedClient = {
        id: null ,
        name:'',
        email:'',
        phone:'',
        permet:'',
        cin:'',
        username:'',
        role :{'id':1},
        interfaces:[],
        ville:'',
        password:'',
        type:'CLIENT'
      };
    
      document.getElementById('closeAddEmployee')?.click()
    })

  }
  onAddEmployee(form: any){
    console.log('====================================');
    console.log(this.addedClient);
    console.log('====================================');
    let intt: any[] = [] 
    this.addedClient.interfaces.forEach((inter)=>{
      intt.push({'id': Number(inter)});
    })
    this.addedClient.interfaces = intt;

    this.service.addClient(this.addedClient).subscribe((d)=>{
      console.log("response : ",d);
      this.loadClient();
      document.getElementById('closeAddEmployee')?.click();
    })
  }
  onDeleteEmployee(form: any){
    this.service.deleteClient(form.id).subscribe((d)=>{
      console.log(
        d
      );
      this.loadClient();
      document.getElementById('clodeDeleteEmployee')?.click();
    })
  }
  isSelected(interfaceId: any): boolean {
    console.log('====================================');
    console.log("test from ", interfaceId.id);
    console.log('====================================');
    return this.editedClient.interfaces.includes(interfaceId.id+'');
  }
}
