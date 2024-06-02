use vamo_auto_mv;

show tables;
 select * from usuario;
 select * from abastecimento;
 UPDATE  usuario set senha_usuario = 'senha1' where id_usuario = 2;
UPDATE usuario 
SET primeiro_nome = 'Carlos', 
    segundo_nome = 'Amelia', 
    senha_usuario = 'senha1' 
WHERE id_usuario = 2;
