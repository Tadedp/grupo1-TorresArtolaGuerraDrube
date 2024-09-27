import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { VerReseniasComponent } from './pages/ver-resenias/ver-resenias.component';
import { VerLibroComponent } from './pages/ver-libro/ver-libro.component';
import { DatosLibroComponent } from './pages/datos-libro/datos-libro.component';
import { SolicitarPrestamoComponent } from './pages/solicitar-prestamo/solicitar-prestamo.component';
import { EnviarReseniaComponent } from './pages/enviar-resenia/enviar-resenia.component';
import { DetallesPerfilComponent } from './pages/detalles-perfil/detalles-perfil.component';
import { PrestamosUsuariosComponent } from './pages/prestamos-usuarios/prestamos-usuarios.component';
import { SearchComponent } from './pages/search/search.component';
import { DatosPerfilComponent } from './pages/datos-perfil/datos-perfil.component';
import { PortadaComponent} from './pages/portada/portada.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { RegistrarseDatosComponent } from './pages/registrarse-datos/registrarse-datos.component';
import { AmPrestamoComponent } from './pages/am-prestamo/am-prestamo.component';
import { AmLibroComponent } from './pages/am-libro/am-libro.component';
import { AmUsuarioComponent } from './pages/am-usuario/am-usuario.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { EnviarNotificacionComponent } from './pages/enviar-notificacion/enviar-notificacion.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'libros', component: LibrosComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'prestamos', component: PrestamosComponent},
  { path: 'error-page', component: ErrorPageComponent},
  { path: 'buscar', component: BuscarComponent},
  { path: 'ver-resenias', component: VerReseniasComponent},
  { path: 'ver-libro', component: VerLibroComponent},
  { path: 'datos-libro', component: DatosLibroComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'solicitar-prestamo', component: SolicitarPrestamoComponent},
  { path: 'enviar-resenia', component: EnviarReseniaComponent},
  { path: 'detalles-perfil', component: DetallesPerfilComponent},
  { path: 'prestamos-usuarios', component: PrestamosUsuariosComponent},
  { path: 'search', component: SearchComponent},
  { path: 'perfil', component: DatosPerfilComponent},
  { path: 'portada', component: PortadaComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registrarse', component: RegistrarseComponent},
  { path: 'registrarse-datos', component: RegistrarseDatosComponent},
  { path: 'libros', component: LibrosComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'prestamos', component: PrestamosComponent},
  { path: 'agregar-prestamo', component: AmPrestamoComponent},
  { path: 'editar-prestamo', component: AmPrestamoComponent},
  { path: 'agregar-libro', component: AmLibroComponent},
  { path: 'editar-libro', component: AmLibroComponent},
  { path: 'agregar-usuario', component: AmUsuarioComponent},
  { path: 'editar-usuario', component: AmUsuarioComponent},
  { path: 'notificaciones', component: NotificacionesComponent},
  { path: 'enviar-notificacion', component: EnviarNotificacionComponent},
  { path: '', redirectTo: 'portada', pathMatch: 'full'},
  { path: '**', redirectTo: 'error-page'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
