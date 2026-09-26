const prisma = require("../databases/prisma");
const AlunoInvalidoError = require("../errors/AlunoInvalidoError");
const PaginacaoInvalidaError = require("../errors/PaginacaoInvalidaError");

class AlunoService {

    async findMany(page, pageSize) {
        //SELECT * FROM alunos
        
        page = Number(page);
        pageSize = Number(pageSize);
        if(!page || !page < 1 || !pageSize || !pageSize < 1){
            throw new PaginacaoInvalidaError();
        }
        const alunos = await prisma.aluno.findMany({
            skip: (page - 1) * pageSize,
            take: Number(pageSize)
        });
        return alunos;
    }

    async create(aluno) {
        //create = insert
        //update = update
        //delete = delete
        //findMany = select * from

        const {nome, email} = aluno;
        if(!nome || !email){
            throw new AlunoInvalidoError();
        }
        const novoAluno = await prisma.aluno.create({ data: aluno });
        return novoAluno;
    }
}

module.exports = new AlunoService();