###Title
Flashcards App Backend


###Description
This Backend consists of multiple service instances communicating via microservices RabbitMQ amqp and axios TCP.
The flashcards-engine service runs on localhost:3000
The flashcards-service is a hybrid app that runs on localhost:3001


###How to Install

Download and extract the zip files to get the following folder structure:
- flashcards
 - flashcard-engine
 - flashcards-service

##### Start flashcard-engine on http://localhost:3000
$ cd into flashcard-engine/
$ npm install
$ npm run start

##### For flashcards-service on http://localhost:3001
$ cd into flashcards-service/
$ npm install
$ npm run start

##### Test Endpoints with Postman
Import the collection "NestJS flashcard-engine.postman_collection.json"
and the collection "NestJS flashcards-service.postman_collection.json" into postman

Register a New User
Login using the newly created User details
If login is successful, you will get a token in the response
Copy the token and store it as current value of token variable in the two postman collections.

Now you can access the Protected endpoints in flashcards-service: Create, Update, Delete, Share

###Credits
Thanks to Soora for this interesting exercise. Hoping to get the chance to do more amazing work together!



