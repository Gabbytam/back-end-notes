# NOTES ON HOW TO USE NODE

## Steps: 
1. ‘npm init’ in terminal while inside directory
    * Press enter a bunch OR npm init -y
    * Will create package.json that will give your entry point file that you will then create and use
2. Create entry point file, index.js file 
    * To run the index.js file, write ‘node index.js’ in terminal

### Side Notes:
* To download node packages globally: npm i -g __nodeName__
3. Create module: 
    * Syntax: module.exports.__keyname__= //code
    * Module.exports is an object that will hold the code to be exported
        * Use dot notation to add key-value pairs
        * You can export multiple K-V pairs by using module.exports.__ over and over
4. Import module in index.js
    * Use require function 
    * Takes in one argument, the path ro the file that contains the module you are exporting 
    * Syntax: const myModule= require(‘./myModule.js’);
        * Use dot notation to access k-v pairs of your module object 
    * Run index.js in terminal command line with: node index.js

### Core Modules:
* also imported using require()
* Examples: 
    * 'fs' module
    * 'http' module 

## Using Express:
* To install express: npm i express
    * Within the folder you want to use express 
* import express using require()
    * const express= require('express');
* create an instance of an express app using .express()
    * const app= express();
* set up home route using, .get()
    * ex. app.get('/', (req, res)=> { })
* tell app what port to listen to using, .listen()
    *ex. app.listen(__portToListenTo__, __callbackFcn__);



## Git ignore file:
* file containing files for your git repo to ignore
    * listed by file name 
* create file called .gitignore
* typically will ingore large files such as:
    * node_modules and .env

## Environmental Variables:
* Install env: npm i dotenv
* Put .env in your .gitignore by adding: .env
* To use: require('dotenv').config(); at top of page 
* In .env file: all variable names will be written in CAPS


## Using Sequelize: 
* To install: (globally) npm i -g sequelize
    * do this once 
