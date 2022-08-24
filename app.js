const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')); //For serving static files
app.use(express.urlencoded());


//PUG SPECIFIC STUFF
app.set('view engine','pug'); //set the template engine for pug
app.set('views',path.join(__dirname,'views')) //set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
    const con = "This is the best content on the internet so use it wisely"
    const params = {'title':'pubg is the best game', "content":con};
    res.status(200).render('index.pug', params);
})

app.post('/',(req,res)=>{
    name = req.body.name;
    phone = req.body.phone;

    email = req.body.email;
    feedback = req.body.feedback;

    let outputToWrite = `\nName- ${name}\nPhone no- ${phone}\nEmail- ${email}\nFEEDBACK- ${feedback}\n------ `;
    // fs.writeFileSync('output.txt',outputToWrite);
    fs.appendFileSync('output.txt',outputToWrite.toString()); 

    const params = {'message':'Your form is subbmitted successfully'};
    res.status(200).render('index.pug', params);
})


//START THE SERVER
app.listen(port,()=>{
    console.log(`This application runs on port ${port}`);
});
