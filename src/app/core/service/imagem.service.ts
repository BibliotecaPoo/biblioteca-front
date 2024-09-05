import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

    private baseUrl: string = 'http://localhost:8081';

    constructor() { }

    getCapaLivroUrl(nomeArquivoCapa: string): string {
      return `${this.baseUrl}/${nomeArquivoCapa}`;
    }
}
