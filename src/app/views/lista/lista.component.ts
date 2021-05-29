import { UserService } from './../../services/user.service';
import { ListaService } from './../../services/lista.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  providers: [MessageService],
})
export class ListaComponent implements OnInit {
  createListaForm: FormGroup;

  public erro: any = null;
  private _userId: any = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private listaService: ListaService,
    private userService: UserService
  ) {
    this.createListaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(6)]],
      descricao: ['', [Validators.required, Validators.minLength(6)]],
      _userId: [null],
    });
  }

  ngOnInit(): void {
    this.getProfile();
  }

  onSubmit(): void {
    console.log(this.createListaForm.value);

    this.listaService.create(this.createListaForm.value).subscribe(
      (res: any) => {
        this.toast('success', 'Inclusão', 'Lista criada com sucesso !');
      },
      (error: any) => {
        this.erro = error;
        this.toast('error', 'Inclusão', 'Erro ao cadastrar nova lista !');
        this.createListaForm.reset();
      }
    );
  }

  getProfile(): void {
    this._userId = localStorage.getItem('_id');

    console.log(this._userId);

    this.userService.getProfile(this._userId).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error: any) => {
        this.erro = error;
        console.log(error);
        this.toast('error', 'Usuário', 'Erro ao buscar dados do usuário !');
        this.createListaForm.reset();
      }
    );
  }

  public toast(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
