import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public erro: any = null;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  public login(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        //this.toast('success', 'Login', 'Login efetuado com sucesso !');
        localStorage.setItem('token', res.token);
        localStorage.setItem('_id', res.user._id);
        //  this.router.navigate(['/home']);
        this.router.navigate(['/home']).then(() => {
          this.toast('success', 'Login', 'Login efetuado com sucesso !');
        });
      },
      (error: any) => {
        this.erro = error;
        this.handleError(this.erro);
        this.loginForm.reset();
      }
    );
  }

  public handleError(erro: any): void {
    if (erro.error.code === 130) {
      this.toast(
        'error',
        'Login',
        'Email não encontrado em nossa base de dados !'
      );
    }
    if (erro.error.code === 140) {
      this.toast('error', 'Login', 'Email/Senha não confere !');
    }
  }

  public toast(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
