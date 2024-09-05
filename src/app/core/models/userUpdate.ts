export class UserUpdate {
    id?: number;
    nome?: string;
    matricula?: string;
    curso?:string;
    email?: string;
    senha?: string;

    constructor(user: UserUpdate) {
        this.id = user.id;
        this.nome = user.nome;
        this.email = user.email;
        this.senha = user.senha;
        this.matricula = user.matricula;
        this.curso = user.curso;
    }
}
