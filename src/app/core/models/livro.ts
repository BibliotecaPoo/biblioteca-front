export class Livro {
    id?: number;
    titulo?: string;
    autor?: string;
    edicao?: string;
    editora?: string;
    anoPublicacao?: number;
    quantidadeExemplaresDisponiveisEmEstoque?: number;
    quantidadeExemplaresDisponiveisParaEmprestimo?: number;
    statusLivro?: string;
    nomeArquivoCapa?: string;

    constructor(livro: Livro) {
        this.id = livro.id;
        this.titulo = livro.titulo;
        this.autor = livro.autor;
        this.edicao = livro.edicao;
        this.editora = livro.editora;
        this.anoPublicacao = livro.anoPublicacao;
        this.quantidadeExemplaresDisponiveisEmEstoque = livro.quantidadeExemplaresDisponiveisEmEstoque;
        this.quantidadeExemplaresDisponiveisParaEmprestimo = livro.quantidadeExemplaresDisponiveisParaEmprestimo;
        this.statusLivro = livro.statusLivro;
        this.nomeArquivoCapa = livro.nomeArquivoCapa;
    }
}
