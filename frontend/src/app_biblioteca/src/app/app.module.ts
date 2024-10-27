import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ImagenLibroComponent } from './components/imagen-libro/imagen-libro.component';
import { IngresosFavoritosComponent } from './components/ingresos-favoritos/ingresos-favoritos.component';
import { ReseniaComponent } from './components/resenia/resenia.component';
import { VerLibroComponent } from './pages/ver-libro/ver-libro.component';
import { DetallesPerfilComponent } from './pages/detalles-perfil/detalles-perfil.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { EditDeleteButtonsComponent } from './components/edit-delete-buttons/edit-delete-buttons.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { PrestamosUsuariosComponent } from './pages/prestamos-usuarios/prestamos-usuarios.component';
import { SearchComponent } from './pages/search/search.component';
import { BarraBusquedaComponent } from './components/barra-busqueda/barra-busqueda.component';
import { PortadaComponent } from './pages/portada/portada.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { GridComponent } from './components/grid/grid.component';
import { PaginadoComponent } from './components/paginado/paginado.component';
import { SearchfilterbarComponent } from './components/searchfilterbar/searchfilterbar.component';
import { AmPrestamoComponent } from './pages/am-prestamo/am-prestamo.component';
import { AmLibroComponent } from './pages/am-libro/am-libro.component';
import { AmUsuarioComponent } from './pages/am-usuario/am-usuario.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { RouterButtonComponent } from './components/router-button/router-button.component';
import { ModalPerfilComponent } from './components/modal-perfil/modal-perfil.component';
import { ModalEnviarNotificacionComponent } from './components/modal-enviar-notificacion/modal-enviar-notificacion.component';
import { ModalEnviarReseniaComponent } from './components/modal-enviar-resenia/modal-enviar-resenia.component';
import { ModalSolicitarPrestamoComponent } from './components/modal-solicitar-prestamo/modal-solicitar-prestamo.component';
import { ModalDatosLibroComponent } from './components/modal-datos-libro/modal-datos-libro.component';
import { ModalUsuarioNotificacionesComponent } from './components/modal-usuario-notificaciones/modal-usuario-notificaciones.component';

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
        ImagenLibroComponent,
        IngresosFavoritosComponent,
        ReseniaComponent,
        VerLibroComponent,
        DetallesPerfilComponent,
        BackButtonComponent,
        EditDeleteButtonsComponent,
        FormularioComponent,
        PrestamosUsuariosComponent,
        SearchComponent,
        BarraBusquedaComponent,
        PortadaComponent,
        RegistrarseComponent,
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
        RouterButtonComponent,
        ModalPerfilComponent,
        ModalEnviarNotificacionComponent,
        ModalEnviarReseniaComponent,
        ModalSolicitarPrestamoComponent,
        ModalDatosLibroComponent,
        ModalUsuarioNotificacionesComponent,
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule, 
        HttpClientModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatFormFieldModule,
        MatDividerModule
    ],

    providers: [
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
