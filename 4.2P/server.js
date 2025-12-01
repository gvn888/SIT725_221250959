var express = require("express")
var app = express()

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cardList = [
    {
        title: "Windows 7",
        image: "images/windows-7-logo.png",
        link: "About Windows 7",
        description: "Brief info about Windows 7"
    },
    {
        title: "Windows Longhorn",
        image: "images/windows-longhorn-logo.png",
        link: "About Windows Longhorn",
        description: "Brief info about Windows Longhorn"
    }
]

app.get('/api/projects', (req,res) => {
    res.json({statusCode: 200, data: cardList, message:"Success"})
})

var port = process.env.port || 3000;

app.listen(port, ()=>{
    console.log("App listening to: "+port)
})