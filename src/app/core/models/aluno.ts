export class Aluno {
    id?: number;
    nome?: string;
    matricula?: string;
    email?: string;
    senha?: string;

    constructor(user: Aluno) {
        this.id = user.id;
        this.email = user.email;
        this.senha = user.senha;
        this.nome = user.nome;
        this.matricula = user.matricula;
    }
}
