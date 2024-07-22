const { GoogleGenerativeAI } = require('@google/generative-ai');//requiring the genAI API
const express = require('express');//Requiring Express For Routing
const path = require('path')
require('dotenv').config()
const fs = require('fs')

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
//Using The Gemini API KEY, Provided From The AI.GOOGLE.DEV Platform


const app = express();//Initializing An Express APP
const port = process.env.PORT||3000;//Defining a Port

app.use(express.json());//For Converting The Data into JSON Format
app.use(express.urlencoded({ extended: true }));//for form submissions
app.use(express.static(path.join(__dirname,'/public')))
app.set('view engine', 'ejs');//setting View Engine For Easy Access

app.get('/', (req, res) => { //Start Route Takes To The Chat-Bot LanderPage
    fs.appendFile('log.txt',`A Get Request ${Date.now()}\n`,(err)=>{
        if(err) throw err;
    })
    res.render('index');
})
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
        history:[],
        generationConfig:{
            maxOutputTokens:500
        }
    })

//Post Route for The Prompt Acceptance
app.post('/prompt', async (req, res) => {
    const { prompt } = req.body;
    

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    // //sending the response in the json format
    res.json({ response: response.text() });
});

app.listen(port, () => console.log(`Started at ${port}`));
