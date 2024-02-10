import { Injectable } from '@angular/core';
import { Usuario } from '../../dashboard/pages/usuarios/models/usuarios.interface';
import { Router } from '@angular/router';
import { LoginData } from '../../models/login.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, finalize, map, of } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private loadingService: LoadingService,
    private snackBar: MatSnackBar) { }
authUser: Usuario | null= null;

  login(data:LoginData): void {
    const MOCK_USER={
      id: 1,
      nombre: 'Googy',
      apellido: 'Ygoog',
      email: 'mm@gmail.com',
      password: '1234',
      rol: 'admin'
    };

    console.log(data.email, data.password);
    if(data.email===MOCK_USER.email && data.password===MOCK_USER.password){
      this.authUser=MOCK_USER;
      localStorage.setItem('token', 'fdsafdsafdsaf2341lkjk543543');
      this.router.navigate(['/dashboard']);
    }
    else{
      this.openSnackBar('Error de usuario o contraseña');
    }
  }

  logout(): void {
    this.authUser=null;
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  verificarToken() {
    this.loadingService.setIsLoading(true);
    return of(localStorage.getItem('token')).pipe(delay(1000), map((response)=> !!response), finalize(()=> this.loadingService.setIsLoading(false)));
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
