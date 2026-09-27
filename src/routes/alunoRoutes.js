const express = require("express");
const alunoController = require("../controllers/AlunoController");
const validarAluno = require("../middlewares/validarAluno");
const validarAlunoUpdate = require("../middlewares/validarAlunoUpdate");

const router = express.Router();

router.get("/", alunoController.findMany);
router.get("/:id", alunoController.findUnique);
router.post("/", validarAluno, alunoController.create);
router.put("/:id", validarAlunoUpdate, alunoController.update);

// Utilizei PUT porque já existe um schema que permite enviar somente os campos que desejo alterar

module.exports = router;