# polling_api
Created using Nodejs, expressjs, mongoose.

## Functionalities:
1. Create questions
2. Delete questions
3. Add options to the questions
4. Delete options
5. Add vote to options
6. View question


## How to run?

1. Clone the repository.
2. Run "npm init" in command line.
3. Run "npm install"
4. Run "npm start"
5. In Browser, Run http://localhost:8000

## API Endpoints

HTTP      Request	Endpoints	                   Action
POST	    /questions/create	                   create a question
POST	    /questions/:id/options/create	       add options to a specific question
DELETE	  /questions/:id/delete	               delete a question
DELETE	  /options/:id/delete	                 delete an option
PUT	      /options/:id/add_vote	               increase the count of votes
GET	      /questions/:id	                     view a question and its options




Folder Structure:

![image](https://github.com/namanyadav2706/polling_api/assets/79096883/aecd6f1a-7e9c-4aa9-a246-e2543e5ae341)
