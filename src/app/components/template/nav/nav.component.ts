import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [MessageService]
})
export class NavComponent implements OnInit{
    items!: MenuItem[];

    constructor(
        private messageService: MessageService
        ) {}

    ngOnInit() {

        this.items = [
            {
                label: 'Cadastros',
                icon: 'pi pi-fw pi-file',
                items: [ 
                    {
                        label: 'Participante',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: '/client-list'
                    }
                ]
            }
        ];
    }
    

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    }

}
