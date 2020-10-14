import { Component, OnInit } from '@angular/core';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.scss'],
})
export class MensagensComponent implements OnInit {

  constructor(private mensagemSerivce: MensagensService) { }

  ngOnInit() {
  }

  getMensagem(): string {
    return this.mensagemSerivce.getMensagem();
  }

}
