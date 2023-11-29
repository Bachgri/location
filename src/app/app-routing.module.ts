import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VoitureComponent } from './voiture/voiture.component';
import { OwnerComponent } from './owner/owner.component';
import { ClientComponent } from './client/client.component';
import { LogoutComponent } from './logout/logout.component';
import { AgenceComponent } from './agence/agence.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'voitures', component:VoitureComponent},
  {path: 'owner/dashboard', component: OwnerComponent},
  {path: 'owner/clients', component: ClientComponent},
  {path: 'agences', component: AgenceComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '', component: VoitureComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
