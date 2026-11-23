var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/images', function(req, res) {
    var imagesDir = path.join(__dirname, 'public', 'images');
    var allowed = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);

    fs.readdir(imagesDir, function(err, files) {
        if (err) {
            console.error('Failed to read images directory:', err);
            return res.status(500).json({ error: 'Failed to list images' });
        }

        var images = (files || [])
            .filter(function(name) { return allowed.has(path.extname(name).toLowerCase()); })
            .map(function(name) { return { name: name, url: '/images/' + name }; });

        res.json({ count: images.length, images: images });
    });
});

var port = process.env.port || 3000;

app.listen(port, ()=>{
    console.log("App listening to: " +port)
})