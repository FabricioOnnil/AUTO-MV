import express from 'express';
import usuario from '../models/usuarioData.js';

const router = express.Router();

// Rota para buscar todos os usuario
router.get('/usuario', (req, res) => {
  usuario.findAll()
    .then((usuario) => {
      res.json(usuario);
    })
    .catch((error) => {
      res.status(500).send("Erro ao buscar usuario: " + error.message);
    });
});


// Rota para buscar um usuario pelo ID
  router.get('/usuario/:id', (req, res) => {
    const usuarioId = req.params.id;
    usuario.findOne({ where: { i_usuario_user: usuarioId } })
      .then((usuario) => {
        if (!usuario) {
          res.status(404).send("usuario não encontrado");
        } else {
          res.json(usuario);
        }
      })
      .catch((error) => {
        res.status(500).send("Erro ao buscar usuario: " + error.message);
      });
  });

// Rota para cadastrar um novo usuario
router.post('/usuario', (req, res) => {
usuario.create(req.body)
    .then(() => res.send("usuario cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar usuario: " + error.message));
});

//Rota para atualizar um usuario pelo ID
router.put('/usuario/:id', (req, res) => {
  const usuarioId = req.params.id;
  usuario.update(req.body, { where: { i_usuario_user: usuarioId } })
    .then(() => res.send("usuario atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar usuario: " + error.message));
});

// Rota para deletar um usuario pelo ID
router.delete('/usuario/:id', (req, res) => {
  const usuarioId = req.params.id;
  usuario.destroy({ where: {  i_usuario_user: usuarioId } })
    .then(() => res.send("usuario deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar usuario: " + error.message));
});


export default router;
