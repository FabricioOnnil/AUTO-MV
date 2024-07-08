USE vamo_mv;

SHOW tables;

SELECT * FROM usuario;

INSERT INTO usuario (s_usuario_name, s_usuario_secondName, s_usuario_password, i_usuario_licenseDriving, s_usuario_sectorShipping, d_usuario_dateExpiration) VALUES ('Yuri','Alberto','87654321','768102','Detran-ES','2030-03-07');

SELECT * From usuario;

INSERT INTO usuario (s_usuario_name, s_usuario_secondName, s_usuario_password, i_usuario_licenseDriving, s_usuario_sectorShipping, d_usuario_dateExpiration) VALUES ('Pedro','Claudio','222222','865741','Detran-SP','2035-06-17');