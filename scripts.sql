create table en_user (
	code serial primary key,
	name varchar not null,
	birth date not null,
	avatar varchar
);