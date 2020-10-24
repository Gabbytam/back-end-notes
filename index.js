//import your module in index.js:

//use the require function, that is specific to Node, comes into play.
    //this function takes one argument: the path to the file that contains the module you are exporting 
const myModule = require('./myModule.js')


//able to console log the value of beBasic, accessed via object and dot notation, which is a function with the message 'thats so fetch'
console.log(myModule.beBasic());

//call the new count function that was added to myModule object 
myModule.count();


//CORE MODULE EXAMPLE
//fs (filesystem) us a built in core module available for us to import
const fs= require('fs');

//readFile takes 3 parameters: the file, the language, and a callback
    //the callback takes 2 params: err and data
fs.readFile('story.txt', 'utf8', (err, data)=> {
    if(err){
        console.log('there was a problem reading the file.')
    } else {
        console.log(data);
    }
})