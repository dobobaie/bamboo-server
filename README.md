# Bamboo server

Bamboo server is the official rest API of the Bamboo project.   

[Live bamboo server](http://164.132.106.118:5656/)  

## 📝 Requirements

### Environment variables

The JSON format bellow must be filled and saved at the root of the repository as `.env` file.  

```
{
  "NODE_ENV": "production",
  "SERVER_IP": "___", // server ip (ex: 127.0.0.1)
  "SERVER_PORT": 5656,
  "LOCALE": "fr",
  "ACCESS_TOKEN": "___", // access token to access in a specific route (ex: DZedihfzfezfih)
  "POSTGRES_URL": "___",
  "POSTGRES_DB": "___",
  "POSTGRES_USER": "___",
  "POSTGRES_PASSWORD": "___"
}

```

### Generate public and private keys

First, you have to create `pem` directory.  
Then, follow the instructions in this url: [How generate public and private keys](https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9).  
The last step is obviously to move the files in `pem` directory and to rename `jwtRS256.key` to `private.key` and `jwtRS256.key.pub` to `public.key`.   

### SQL initialization

If you have docker then everything is fine there is a `Dockerfile` !   
Else you have to go in `initialization` directory and run the `docker-entrypoint.sh` file.   

## ⚙️ Run the project

To run the project please follow the instructions bellow.   

```
git fetch && git pull --rebase // update your repository
npm install // install the last packages
node index.js // run the project (don't forget the environment part => run it with docker or set the .env file in your local environment)
```

## ❓️ The project is working ?

You can directly check if the project is working via the route `http://localhost:port/health`.   

## ☁️ Watch routes

An amazing tool has been set up on the project called `openapi` AKA `swagger`.   
To watch the routes, you have to go to `http://localhost:port/swagger?token=ACCESS_TOKEN` url.   

## 💡 Tips

If you want to be admin: you must to create an account via the client and then update directly in base the field `is_admin` to `true` for your user in `account` table.  
