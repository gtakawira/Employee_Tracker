DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  deptname VARCHAR(30)
 
);
CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) ,
  salary DECIMAL,
  department_id INT,

   PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)  
    ON DELETE CASCADE
);
CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT ,
  manager_id INT,

   PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)  
    ON DELETE CASCADE,
      FOREIGN KEY (manager_id) REFERENCES employee(id)
);
     
