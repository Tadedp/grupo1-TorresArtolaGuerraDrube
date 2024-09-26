import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
import { BotonesAzulesComponent } from './botones-azules/botones-azules.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    UsuarioComponent,
    UsuariosComponent,
    LibrosComponent,
    PrestamosComponent,
    ErrorPageComponent,
    PrestamoComponent,
    BotonesAzulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
