USE nanzon;

INSERT INTO department (id, name)
VALUES 
    (1, "Sales"),
    (2, "Technology");

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (200, "Engineer", 5000, 1),
    (201, "Assistant", 3000, 2);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
    (101, "Bob", "Smith", 200, NULL),
    (102, "Ted", "Nelson", 201, 101);