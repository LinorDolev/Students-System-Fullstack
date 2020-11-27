# Students System
## Solution Description
### Back-End Server
  Developed using Java 8 and Spring Web, the build system is gradle-6.0.1.
  The architecture is a simple 3 layers architecture: 
  #### API Layer
  Spring runs over apache tomcat by default. 
  This layer contains a single controller allowing all 4 CRUD operations, mapped by the request type (POST/GET/PUT/DELETE accordingly).
  - Cross-origin (CORS) requests are enabled.

  #### Services Layer
  Services contains the business logic of the system like checking if the Id already exists in the system when adding a student, or that the student with the given Id exists before updating / deleting it.

  #### Data Access Layer
  I used H2 database which simulates a real database but stored data in memory instead of disk,
  this can be replaced to a real DB in no time thanks to spring-data (only need to change some annotations and application.properties file).
   
### Front-End Client
  Deveolped using Angular 11, Typescript, and [Angular Material 11](https://material.angular.io/) which provides material design components for Angular.
  The app contains 3 main components and a service for http requests.
  
  #### Add Student Form Component
  A simple accordion containing a form for inserting a new student to the system,
  you won't be able the send the form when there's an empty field and there are regulations such as 250 characters limit on textual fields and grade field must be a number in range [1, 12], when clicking the Save button an http POST request to the server and then refresh the students table component.
  
  #### Students Table Component
  Students table loads all of its data from the server using an http GET, it shows all of the fields except the id, each row also contains an edit and delete buttons.
  The edit button will change the selected row into input fields and the edit button becomes green-ish. If all fields are filled properly, the circular Save button will become enabled. A click on the Save button will send a PUT request to the server to update the edited student, then, it will re-render the table. Another press on the edit button (of the edited student or other student) discards the changes.
  The delete button pops up a dialog.

  - The table component also contains a filter search bar that filters by students first / last name.
  - The table also supports column sorting, pagination in different sizes and headers are sticky so you can scroll as much as you want and still know which fields are under which header.

  #### Delete Dialog
  The delete dialog asks the user if he/she is sure about deleting that student, pressing OK will send a DELETE request to the server then it will rerender the students table.

## Setup and Run
  ### Setup the Server
  0. For running the server you'll need to install:
    a. Java 8 JDK + JRE.
    b. Gradle 6.0.1

  1. `cd` into `students-server` directory
  2. Compile using gradle, change `gradlew` to `gradlew.bat` if you're using windows: 
  ```
  $ gradlew compileJava
  $ gradlew run
  ```
  ### Setup the Client
  0. For running the client you'll need to install:
    a. npm - https://www.npmjs.com/
  1. `cd` into `students-client` directory
  2. Install all of the dependencies using:
  ```
  $ npm install
  ```
  3. Run the client
  ```
  $ npm start
  ```
  you can also use
  ```
  $ ng serve
  ```

## Tests
  The server side was quickly developed so tests were done "by hand" using Postman.
  The client side was also been tested by hand but for scalability tests I've used for-loops filling the table with over 100 students checking that the pagination, sorting and filtering are working properly.
  The client was tested for chrome and firefox browsers.

  I can add automatic tests for both server and client if required. 

## Assumptions
- Assumed it is ok to create a form for adding a student instead of adding it inline 
