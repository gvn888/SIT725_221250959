var express = require("express")
var app = express()

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myprojectDB', {
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
});

const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});

const Project = mongoose.model('Project', ProjectSchema)

const cardList = [
    {
        title: "Windows 7",
        image: "images/windows-7-logo.png",
        link: "About Windows 7",
        description: "Brief info about Windows 7",
    },
    {
        title: "Windows Longhorn",
        image: "images/windows-longhorn-logo.png",
        link: "About Windows Longhorn",
        description: "Brief info about Windows Longhorn",
    }
]

Project.insertMany(cardList)
  .then(() => {
    console.log("Card List added.");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));


app.get('/api/projects', async (req,res) => {
    const projects = await Project.find({});
    res.json({statusCode: 200, data: projects, message:"Success"})
})

var port = process.env.port || 3000;

app.listen(port, ()=>{
    console.log("App listening to: "+port)
})