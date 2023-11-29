import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from "@angular/router"
import { Client } from '../models/Client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: Client = {
    id: null,
    name: '',
    email: '',
    phone: '',
    permet: '',
    cin: '',
    username: '',
    role : 'USER',
    interfaces: [

    ],
    ville: '',
    password: '',
    type: '',

  }
  pending=false;
  public request:any = {
    username:'', password: ''
  }
  error = null;
  tab=1;
  private timerInterval: any;

  constructor(private authservice:AuthService,  private router: Router){}

  setTab(n:any){
    this.tab=n;
  }
  submit(){
    this.pending=true;
    console.log('====================================');
    console.log(this.request);
    console.log('====================================');
    this.authservice.login(this.request).subscribe((d)=>{
      console.log(d.role);
      this.pending = false;
      sessionStorage.setItem("token", "HTTP_TOKEN " + d.token)
      sessionStorage.setItem("role",  d.role)
      sessionStorage.setItem("userid", d.userid+"")
      if(d.role=='SUPERADMIN'){
        this.router.navigate(['owner/dashboard'])
      }else if(d.role=='ADMIN'){
        this.router.navigate(['/home'])
      }else{
        this.router.navigate(['/voitures'])
      }
    },
    (err)=>{
      console.log(err);
      
      console.log(err.error.error);
      this.error = err.error.error
      this.pending=false;
    })
  }
  signup(){
    this.authservice.register(this.user).subscribe((d)=>{
      this.showAlert("Account created succefully .... ");
      this.tab=1
    })
  }
  showAlert(message: any) {
    Swal.fire({
      title: message,
      html: '',
      timer: 4000,
      timerProgressBar: false,
      didOpen: () => {
        //Swal.showLoading();
        const b: any = Swal.getHtmlContainer()?.querySelector('b');
        this.timerInterval = setInterval(() => {
          if (b) {
            b.textContent = Swal.getTimerLeft()?.toString()
          }
        }, 100);
      },
      willClose: () => {
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
        }
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        
      }
    });
  }
}
