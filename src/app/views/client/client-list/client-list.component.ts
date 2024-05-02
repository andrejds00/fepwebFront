import { ClientModel } from './../client.model';
import { ClientService } from './../../../service/client/client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ClientListComponent implements OnInit {

  participantes!: ClientModel[];
  selectedClient!: ClientModel;
  loading: boolean = false;
  codigo: number | undefined;
  cpf: string | undefined;
  nome: string | undefined;
  visibleDialog: boolean = false;
  participante: ClientModel = {
    cpfCnpj: '',
    documento: '',
    nome: ''
  }

  constructor(
    private router: Router,
    private clientService: ClientService,
    private config: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.read();
    this.config.setTranslation({
      contains: 'Contém',
      startsWith: 'Começa com',
      notContains: 'Não Contém',
      endsWith: 'Termina com',
      equals: 'Igual',
      notEquals: 'Não igual',
      noFilter: 'Sem Filtro',
      lt: 'Menor que',
    });

  }

  navigateToClientCreate(): void {
    this.router.navigate(['/client-create'])
  }

  clear(table: Table) {
    this.codigo = undefined;
    this.cpf = undefined;
    this.nome = undefined;
    table.clear();
  }

  read() {
    this.loading = true;
    this.clientService.readClient(this.codigo!, this.cpf!, this.nome!).subscribe(
      {
        next: (data: ClientModel[]) => {
          this.participantes = data;
          console.log('Participantes carregados com sucesso!!', this.participantes);
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Erro ao chamar API de Participantes!', error);
        }
      }
    );
  }

  delete(codigo: number) {
    this.clientService.delete(codigo).subscribe(
      {
        next: (data: any) => {
          this.messageService.add({ severity: 'info', summary: 'Deletado!', detail: 'Participante deletado com sucesso!' });
          this.read();
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível deletar o participante!' });

        }
      }
    );
  }

  selectClient(data: ClientModel) {
    this.confirmationService.confirm({
      message: 'Ao confirmar o registro será deletado, deseja realmente excluir?',
      header: 'Deseja realmente excluir?',
      icon: 'pi pi-info-circle',
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Registro não deletado' });
      },
      accept: () => {
        this.delete(data.id!);

      }
    });

  }

  showDialog(data: ClientModel) {
    this.participante = data;
    this.visibleDialog = true;
  }

}
