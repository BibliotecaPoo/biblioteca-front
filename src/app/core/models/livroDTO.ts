export class LivroDTO {
    id?: number;
    titulo?: string;
    autor?: string;
    edicao?: string;
    editora?: string;
    anoPublicacao?: number;
    quantidadeExemplaresDisponiveisEmEstoque?: number;

    constructor(livro: LivroDTO) {
        this.id = livro.id;
        this.titulo = livro.titulo;
        this.autor = livro.autor;
        this.edicao = livro.edicao;
        this.editora = livro.editora;
        this.anoPublicacao = livro.anoPublicacao;
        this.quantidadeExemplaresDisponiveisEmEstoque = livro.quantidadeExemplaresDisponiveisEmEstoque;
    }
}
