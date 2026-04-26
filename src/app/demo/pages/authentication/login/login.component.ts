// angular import
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { email, Field, form, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [RouterModule, Field],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private cd = inject(ChangeDetectorRef);

  submitted = signal(false);
  error = signal('');

  loginModal = signal<{ email: string; password: string }>({
    email: 'info@coddedtheme.com',
    password: '123456'
  });

  loginForm = form(this.loginModal, (schemaPath) => {
    required(schemaPath.email, { message: 'El correo electrónico es obligatorio' });
    email(schemaPath.email, { message: 'Ingrese un correo electrónico válido' });
    required(schemaPath.password, { message: 'La contraseña es obligatoria' });
    minLength(schemaPath.password, 8, { message: 'La contraseña debe tener al menos 8 caracteres' });
  });

  onSubmit(event: Event) {
    this.submitted.set(true);
    this.error.set('');

    event.preventDefault();
    const credentials = this.loginModal();
    console.log('login user logged in with:', credentials);
    this.cd.detectChanges();
  }

  loginWithGoogle() {
    alert('HOLA MUNDO');
  }
}
