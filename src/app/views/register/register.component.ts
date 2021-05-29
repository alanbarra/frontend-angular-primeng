import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  public erro: any = null;
  public status = true;

  registerForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      passwordConfirmacao: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  public register(): void {

    this.validaRegistroForm();

    if (this.status === true) {
      this.userService.register(this.registerForm.value).subscribe(
        (res: any) => {
          this.registerForm.reset();
          this.toast(
            'success',
            'Cadastro',
            'Cadastro efetuado com sucesso. Efetue Login !'
          );
        },
        (error: any) => {
          console.log(error);
          this.erro = error;
          this.handleError(this.erro);
          this.registerForm.reset();
        }
      );
    }
  }

  public handleError(erro: any): void {
    if (erro.status === 400) {
      this.toast('error', 'Cadastro', 'Já existe cadastro com este email !');
    } else {
      this.toast(
        'error',
        'Erro',
        'Erro ao efetuar cadastro, tente novamente !'
      );
    }
  }

  public validaRegistroForm(): void {
    if (
      this.registerForm.value.password !==
      this.registerForm.value.passwordConfirmacao
    ) {
      this.toast('error', 'Cadastro', 'Senhas devem ser iguais !');
      this.status = false;
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
