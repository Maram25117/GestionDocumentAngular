import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DocumentsComponent } from './documents/documents.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from './safe-url.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AppbarComponent } from './appbar/appbar.component';
import { MatiereComponent } from './matiere/matiere.component';
import { HomeComponent } from './home/home.component';
import { TypeComponent } from './type/type.component';
import { BarComponent } from './bar/bar.component';
import { MatiereService } from './matiere.service';

@NgModule({
  declarations: [
    AppComponent,
    DocumentsComponent,
    LoginComponent,
    RegisterComponent,
    SafeUrlPipe,
    AppbarComponent,
    MatiereComponent,
    HomeComponent,
    TypeComponent,
    BarComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [
    [ MatiereService ],
    // Add other providers if needed
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
