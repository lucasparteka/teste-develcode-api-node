create table en_user (
	codigo serial primary key,
	nome varchar not null,
	data_nascimento date not null,
	foto varchar
);

insert into en_user (nome, data_nascimento) values ('João da Silva', '1980-01-01');
insert into en_user (nome, data_nascimento) values ('Maria Pereira', '1990-02-20');
insert into en_user (nome, data_nascimento) values ('Ana Cristina', '1985-05-10');
insert into en_user (nome, data_nascimento) values ('Carlos Machado', '1995-11-25');