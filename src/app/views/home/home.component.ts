import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class HomeComponent implements OnInit {
  items: MenuItem[];
  displayEditaLista: boolean = false;
  displayEditaTarefa: boolean = false;
  displayCriaTarefa: boolean = false;
  editTarefaForm: FormGroup;
  editListaForm: FormGroup;
  createTarefaForm: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.items = [];
    this.editListaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.editTarefaForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(6)]],
      completa: [],
    });
    this.createTarefaForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(6)]],
      completa: [],
    });
  }

  ngOnInit(): void {
    this.menu();
  }

  menu(): void {
    this.items = [
      {
        label: 'Selecione',
        items: [
          {
            label: 'Alterar Lista',
            icon: 'pi pi-refresh',
            command: () => {
              console.log('editar');
              this.modalEditaLista();
            },
          },
          {
            label: 'Apagar Lista',
            icon: 'pi pi-times',
            command: () => {
              console.log('apagar');
              this.modalDeletaLista();
            },
          },
          {
            label: 'Nova Tarefa',
            icon: 'pi pi-check',
            command: () => {
              console.log('criar tarefa');
              this.modalCriaTarefa();
            },
          },
        ],
      },
    ];
  }

  modalEditaLista(): void {
    console.log('edita lista');
    this.displayEditaLista = true;
  }

  confirmaEditaLista(): void {
    console.log(this.editListaForm.value);
    this.displayEditaLista = false;
    this.toast('success', 'Editar', 'Lista alterada com sucesso !');
  }

  modalDeletaLista(): void {
    this.confirmationService.confirm({
      message:
        'Deseja apagar esta lista ? Serão apagadas também as tarefas desta lista!',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.confirmaDeletaLista();
      },
      reject: () => {
        console.log('cancelou delete');
      },
    });
  }

  confirmaDeletaLista(): void {
    this.toast(
      'success',
      'Exclusão',
      'Lista e suas tarefas apagadas com sucesso !'
    );
  }

  modalCriaTarefa(): void {
    console.log('criar nova tarefa');
    this.displayCriaTarefa = true;
  }

  confirmaCreateTarefa(): void {
    console.log(this.createTarefaForm.value);
    this.displayCriaTarefa = false;
    this.toast('success', 'Criação', 'Tarefa criada com sucesso !');
  }

  modalEditaTarefa(): void {
    console.log('edita tarefa');
    this.displayEditaTarefa = true;
  }

  confirmaEditaTarefa(): void {
    console.log(this.editTarefaForm.value);
    this.displayEditaTarefa = false;
    this.toast('success', 'Editar', 'Tarefa alterada com sucesso !');
  }

  modalDeletaTarefa(): void {
    this.confirmationService.confirm({
      message: 'Deseja apagar esta Tarefa ?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.confirmaDeletaTarefa();
      },
      reject: () => {
        console.log('cancelou delete');
      },
    });
  }

  confirmaDeletaTarefa(): void {
    this.toast('success', 'Exclusão', 'Tarefa apagada com sucesso !');
  }

  public toast(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
