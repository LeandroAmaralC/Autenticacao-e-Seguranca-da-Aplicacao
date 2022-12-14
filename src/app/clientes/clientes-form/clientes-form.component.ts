import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service'

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cliente = new Cliente();

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x => {

      if (x && x.id) {
        this.service.getClienteById(x.id).subscribe(response => {
          this.cliente = response;
        });
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes/lista'])
  }

  onSubmit() {
    if (this.id) {

      this.service
      .atualizar(this.cliente)
      .subscribe(response => {
        this.success = true;
        this.errors = null;
      }, errorResponse => {
        this.errors = ['Erro ao atualizar o cliente.']
      })

    } else {

      this.service
        .salvar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors.push('');
          this.cliente = response;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
           })
    }
  }

}
