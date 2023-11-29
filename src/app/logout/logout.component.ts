import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private router: Router) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userid");
    router.navigate(['/login']);
  }


}
