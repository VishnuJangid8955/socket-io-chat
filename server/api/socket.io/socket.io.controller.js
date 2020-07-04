//Internal Imports
const path = require('path');

//Custom Imports
const constants = require('../../utils/constant');

exports.startIoChat = async(req, res)=>{
    try{
        
        let filePath = `../../views/index.html`
        res.sendFile(path.join(__dirname, filePath));

    }catch(error){
        console.log('Error occure when start io chat Error %0 startIoChat ', error);
        res.send('Error occure');
    }
}