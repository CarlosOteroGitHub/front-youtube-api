//MODULOS.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//RUTAS.
import { AppRoutingModule } from './app-routing.module';

//COMPONENTES.
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { AboutComponent } from './componentes/about/about.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ApiFavoritosComponent } from './componentes/api-favoritos/api-favoritos.component';
import { ApiYoutubeComponent } from './componentes/api-youtube/api-youtube.component';

//SERVICIOS.

//PIPES PERSONALIZADOS.

//IDIOMAS.

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    ApiFavoritosComponent,
    ApiYoutubeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }