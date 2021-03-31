DROP DATABASE IF EXISTS empTrac_db;
-- Creates the "empTrac_db;" database --
CREATE DATABASE empTrac_db;

-- Makes it so all of the following code will affect empTrac_db; --
USE empTrac_db;

-- Creates table "department" --
CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

-- Creates table "role" --
CREATE TABLE role (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL (10,2)NOT NULL,
department_id INT,  
PRIMARY KEY (id),

CONSTRAINT fk_department 
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE CASCADE
);

-- Creates table "employee" --
CREATE TABLE employee (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY (id),

CONSTRAINT fk_role
FOREIGN KEY (role_id)
REFERENCES role(id)
ON DELETE CASCADE,

CONSTRAINT fk_employee 
FOREIGN KEY (manager_id)
REFERENCES employee(id)
ON DELETE SET NULL
);