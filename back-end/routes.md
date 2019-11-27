# Routes
This file contains description of the routes used in **Reactive Bookstore**. All routes are under **/api**  folder.  
## Users
***
Register user in **Reactive Bookstore**:  

    POST /users/register
***
Login user in **Reactive Bookstore**:  

    POST /users/login
***
Get user's details  

    GET /users/:id/profile
***
Edit user's details  

    PUT /users/:id/profile
***

## Books
***
Returns all books in the database:  
    
    GET /books
***
Add new book in database:  
    
    POST /books
***
Get book's details by **id**:  

    GET /book/:id
***
Edit book's details by **id**:  

    PUT /book/:id
***
Delete book by **id**:  

    DELETE /book/:id

## Orders


## Comments
***
Post a comment for a given book:

    POST /comment
