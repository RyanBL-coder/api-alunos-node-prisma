const alunoService = require("../services/AlunoService");

class AlunoController {

    async findMany(request, response) {
        try{
            let { page, pageSize } = request.query;
            page ||= 1;
            pageSize ||= 10;
            
            const alunos = await alunoService.findMany(page, pageSize);
            return response.status(200).json({ alunos });
        } catch(e){
            return response.status(e.statusCode).json({error: e.message});
        }
    }

    async create(request, response) {
        try{
            const aluno = await alunoService.create(request.body);
            return response.status(201).json({ aluno });
        } catch(e) {
            return response.status(e.statusCode).json({error: e.message});
        }
    }
}

module.exports = new AlunoController();