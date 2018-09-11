# 프로젝트 관리 및 협업을 위한 웹기반 칸반보드 시스템
# React Kanban Board

## Documents
This is a College Graduation Project.

Web-based Kanban Board System used by University for Project Management and Team Collaboration with ReactJS.

A database is essential to use this project.

## Development Environment
 - Node.js
 - MySQL
 - Windows
 - Ubuntu
 - AWS Cloud9
 - AWS EC2

 ## Skill
 - ReactJS (JavaScript Front-end Library)
 - Node.js (API Server)

 ## Usage
 - Login (Student Or Professor)
 - Select Class
 - Enter Kanbanboard
 - You can change a Kanban Status to Drag & Drop

## Setting Database
1. ./sample/Generated.sql
2. ./sample/userSample.sql
3. ./sample/classroomSample.sql
example user : professor(id: 1111, pw:1234), student(id: 1, pw: 1234)

## Intall
- npm install

## Build
- npm run build - Client Build
- <strike>npm run serverBuild - Node.js server build</strike>

## Start
- <strike>npm run server - localhost:4000</strike>
- npm run start - localhost:4000

## Development Mode
You should use two terminals.
- npm run development - Watch Client
- <strike>npm run server - Watch Back-end</strike>

## DB 없이 테스트를 위해 주석처리 된 부분들

- server/main.js - Line 22, 23
- shared/App.js - Line 29~41
- container/MyClassroom.js - Line 23~46 / 142~147 (onClick function)
- component/Sidebar.js - Line 36 삭제 필요
- container/Project.js - Line 76, 77
- container/KanbanBoard.js - Line 221 삭제 필요 / 235 부분 삭제 / 238, 243, 271, 272 주석 해제 및 샘플 데이터 삭제 필요 / 339-357 샘플 데이터 삭제 필요

## Sample Images
#### 0. Sample_Scenario
![0_sample](./sample/0_sample.gif)

#### 1. Main_Login_Page
![1_main](./sample/1_main.png)

#### 2. Main_Classroom_Page
![2_classroom](./sample/2_classroom.png)

#### 3. Kanbanboard_Page
![3_kanbanboard](./sample/3_kanbanboard.png)

#### 4. Kanban_Info_Page
![4_kanbanInfo](./sample/4_kanbanInfo.png)

#### 5. Project_List_Page
![5_projectList](./sample/5_projectList.png)

#### 6. Message_Page
![6_message](./sample/6_message.png)

#### 7. Database_Structure
![7_MySQL5_7](./sample/7_MySQL5_7.png)
