# Server Base - Proyecto PokedexApp By Alberto Nicolas Robledo


## Envinroment setup


1) Copy .env.example to .env and fill with database credentials.

2) Create database 
``` mysql
    npx sequelize-cli db:create
```

To install dependencies, run
``` bash
    npm install
```

3) Migrations:
``` bash
    npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
    npx sequelize-cli db:seed:all
```

## Start local server

``` bash
    npm start
```

## Run test
``` bash
    npm test
```

## Users Example
```
    {
        username: `Usuario 0`,       
        password: "1234567",
        team: [],
        avatar:
          "https://media.istockphoto.com/photos/portrait-of-happy-indian-man-smiling-at-home-picture-id1270067432",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
```