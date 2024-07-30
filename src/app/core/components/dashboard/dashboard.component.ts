import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../../demo/api/product';
import { ProductService } from '../../../demo/service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LivrosService } from '../../service/livros.service';
import { Livro } from '../../models/livro';
import { ImagemService } from '../../service/imagem.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    livro: Livro;
    livros: Livro[] = [];

    totalLivros: number = 0;


    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(private livrosService: LivrosService, public layoutService: LayoutService, private imagemService: ImagemService) {

    }

    getCapaUrl(nomeArquivoCapa: string): string {
        return this.imagemService.getCapaLivroUrl(nomeArquivoCapa);
    }

    ngOnInit() {
        this.livrosService.getLivros().subscribe(
          (datas) => {
            console.log('Dados recebidos:', datas); // Log dos dados recebidos
            this.livros = datas;
            this.totalLivros = datas.length;
            console.log('Total de livros:', this.totalLivros); // Log do total de livros
            // this.cdr.detectChanges(); // Forçar detecção de mudanças
          },
          (error) => {
            console.error('Erro ao obter os livros:', error);
          }
        );
      }
}
