const ApiError = require("./ApiError");

class EmailDuplicadoError extends ApiError {
    constructor(message = "E-mail já cadastrado", statusCode = 409) {
        super(message, statusCode);
    }
}

/* Por que uma exceção própria para e-mail duplicado?
 * Porque em "AlunoNaoEncontradoError" o recurso que quero atualizar não existe. Já em "EmailDuplicadoError" o recurso existe, mas os novos dados violam uma regra de unicidade.
 * Acho que reutilizar "AlunoInvalidoError" nãp seria tão adequado, porque  mesmo que o email estivesse corretamente formatado, o problema é que já está cadastrado.
 * Usei 409 Conflict porque depois de pesquisar, vi que a requisição é válida em estrutura, mas entra em conflito com a restrição de unicidade existente.
*/

module.exports = EmailDuplicadoError;