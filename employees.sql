DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id int,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int,
  manager_id int,
  PRIMARY KEY (id)
);

INSERT INTO employee (first_name,last_name,role_id) VALUES ('Garrett','Walter',1);
INSERT INTO employee (first_name,last_name,role_id) VALUES ('Bang','Pham',2);
INSERT INTO employee (first_name,last_name,role_id) VALUES ('Jason','Reichel',3);
Insert Into roles (title,salary,department_id) values ('Full Stack',90000,1);
Insert Into roles (title,salary,department_id) values ('Graphic Designer',60000,2);
Insert Into roles (title,salary,department_id) values ('Salesman',70000,3);
INSERT into department (name) values ('Dev');
INSERT into department (name) values ('Marketing');
INSERT into department (name) values ('Sales');

SELECT 
employee.first_name, 
employee.last_name, 
roles.title,
roles.salary,
roles.department_id,
department.name
FROM employee 
LEFT JOIN roles
ON employee.role_id = roles.id
LEFT JOIN department
ON roles.department_id = department.id;
