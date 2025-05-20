import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form_group!: FormGroup;
  usuarioModel: UsuarioModel = new UsuarioModel();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.crearFormulario();
  }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuarioModel.email = localStorage.getItem('email');
      this.form_group.get('recordarUsuario').setValue(true);
    }
  }

  crearFormulario() {
    this.form_group = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      recordarUsuario: [true, []],
    })
  }

  guardar() {
    console.log(this.form_group);

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    if (this.form_group.invalid) {
      Object.values(this.form_group.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
        Swal.close();
      });
    } else {
      this.authService.login(this.form_group.value).subscribe(data => {
        console.log(data);
        if (this.form_group.get('recordarUsuario').value) { localStorage.setItem('email', this.usuarioModel.email); }
        Swal.close();
        this.router.navigateByUrl("/api-youtube");
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar credenciales',
          text: err.error.error.message
        });
        this.form_group.reset();
      })
    }
  }

  get validacionEmail() {
    return this.form_group.get('email').invalid && this.form_group.get('email').touched;
  }

  get validacionContrasena() {
    return this.form_group.get('password').invalid && this.form_group.get('password').touched;
  }
}