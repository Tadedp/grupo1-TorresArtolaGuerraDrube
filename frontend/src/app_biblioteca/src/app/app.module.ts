import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ImagenLibroComponent } from './components/imagen-libro/imagen-libro.component';
import { IngresosFavoritosComponent } from './components/ingresos-favoritos/ingresos-favoritos.component';
import { VerReseniasComponent } from './pages/ver-resenias/ver-resenias.component';
import { ReseniaComponent } from './components/resenia/resenia.component';
import { VerLibroComponent } from './pages/ver-libro/ver-libro.component';
import { RedButtonComponent } from './components/red-button/red-button.component';
import { DatosLibroComponent } from './pages/datos-libro/datos-libro.component';
import { SolicitarPrestamoComponent } from './pages/solicitar-prestamo/solicitar-prestamo.component';
import { EnviarReseniaComponent } from './pages/enviar-resenia/enviar-resenia.component';
import { DetallesPerfilComponent } from './pages/detalles-perfil/detalles-perfil.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { CampoFormularioComponent } from './components/campo-formulario/campo-formulario.component';
import { EditDeleteButtonsComponent } from './components/edit-delete-buttons/edit-delete-buttons.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { MisPrestamosComponent } from './components/mis-prestamos/mis-prestamos.component';
import { PrestamosUsuariosComponent } from './pages/prestamos-usuarios/prestamos-usuarios.component';
import { SearchComponent } from './pages/search/search.component';
import { BarraBusquedaComponent } from './components/barra-busqueda/barra-busqueda.component';
import { DatosPerfilComponent } from './pages/datos-perfil/datos-perfil.component';
import { PortadaComponent } from './pages/portada/portada.component';
import { BlueButtonComponent } from './components/blue-button/blue-button.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { RegistrarseDatosComponent } from './pages/registrarse-datos/registrarse-datos.component';
import { GridComponent } from './components/grid/grid.component';
import { PaginadoComponent } from './components/paginado/paginado.component';
import { SearchfilterbarComponent } from './components/searchfilterbar/searchfilterbar.component';
import { AmPrestamoComponent } from './pages/am-prestamo/am-prestamo.component';
import { AmLibroComponent } from './pages/am-libro/am-libro.component';
import { AmUsuarioComponent } from './pages/am-usuario/am-usuario.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { EnviarNotificacionComponent } from './pages/enviar-notificacion/enviar-notificacion.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    UsuarioComponent,
    UsuariosComponent,
    LibrosComponent,
    PrestamosComponent,
    ErrorPageComponent,
    PrestamoComponent,
    ImagenLibroComponent,
    IngresosFavoritosComponent,
    VerReseniasComponent,
    ReseniaComponent,
    VerLibroComponent,
    RedButtonComponent,
    DatosLibroComponent,
    SolicitarPrestamoComponent,
    EnviarReseniaComponent,
    DetallesPerfilComponent,
    BackButtonComponent,
    CampoFormularioComponent,
    EditDeleteButtonsComponent,
    FormularioComponent,
    MisPrestamosComponent,
    PrestamosUsuariosComponent,
    SearchComponent,
    BarraBusquedaComponent,
    DatosPerfilComponent,
    PortadaComponent,
    BlueButtonComponent,
    LoginComponent,
    RegistrarseComponent,
    RegistrarseDatosComponent,
    LibrosComponent,
    UsuariosComponent,
    PrestamosComponent,
    GridComponent,
    PaginadoComponent,
    SearchfilterbarComponent,
    AmPrestamoComponent,
    AmLibroComponent,
    AmUsuarioComponent,
    NotificacionesComponent,
    EnviarNotificacionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],

  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
