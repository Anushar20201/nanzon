USE nanzon;

INSERT INTO department ( name)
VALUES 
    ("Sales"),
    ("Technology");

INSERT INTO role
    ( title, salary, department_id)
VALUES
    ( "Engineer", 5000, 1),
    ( "Assistant", 3000, 2);


INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES 
    ( "Bob", "Smith", 2, NULL),
    ( "Ted", "Nelson", 1, 1);