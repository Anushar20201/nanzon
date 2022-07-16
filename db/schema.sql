DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
  CONSTRAINT fk_dept
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  CONSTRAINT fk_role
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_man
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL

);

