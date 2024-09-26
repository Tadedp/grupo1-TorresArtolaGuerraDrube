import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'libros', component: LibrosComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'prestamos', component: PrestamosComponent},
  { path: 'error-page', component: ErrorPageComponent},

  { path: '', redirectTo:'error-page', pathMatch:'full'},
  { path: '**', redirectTo:'error-page'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
