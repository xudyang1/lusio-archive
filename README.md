# CSE416_Lusio

## Quick Start

## 1. Clone the repository

- Suppose your current directory is `../currentDir`, use git bash to clone the repository
```bash
git clone git@github.com:<yourUserName>/CSE416_Lusio.git origin
```

- Now you cloned the local repository as `../currentDir/CSE_416_Lusio`.

## 2. Install dependencies

- First nevigate to your project directory `../currentDir/CSE416_Lusio` by the cmd

```bash
cd CSE416_Lusio
```

- Then install dependencies for server and client 

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install
```

## 3. Create a new database in mongoDB
1. Go to mongodb.com
2. -> Databases
3. -> Cluster0 (or customized name)
4. -> Browse Collections
5. -> + Create Database:
```bash
Database name
    Lusio
Collection name
    quizzes
```
6. -> Create

## 4. Change configuration
- change config.env file in config folder: replace YOUR_DATABASE_URI with your mongoDB URI such as `"mongodb+srv://<username>:<password>@<clustername.something>.mongodb.net/<DataBaseName>?retryWrites=true&w=majority"` 

> You can find the URI via `mongodb.com ->Databases -> Cluster0 (or your customized cluster) -> Connect -> Connect your application -> disable "Include full driver code example" -> URI`

> Note: If you previously added an old database in the cluster (in training verification), you may see that the `<DataBaseName>` is the old database name you created. Make sure you change the `<DataBaseName>` to `Lusio` so that the URI you put into config.env should be `"mongodb+srv://<username>:<password>@<clustername.something>.mongodb.net/Lusio?retryWrites=true&w=majority"`

## 5. Run

```bash
# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

6. Test backend connection
- There is some sample test code for GET/POST/DELETE requests (marked by `//TODO: modify this sample later`)
- You can use POSTMAN to test each operation:

    - POST
        1. set url: `http://localhost:5000/api/quizzes` 
        2. Go to `Headers`: set `KEY`: Content-Type, `VALUE`: application/json
        3. Go to `Body`: select `raw`
        4. Type in the body: `{"name": "Hello World!"}`
        5. Send
    > You should see a response similar to
    ```bash
    {
    "name": "Hello World!",
    "_id": "616e6a76f611879de122056b",
    "date": "2021-10-19T06:49:26.508Z",
    "__v": 0
    }
    ```
    - GET
        1. set url: `http://localhost:5000/api/quizzes` 
        2. Send
    > You should see a response similar to
    ```bash
    [
        {
        "_id": "616e6a76f611879de122056b",
        "name": "Hello World!",
        "date": "2021-10-19T06:49:26.508Z",
        "__v": 0
        }
    ]
    ```
    - DELETE
        1. set url: `http://localhost:5000/api/quizzes/:id` where the `:id` is the value you get from the GET response
        2. Send
    > You should see the response
    ```bash
    {
        "success": true
    }
    ```


## Deployment

- There is a Heroku post build script so that you do not have to compile your React frontend manually, it is done on the server. Simply push to Heroku and it will build and load the client index.html page