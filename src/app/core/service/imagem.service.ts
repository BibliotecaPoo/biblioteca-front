import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

    private baseUrl: string = 'http://localhost:8081'; // servidor de imagens

    constructor() { }

    getCapaLivroUrl(nomeArquivoCapa: string): string {
      return `${this.baseUrl}/${nomeArquivoCapa}`;
    }
}
