



// Postagem

const postagem = sequelize.define('postagens', {
    titulo:{
        type: STRING
    },
    conteudo: {
        type: TEXT
    }

})

postagem.create({
    titulo: "Um titulo Qualquer",
    conteudo: "Eu quero ser feliz todos os dias."
})
//postagem.sync({force: true})

// Usuario

const Usuario = sequelize.defined('Usuarios', {
    nome: {
        type: STRING
    },
    sobrenome: {
        type: STRING
    },
    idade: {
        type: INTEGER
    },
    email: {
        type: STRING
    }
})

//Usuario.sync({force: true})