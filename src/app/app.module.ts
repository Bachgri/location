import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms'; // Import this line
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { VoitureComponent } from './voiture/voiture.component';
import { OwnerComponent } from './owner/owner.component';
import { ClientComponent } from './client/client.component';
import { LogoutComponent } from './logout/logout.component';
import { AgenceComponent } from './agence/agence.component';
import { MenuComponent } from './menu/menu.component'; // Import this line

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    VoitureComponent,
    OwnerComponent,
    ClientComponent,
    LogoutComponent,
    AgenceComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
