//module.exports is an object that will hold the code to be exported. Use dot notation to add the code we want to export to this object 
module.exports.beBasic = () => 'thats so fetch'; //now our module.exports object has a key-value pair where the key is beBasic and the value is a function

module.exports.count= ()=> {
    for(let i=0; i< 10; i++){
        console.log(i);
    }
}
