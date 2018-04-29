
drop database if exists arcade;
create database arcade;
use arcade;

create table arcade_machine
	(game_name varchar(50),
	game_id  numeric(4,0),
    game_cost numeric(2,0),
    play_count numeric(4,0),
    primary key (game_id)
	);

create table food
	(food_name varchar(20),
    food_id numeric(4,0),
    food_cost numeric(4,2),
    primary key (food_id)
    );
    
create table customer
	(cust_id numeric(4,0),
    balance numeric(4,2),
    money_spent numeric(4,2),
    primary key (cust_id)
	);

create table gift_shop
	(item_id numeric(4,0),
    item_name varchar(20),
    item_quantity numeric(4,0),
    item_cost numeric(4,2),
    primary key (item_id)
    );

create table pool_table
	(p_table_id numeric(4,0),
    p_cost numeric(6,0),
    primary key (p_table_id)
    );


create table employee
	(emp_id numeric(4,0),
    emp_name varchar(20),
    emp_type varchar(20),
    primary key (emp_id)
    );
    

create table beverage
	(drink_name varchar(20),
    drink_id numeric(4,0),
    drink_cost numeric (4,2),
    primary key (drink_id)
    );


