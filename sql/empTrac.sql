DROP DATABASE IF EXISTS empTrac_db;
-- Creates the "empTrac_db;" database --
CREATE DATABASE empTrac_db;

-- Makes it so all of the following code will affect empTrac_db; --
USE empTrac_db;

-- Creates table "department" --
CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  CONSTRAINT PK_department PRIMARY KEY (id)
); 

-- Creates table "role" --
CREATE TABLE role (
id INT UNSIGNED AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL (10,2) UNSIGNED NOT NULL,
department_id INT UNSIGNED,  
PRIMARY KEY (id),
INDEX dept_id(department_id),
CONSTRAINT FK_department FOREIGN KEY (department_id) REFERENCES department(id)
);
 

-- Creates table "employee" --
CREATE TABLE employee (
id INT UNSIGNED AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT UNSIGNED NOT NULL,
manager_id INT UNSIGNED,
PRIMARY KEY (id), 
INDEX roles(role_id),
INDEX managers(manager_id),
CONSTRAINT FK_role FOREIGN KEY (role_id) REFERENCES role(id), 
CONSTRAINT FK_manager FOREIGN KEY (manager_id) REFERENCES employee(id)
); 