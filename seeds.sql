DROP DATABASE IF EXISTS employeecms_db;
CREATE database employeecms_db;

USE employeecms_db;

CREATE TABLE department (
	id INTEGER AUTO_INCREMENT NOT NULL,
	name VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INTEGER AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	role_id INTEGER,
	manager_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

INSERT INTO department (name)
VALUES ("Sale");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", "100000", "001");
INSERT INTO role (title, salary, department_id)
VALUES ("CFO", "100000", "001");
INSERT INTO role (title, salary, department_id)
VALUES ("Marketing", "100000", "001");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shreya", "Patel", "002", "002");
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Jobs", "003", "004");
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sunder", "Pichai", "003", "004");


INSERT INTO department (name) VALUES ("Marketing");