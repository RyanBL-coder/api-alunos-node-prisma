const alunoService = require("../services/AlunoService");

class AlunoController {

    async findMany(request, response) {
        try{
            let { page, pageSize, orderBy, order } = request.query;
            page ||= 1;
            pageSize ||= 10;
            orderBy ||= "id";
            order ||= "asc";
            
            const resultado = await alunoService.findMany(page, pageSize, orderBy, order);

            return response.status(200).json(resultado);
        } catch(e){
            return response.status(e.statusCode).json({error: e.message});
        }
    }

    async findUnique(request, response) {
        try {
            const aluno = await alunoService.findUnique(request.params.id);
            return response.status(200).json({ aluno });
        } catch(e){
            return response.status(e.statusCode).json({ error: e.message })
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

    async update(request, response) {
        try {
            const aluno = await alunoService.update(
                request.params.id,
                request.body
            );

            return response.status(200).json({ aluno });
        } catch(e) {
            return response.status(e.statusCode).json({ error: e.message });
        }
    }

    async delete(request, response) {
        try {
            await alunoService.delete(request.params.id);

            return response.status(204).send();
        } catch(e) {
            return response.status(e.statusCode).json({ error: e.message });
        }
    }
}

/* Requisito 03
 * Utilizei 200 (linha 46) porque se trata da atualização de um recurso existente, o qual estou devolvendo o aluno atualizado no corpo da resposta
*/

/* Requisito 04
 * Por que o status HTTP escolhido foi o "204 No Content" (Linha 56)? Porque esse status significa que a operação foi realizada com sucesso, mas não há conteúdo para retornar no corpo da resposta.
*/

module.exports = new AlunoController();