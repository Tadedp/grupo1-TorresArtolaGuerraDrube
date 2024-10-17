import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authsessionGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const token = localStorage.getItem('token');

    if (!token) {
        router.navigateByUrl('portada');
        return false;

    } else {
        const rolesPermitidos = route.data['rolesPermitidos'] as Array<string>;
        const rolSesion = localStorage.getItem('rol') || '';
        
        if (rolesPermitidos.includes(rolSesion)) {
            return true;

        } else {
            router.navigateByUrl('home');
            return false;
        }
    }
};