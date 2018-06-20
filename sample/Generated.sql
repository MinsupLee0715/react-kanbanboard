/*
https://github.com/peace-jung/react-kanbanboard
Model: MySQL 5.7
Database: MySQL 5.7
*/


-- Create tables section -------------------------------------------------

-- Table Student

CREATE TABLE `Student`
(
  `studentID` Varchar(20) NOT NULL,
  `name` Varchar(20) NOT NULL,
  `password` Varchar(100) NOT NULL
)
 DEFAULT CHARACTER SET utf8
;

ALTER TABLE `Student` ADD PRIMARY KEY (`studentID`)
;

-- Table Classroom

CREATE TABLE `Classroom`
(
  `classID` Varchar(20) NOT NULL,
  `title` Varchar(20) NOT NULL,
  `divide` Varchar(20) NOT NULL,
  `period` Varchar(20) NOT NULL,
  `professorID` Varchar(20) NOT NULL
)
 DEFAULT CHARACTER SET utf8
;

CREATE INDEX `IX_Relationship4` ON `Classroom` (`professorID`)
;

ALTER TABLE `Classroom` ADD PRIMARY KEY (`classID`)
;

-- Table Professor

CREATE TABLE `Professor`
(
  `professorID` Varchar(20) NOT NULL,
  `name` Varchar(20) NOT NULL,
  `password` Varchar(100) NOT NULL
)
 DEFAULT CHARACTER SET utf8
;

ALTER TABLE `Professor` ADD PRIMARY KEY (`professorID`)
;

-- Table Project

CREATE TABLE `Project`
(
  `projectID`  Varchar(30) NOT NULL,
  `title` Varchar(20) NOT NULL,
  `status` Varchar(20) NOT NULL,
  `leader` Varchar(20),
  `updated_date` Varchar(30)
)
 DEFAULT CHARACTER SET utf8
;

ALTER TABLE `Project` ADD PRIMARY KEY (`projectID`)
;

-- Table Class_Student

CREATE TABLE `Class_Student`
(
  `classID` Varchar(20) NOT NULL,
  `studentID` Varchar(20) NOT NULL,
  `projectID` Varchar(30)
)
 DEFAULT CHARACTER SET utf8
;

CREATE INDEX `IX_Relationship13` ON `Class_Student` (`projectID`)
;

ALTER TABLE `Class_Student` ADD PRIMARY KEY (`classID`,`studentID`)
;

-- Table Notice

CREATE TABLE `Notice`
(
  `classID` Varchar(20) NOT NULL,
  `date` Varchar(30),
  `title` Varchar(100) NOT NULL,
  `content` Varchar(500) NOT NULL
)
 DEFAULT CHARACTER SET utf8
;

ALTER TABLE `Notice` ADD PRIMARY KEY (`classID`,`date`)
;

-- Table Kanban

CREATE TABLE `Kanban`
(
  `created_date` Varchar(30),
  `title` Varchar(100) NOT NULL,
  `content` Varchar(500) NOT NULL,
  `updated_date` Varchar(30),
  `end_date` Varchar(30),
  `importance` Int,
  `status` Varchar(20) NOT NULL,
  `filename` Varchar(100),
  `score` Int,
  `projectID` Varchar(30)
)
 DEFAULT CHARACTER SET utf8
;

CREATE INDEX `IX_Relationship8` ON `Kanban` (`projectID`)
;

ALTER TABLE `Kanban` ADD PRIMARY KEY (`created_date`)
;

-- Table Message

CREATE TABLE `Message`
(
  `receive_date` Varchar(30),
  `type` Varchar(20) NOT NULL,
  `userID` Varchar(20) NOT NULL,
  `classID` Varchar(20),
  `projectID` Varchar(30),
  `kanbanID` Varchar(30),
  `classTitle` Varchar(20),
  `projectTitle` Varchar(20),
  `isCheck` Bool NOT NULL
)
 DEFAULT CHARACTER SET utf8
;

ALTER TABLE `Message` ADD PRIMARY KEY (`receive_date`, `userID`)
;

-- Table Comment

CREATE TABLE `Comment`
(
  `created_date` Varchar(30),
  `date` Varchar(30),
  `content` Varchar(500) NOT NULL
)
 DEFAULT CHARACTER SET utf8
;

CREATE INDEX `IX_Relationship15` ON `Comment` (`created_date`)
;

ALTER TABLE `Comment` ADD PRIMARY KEY (`created_date`,`date`)
;

-- Table Contribute

CREATE TABLE `Contribute`
(
  `created_date` Varchar(30),
  `studentID` Varchar(20) NOT NULL,
  `point` Int NOT NULL,
  `part` Varchar(20) NOT NULL
)
 DEFAULT CHARACTER SET utf8
;

CREATE INDEX `IX_Relationship14` ON `Contribute` (`created_date`)
;

ALTER TABLE `Contribute` ADD PRIMARY KEY (`created_date`,`studentID`)
;

-- Create foreign keys (relationships) section ------------------------------------------------- 


ALTER TABLE `Class_Student` ADD CONSTRAINT FOREIGN KEY (`classID`) REFERENCES `Classroom` (`classID`) ON DELETE RESTRICT ON UPDATE RESTRICT
;


ALTER TABLE `Class_Student` ADD CONSTRAINT FOREIGN KEY (`studentID`) REFERENCES `Student` (`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE
;


ALTER TABLE `Classroom` ADD CONSTRAINT FOREIGN KEY (`professorID`) REFERENCES `Professor` (`professorID`) ON DELETE NO ACTION ON UPDATE CASCADE
;


ALTER TABLE `Notice` ADD CONSTRAINT FOREIGN KEY (`classID`) REFERENCES `Classroom` (`classID`) ON DELETE CASCADE ON UPDATE CASCADE
;


ALTER TABLE `Kanban` ADD CONSTRAINT FOREIGN KEY (`projectID`) REFERENCES `Project` (`projectID`) ON DELETE CASCADE ON UPDATE CASCADE
;


ALTER TABLE `Class_Student` ADD CONSTRAINT FOREIGN KEY (`projectID`) REFERENCES `Project` (`projectID`) ON DELETE SET NULL ON UPDATE CASCADE
;


ALTER TABLE `Contribute` ADD CONSTRAINT FOREIGN KEY (`created_date`) REFERENCES `Kanban` (`created_date`) ON DELETE CASCADE ON UPDATE CASCADE
;


ALTER TABLE `Comment` ADD CONSTRAINT FOREIGN KEY (`created_date`) REFERENCES `Kanban` (`created_date`) ON DELETE CASCADE ON UPDATE CASCADE
;


