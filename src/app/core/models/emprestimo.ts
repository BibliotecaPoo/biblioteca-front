import { Livro } from "./livro";
import { User } from "./user";

export class Emprestimo {
    id?: number;
    dataEmprestimo?: string;
    dataDevolucaoPrevista?: string;
    dataDevolucaoRealizada?: string;
    statusEmprestimo?: string;
    quantidadeRenovacoesPermitida?: number;
    quantidadeRenovacoesRealizadas?: number;
    usuario?: User;
    livro?: Livro;
    ativo?: boolean;

    constructor(data: Emprestimo) {
        this.id = data.id;
        this.dataEmprestimo = data.dataEmprestimo;
        this.dataDevolucaoPrevista = data.dataDevolucaoPrevista;
        this.dataDevolucaoRealizada = data.dataDevolucaoRealizada;
        this.statusEmprestimo = data.statusEmprestimo;
        this.quantidadeRenovacoesPermitida = data.quantidadeRenovacoesPermitida;
        this.quantidadeRenovacoesRealizadas = data.quantidadeRenovacoesRealizadas;
        this.usuario = data.usuario;
        this.livro = data.livro;
        this.ativo = data.ativo;
    }
}
