import { ClientModel } from './../client.model';
import { ClientService } from './../../../service/client/client.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AddressModel } from '../address.model';

interface TipoSexo {
  name: string;
  hint: string;
}

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
  providers: [MessageService]
})
export class ClientCreateComponent implements OnInit {

  address: AddressModel = {
    cep: ''
  }

  participante: ClientModel = {
    endereco: this.address,
    cpfCnpj: '',
    documento: '',
    nome: '',
    ativa: true,
    dataCadastro: new Date()
  }
  tiposSexo: TipoSexo[] | undefined;
  selectedTipoSexo: TipoSexo | undefined;
  value: string | undefined;
  validateName: boolean = true;
  validateCpf: boolean = true;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.tiposSexo = [
      { name: 'N', hint: 'Não Declarar' },
      { name: 'M', hint: 'Masculino' },
      { name: 'F', hint: 'Feminino' },
      { name: 'O', hint: 'Outro' },
    ];
  }

  navigateToClientList(): void {
    this.router.navigate(['/client-list'])
  }

  createParticipante() {
    if (this.validateInputs()) {

      this.participante.sexo = this.selectedTipoSexo!.name;

      this.clientService.createClient(this.participante).subscribe(
        {
          next: (data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Participante salvo com sucesso!' });
          },
          error: (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível salvar o Participante!' });
            console.error('Erro ao chamar API de Participante!', error);
          }
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Valide os campos obrigatórios' });
    }

  }

  validateInputs() {
    var check = true;
    this.validateName = true;
    this.validateCpf = true;
    if (this.participante.nome === '' || this.participante.nome === undefined) {
      this.validateName = false;
      check = false;
    } else if (this.participante.cpfCnpj === '' || this.participante.cpfCnpj === undefined) {
      this.validateCpf = false;
      check = false;
    }

    return check;
  }

  getCep() {

    this.clientService.getCep(Number(this.participante.endereco!.cep)).subscribe(
      {
        next: (data: any) => {
          this.participante.endereco!.logradouro = data.logradouro;
          this.participante.endereco!.bairro = data.bairro;
          this.participante.endereco!.uf = data.uf;
          this.participante.endereco!.cidade = data.localidade;
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível capturar o cep!' });
        }
      }
    );

  }


}
