INSERT INTO department (deptname)
VALUES ("Production"),
("Research and Development"),
("Purchasing"),
("Marketing"), 
("Human Resource"),
("Finance");

INSERT INTO role (title,salary,department_id)
VALUES ("Developer",2000,1),
("LMS Administrator",4000,1), 
("Customer Support",2100,1),
("Dev Manger",3500,1),
("Subject-Matter Expert", 3500,2),
("Tech Team", 4100,2),
("R an D Manager", 6000,2),
("Purchasing Manager",6000,3),
("Accountant",2500,3),
("Marketing Manger",6500,4),
("Marketing Assistant",4000,4), 
("Human Resource Admin",6000,5),
("HR Assistant",5565,5),
("Finance Director", 8000,6),
 ("CFO",7500,6);

INSERT INTO employee (first_name,last_name,role_id, manager_id)
VALUES


("Dan",	"Taylor",4,null),
("Blake","Rees",1,1),
("Simon","White",2,1),
("Joseph","Hemmings",3,1),
("Bella","Lee",7,null),
("Alan","Lee",5,5),
("Claire","Parsons",6,5),
("John","Arnold",8,null),
("Sebastian","Murray",9,8),
("Andrew","Howard",10,null),
('Brandon',"Langdon",11,10),
("Lauren","Ferguson",12,null),
("Bernadette","Ferguson",13,12),
("Molly","Grant",15,null),
("Amy","Glover",14,14)

