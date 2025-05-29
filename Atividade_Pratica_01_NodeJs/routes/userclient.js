var express = require("express")
var router = express.Router()


const usuarios =[]
let proximoId = 1; 

//Consulta usuários.
router.get("/consulta", (req,res)=>{
    res.json({
        mensagem: "Lista de usuários:", // a quebra de linha estará na string
        usuarios: usuarios
    })});

//Cadastro de novos usuários.
router.post("/cadastro", function (req, res) {
    const { nome, email } = req.body;

    if (!nome || !email)  {
        return res.status(400).json({ status: "Nome ou email não fornecidos" });
    }

    const email_cons = usuarios.find(c => c.email.toLowerCase() === email.toLowerCase());

    if (email_cons)  {
        return res.status(400).json({ status: "Email já cadastrado" });
    }

    const novoUsuario = { id: proximoId++, nome: nome, email: email};
    usuarios.push(novoUsuario);
    
    try {
        res.json({
            status: "Usuário cadastrado",
            id : novoUsuario.id,
            nome: nome,
            email: email,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Consulta de usuário. Caso tenha usuários de mesmo nome e emails diferentes, uma lista é mostrada.
router.get("/consultausuario", (req, res) => {
    const nome = req.query.nome;

    if (!nome) {
        return res.status(400).json({ status: "Nome não fornecido" });
    }

    const resultados = usuarios.filter(c => c.nome.toLowerCase() === nome.toLowerCase());

    if (resultados.length > 0) {
        return res.json({
            status: "Usuários encontrados",
            resultados
        });
    } else {
        return res.json({ status: "Usuário não encontrado" });
    }
});

//Exclusão de usuário através do email
router.delete("/exclusao", function (req, res) {
    const email = req.body.email;

    if (!email)  {
        return res.status(400).json({ status: "Email não fornecido" });
    }

    const index = usuarios.findIndex(cliente => cliente.email.toLowerCase() === email.toLowerCase());

    if (index !== -1)  {
        usuarios.splice(index, 1);
        return  res.json({
                status: "Usuário excluido com sucesso",
                email: email,
        });
    } else {
        return res.status(404).json({ status: "Usuário não encontrado" });

    }

});

module.exports = router;