const alunoUpdateSchema = require("../schemas/alunoUpdateSchema");

const validarAlunoUpdate = (request, response, next) => {
    const result = alunoUpdateSchema.safeParse(request.body);

    console.log(result);

    if(!result.success) {
        const errors = result.error.issues.map((e) => {
            return {
                campo: e.path[0],
                message: e.message
            };
        });

        return response.status(400).json({ error: errors });

    }

    request.body = result.data;
    next();
}

/* O que esse middleware faz?
 * Ele segue exatamente o mesmo padrão do middleware "validarAluno.js", verificando se os dados recebidos são estruturamente válidos
 * Por que criar um novo middleware ao invés de usar o "validarAluno.js" já existente? Porque o validarAluno.js atende ao POST e está funcionando corretamente.
 * Então achei melhor criar um novo para usar no requisito de UPDATE (PUT/PATCH)
*/

module.exports = validarAlunoUpdate;