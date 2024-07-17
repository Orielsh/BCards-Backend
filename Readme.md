# BCards Backend
### Description:
BCards is a platform designed to function as a comprehensive business card catalogue.\
Users can explore a vast collection of digital business cards representing businesses from various industries.\
The platform offers two user account types: 
 - business accounts for businesses to showcase their details and standard accounts for general users.
 - register but non-business accounts

Both registered users can engage with the platform by liking business cards and adding them to personal favorites for future reference.\
Even without an account, visitors can freely browse the entire business card catalog

### Technologies used:
- Node.js: The main runtime enviornment to run the application
- npm: software library for Node
- Express.js: Web framework help to run a server and handle and manipulate requests.
- MongoDB: The underlying database to store the data.
- Mongoose: MongoDB driver for node.
- Joi: Scheme validation library for node, used to validate requests body.

## Getting Started
### Prerequisites:

Node.js and npm installed
MongoDB database running locally

Installation:

Clone the repository:
If having git installed just use<br>
`git clone https://github.com/Orielsh/BCards-backend.git`<br>
to get a copy of this repo to the foldre you want.

Navigate to the project directory and install the dependencies using<br>
`npm install`

Seed the database for initial run to have some sample data:<br>
`node seed.js`

Run the Application:

`npm run dev`

## Folders

- config: Contains configuration files (e.g., environment variables, database connection).
- controllers: Contains API controllers for handling incoming requests.
- dal: Data access layer - each entity (card, user, etc..) have it's own dal file with relevant methods.
- data: Some pre data to populate database for initial use.
- errors: Errors for some specific cases such "Access denied" etc..
- middlewares: Contain middlewares to such as validateScheme when request received etc..
- models: Contains Mongoose models for database interactions and their db schemas.
- routes: Defines API routes and their corresponding controllers and middlewares.
- schemas: joi schemas to validate correctness of objects of requests.
- services: Contains business logic for various operations.
- utils: some util function for ex to get specific date format or parsing some data.
---
## API Endpoints Method Description:<br>

**auth path**<br>

 - /api/auth/login	POST User login

**users/ path**<br>

- /api/users/	POST Register a new user
- /api/users/ GET Get all users
- /api/users/:id GET Get user by ID
- /api/users/:id PUT Update user
- /api/users/:id PATCH Switch user status between Simple or Business
- /api/users/:id DELETE Delete a user

**cards/ path**<br>
- /api/cards/	GET	Get all cards
- /api/cards/my-cards/	GET	Get user's cards
- /api/cards/:id	GET	Get card by ID
- /api/cards/	POST	Create a card
- /api/cards/:id	PUT	Update card
- /api/cards/:id	PATCH	Toggle "like" a card (Like/unlike)
- /api/cards/update-biz/:id	Change card business number
