USE empTrac_db;

INSERT INTO department (id, name)
VALUES ("Culinary"),
("B&C"),
("Maintenance");

INSERT INTO role (title, salary, department_id)
VALUES ("Culinary Lead", 45000, 1),
("Culinary Cook", 34000, 1),
("Culinary Prep", 30000, 1),
("B&C Lead", 40000, 2),
("B&C Server", 20000, 2),
("B&C House Men", 25000, 2),
("Maintenance Grounds", 25000, 3),
("Maintenance Electrical", 46000, 3),
("Maintenance Plumbing", 45000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Blue", "Barry", 1, 5),
("Rock", "Cod", 2, 5),
("Steak", "Fritz", 3, 5),
("Lucy", "Lead", 4, 7),
("Sally", "Server", 5, 7),
("Henry", "House", 6, 7),
("Gery", "Grounds", 7, 10),
("Eric", "Electric", 8, 10),
("Peter", "Plumber", 9, 10);





