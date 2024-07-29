export class User {
    id?: number;
    nome?: string;
    matricula?: string;
    email?: string;
    senha?: string;
    quantidadeEmprestimosPermitida?: number;
    quantidadeEmprestimosRealizados?: number;
    bloqueado?: boolean;

    constructor(user: User) {
        this.id = user.id;
        this.nome = user.nome;
        this.email = user.email;
        this.senha = user.senha;
        this.matricula = user.matricula;
    }
}
