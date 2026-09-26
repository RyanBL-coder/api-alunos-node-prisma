const express = require("express");
const alunoController = require("../controllers/AlunoController");
const validarAluno = require("../middlewares/validarAluno");

const router = express.Router();

router.get("/", alunoController.findMany);
router.post("/", validarAluno, alunoController.create);

module.exports = router;