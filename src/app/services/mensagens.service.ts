import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  listMensagens: string[] = new Array<string>();
  mensagem: string;

  constructor() { }

  addMensagem(mensagem: string) {
    this.listMensagens.push(mensagem);

    if (this.listMensagens.length <= 1) {
      this.setMensagem();
    }
  }

  getMensagem(): string {
    return this.mensagem;
  }

  async setMensagem() {
    this.mensagem = this.listMensagens[0];

    setTimeout(() => {
      if (this.listMensagens.length > 0) {
        this.listMensagens.shift();
        this.setMensagem();
      } else {
        this.mensagem = null;
      }
    }, 5000);
  }
}
