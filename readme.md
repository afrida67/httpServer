## **Express**

Express server built with **Node.js** and **MySQL** database (without form).
#### Feature :
  - Basic CRUD operations

#### Installation : 
```sh
npm install
npm start
```

**Request Handle :**
```sh
   http://localhost:3000/api
  ```
**Search :**
```sh
 http://localhost:3000/api/<id>
   ```
**Delete :**
 ```sh
 curl -X DELETE http://localhost:3000/api/<id>
  ```
 
**Update :** 
 ```sh
  curl -X PUT -d "name=test" -d "grade=12" http://localhost:3000/api/21
   ```
 
