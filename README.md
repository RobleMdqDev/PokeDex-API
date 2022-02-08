# Server Base - Proyecto PokedexApp By Alberto Nicolas Robledo


## Envinroment setup

1) Copy .env.example to .env and fill with database credentials.

2) Create database 
``` mysql
    npx sequelize-cli db:create
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
        username: 'admin',       
        password: "1111",
        team: '25',
        avatar:'0',
        createdAt: new Date(),
        updatedAt: new Date(),
    }
```