* Run it: npm i pg sequelize
* To initialize: sequelize init 
* Config folder:
    * Config.json: get rid of username and password 
    * Dialect: set to “postgres”
    * Database: set to “name_production(or test or development”
* Create database: sequelize db:create name_development
* Then run psql
* Exit out of psql: \q
* Create table: sequelize model:create --name __name__ --attributes __columnName__:__type__, __columnName__:__type__
    * ex: sequelize model:create --name user --attributes firstName:string,lastName:string,age:integer,email:string
* To migrate: sequelize db:migrate
    * Takes js model and transfer it to database
* How to undo a migration: sequelize db:migrate:undo
    * For if you mess up and need to edit/make changes to database schema 
    * Can edit inside of migrations/js file
* In index.js: (refer to userapp folder for examples)
    * relate ORM to database: const db= require('./models');
    * ### Create a row:
     db.__tablename__.create()
        * Says specifically working with __tablename__ model
        * Create is the same thing as insert 
    * ### Find all:
     db.__tablename__.findAll().then(foundUser=> {})

    * ### Find specific:
     db.__tablename__.findOne({
        where: {__columnName__: '__value__'}
    })
    .then(foundUser=> {})
    * ### Find or create:
     db.__tablename__.findOrCreate({
        where: {__columnName__: '__value__'},
        defaults: {
            __columnName__: '__value__',
            __columnName__: '__value__'
        }
    })
    .then(([foundOrCreatedUser, created])=> {})

    * ### Update:
     db.__tablename__.update({
        __columnNName__: '__newValue__'
    },
        {where: {__columnNName__: '__value__'}
    })
    .then(numRowsChanged=> {})

    * ### Delete:
     db.__tablename__.destroy({
         where: {__columnNName__: '__value__'}
     })
     .then(numRowsDeleted=> {})

* To run: 
in terminal write: node index.js 
    * Can check out the new table in psql


## EJS:
Refer to my-personal-express folder 
* How to run:
    * npm i ejs
* How to give access: under const app= express()
    * app.set('view engine', 'ejs')
* How to connect it to page: inside app.get(){}
    * Use res.render(‘__EJSFileName__’, {__optionalObject});
* EJS tags: must be used on every line 
    * <% %> : tag used for defining JS operations 
    * <%= %> : used for printing in the HTML
    * <%- %> : allows you to connect other EJS files to one another 
        * Uses the include keyword followed by file path 
        * Syntax: <%- include(‘../__folder__/__ejsfilename__’) %>

    * <%# %> : for commenting out in EJS
* HTML tags can be written directly into EJS
* An EJS file has access to the values from the second argument in the res.render() method, refer by key name
    * The second argument being the object in .render()

### EJS-Layouts:
* Refer to love-it-or-leave-it
* How to use: 
    * Run npm i express-ejs-layout 
    * Import express-ejs-layout using require: const ejsLayouts= require('express-ejs-layouts');
    * Add to middleware section, under app.set: app.use(ejsLayouts);
    * Create a views folder with a layout.ejs file inside layout.ejs will have HTML boilerplate and in body has a <%- body %> EJS tag
    * layout.ejs HAS to be called that 
    * <%- body %> tag is the place to inject other ejs files into
* Templates: 
    * res.render(): used to render data into templates with the selected template engine
    * Templates are prepared to have data injected into them
    * Takes 2 arguments: first is the file to connect, and second is an object filled with whatever k-v pairs you’d like to refer to later on


## Controllers and Express Router: 
* Controllers, used for organizational tools when you start making apps with several views 
* Make new folders within a views folder 
* Make sure to update the url patterns to have the proper route, need to add /__foldername__/__file__
* Group related routes into separate folders, inside controllers folder 
* Steps: 
    * Make a controllers folder inside main project folder
    * Inside controller folder, add new js files that each contain
        * const express= require('express');
        * const router= express.Router();
        * module.exports= router;
    * move app.gets() to respective js file and change the app. to router. And add the correct file path to res.render (add folder name/)
    * Create folders inside views, each folder will hold ejs file(s)
    * move back into index.js and add some middleware to get the routes to work: 
        * app.use('/____', require('./controllers/__jsfile__.js'));
    * NOTE: fs and other middleware have to also be imported into new js files
    * Have to update res.render() lines to include the file path: __foldername__/__ejsfilename__


## Using a form in your application:
* A form is used to get data from user
* Form tags take two attributes(important for CRUD functionality): method and action
    * method: HTTP verb (post, get, etc)
    * action: the path(url pattern) associated with the route that will handle the data
* input tag takes name, id, value
    * name: will serve as the key name when the data from the form is translated into JSON→ JS data
* Heading into your index.js file (or js file with routes):
    * GET: when you submit a form using the GET method, the key-value pairs are appended to the URL in a query string
        * The URL will update to contain a query string looking something like: ?__keyname__=__value__
        * The query string will be available via the request object using req.query
    * POST: when you submit a form using the POST method, submitting the form will make a POST to the url that is designated in the action attribute, with the data contained in the form fields
        * To receive the data, you need to create a POST route and use some middleware to make the data readable 
        * The post route will have a first parameter of the URL pattern/path of where you want to post 
        * The middleware stores the data submitted from the form in a req.body object 
    * PUT: the put method is used for editing existing item/data put route form submission will return the edited values through req.body
    * DELETE: delete method is used to delete an existing item
        * Contains no payload(req.body) and no query string
    * NOTE: PUT and DELETE routes are not supported by HTML5 and thus, require some middleware to be able to use those methods 
    * NOTE: with POST, PUT, and DELETE routes, you’ll want to add a redirect to a GET page 
        * Syntax: res.redirect(‘__fullURLpattern__’);
    * NOTE: POST and PUT actions require an initial GET action to get the forms that will receive the new data 
* method-override: a node package that allows us to catch incoming requests to the back-end and change the method from POST to DELETE or PUT
    * The method-override middleware will look for a _method=DELETE or _method=PUT query string in the request URL and swap out the methods accordingly 
    * Syntax: ex.
    <form method='POST' action='/__urlPattern__/<%- __variable__%>/?_method=PUT'>
    * How to use:
        * Install method-override: npm i method-override 
        * In your entry file (usually index.js) require it: 
        const methodOverride= require('method-override');
        * Configure middleware: MUST be the first part of your middleware
        app.use(methodOverride('_method'));
* Body-parse middleware: (must be included in all js route files)
    * app.use(express.urlencoded({extended: false}));
    * Allows req.body to work

### Grabbing and Translating data: 
* To grab/import data: use fs.readFileSync()
    * fs.readFileSync() is a built-in method that is used to read a file and return its contents as a JS object
    * let __varname__= fs.readFileSync('./__jsonFilename__.json');
    * JSON data needs to be translated to JS object to be used, do that by using JSON.parse()
        * let __newvarname__= JSON.parse(__varname__);
* To write data: (like from a form) use fs.writeFileSync()
    * fs.writeFileSync('./__wherefile__.json', JSON.stringify(__thedata__));
        * First parameter is the file that denotes the path of where the file has to be written
        * Second parameter is what will be written to the file 



## what to add:
* axios 
