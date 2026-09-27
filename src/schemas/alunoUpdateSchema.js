const z = require("zod");

const alunoUpdateSchema = z.object({
    nome: z.string().trim().min(3, "Nome muito curto").optional(),
    email: z.string().trim().email("E-mail inválido.").optional()
}).refine((data) => data.nome !== undefined || data.email !== undefined, {
    message: "Informe pelo menos um campo para atualizar."
});

module.exports = alunoUpdateSchema;