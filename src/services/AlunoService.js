const prisma = require("../databases/prisma");
const AlunoInvalidoError = require("../errors/AlunoInvalidoError");
const AlunoNaoEncontradoError = require("../errors/AlunoNaoEncontradoError");
const PaginacaoInvalidaError = require("../errors/PaginacaoInvalidaError");

class AlunoService {

    async findMany(page, pageSize, orderBy, order) {
        //SELECT * FROM alunos
        
        page = Number(page);
        pageSize = Number(pageSize);

        if(page < 1 || pageSize < 1){
            throw new PaginacaoInvalidaError();
        }
        const alunos = await prisma.aluno.findMany({
            skip: (page - 1) * pageSize,
            take: Number(pageSize),
            orderBy: {
                [orderBy]: order
            }
        });

        const total = await prisma.aluno.count()

        return { alunos, total };
    }

    async findUnique(id) {
        id = Number(id);

        const aluno = await prisma.aluno.findUnique({
            where: {
                id: id
            }
        });

        if(!aluno) {
            throw new AlunoNaoEncontradoError();
        }

        return aluno;
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