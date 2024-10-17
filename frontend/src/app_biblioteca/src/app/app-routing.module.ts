import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { VerLibroComponent } from './pages/ver-libro/ver-libro.component';
import { DetallesPerfilComponent } from './pages/detalles-perfil/detalles-perfil.component';
import { PrestamosUsuariosComponent } from './pages/prestamos-usuarios/prestamos-usuarios.component';
import { SearchComponent } from './pages/search/search.component';
import { PortadaComponent} from './pages/portada/portada.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { AmPrestamoComponent } from './pages/am-prestamo/am-prestamo.component';
import { AmLibroComponent } from './pages/am-libro/am-libro.component';
import { AmUsuarioComponent } from './pages/am-usuario/am-usuario.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { authsessionGuard } from './guards/authsession.guard'

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'libros', component: LibrosComponent, canActivate: [authsessionGuard], data: { rolesPermitidos: ['Bibliotecario', 'Admin'] }},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authsessionGuard], data: { rolesPermitidos: ['Bibliotecario', 'Admin'] }},
  { path: 'prestamos', component: PrestamosComponent, canActivate: [authsessionGuard], data: { rolesPermitidos: ['Bibliotecario', 'Admin'] }},
  { path: 'error-page', component: ErrorPageComponent},
  { path: 'libro/:id', component: VerLibroComponent},
  { path: 'usuario/:id', component: UsuarioComponent, canActivate: [authsessionGuard], data: { rolesPermitidos: ['Bibliotecario', 'Admin'] }},
  { path: 'detalles-perfil', component: DetallesPerfilComponent, canActivate: [authsessionGuard], data: { rolesPermitidos: ['Usuario'] }},
  { path: 'prestamos-usuarios', component: PrestamosUsuariosComponent, canActivate: [authsessionGuard], data: { rolesPermitidos: ['Usuario'] }},
  { path: 'search', component: SearchComponent},
  { path: 'portada', component: PortadaComponent},
  { path: 'registrarse', component: RegistrarseComponent},
  { path: 'prestamo/:id/:tipo_op', component: AmPrestamoComponent, canActivate: [authsessionGuard], data: { rolesPermitidos: ['Bibliotecario', 'Admin'] }},
  { path: 'libro/:id/:tipo_op', component: AmLibroComponent, canActivate: [authsessionGuard], data: { rolesPermitidos: ['Bibliotecario', 'Admin'] }},
  { path: 'usuario/:id/:tipo_op', component: AmUsuarioComponent, canActivate: [authsessionGuard], data: { rolesPermitidos: ['Bibliotecario', 'Admin'] }},
  { path: 'notificaciones', component: NotificacionesComponent, canActivate: [authsessionGuard], data: { rolesPermitidos: ['Bibliotecario', 'Admin'] }},
  { path: '', redirectTo: 'portada', pathMatch: 'full'},
  { path: '**', redirectTo: 'error-page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
