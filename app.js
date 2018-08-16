const   express = require("express"),
        app = express(),
        methodOverride = require("method-override"),
        bodyParser = require("body-parser"),
        Word = require("./models/word"),
        mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/worg");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));


//  index
app.get("/",function (req,res) {
    Word.find({},function (err,word) {
        if(err){
            console.log("error");
        } else {
            res.render("index",{words: word});
        }
    });

});


//  new
app.get("/new",function (req,res) {
    res.render("new");
});


//  create
app.post("/",function (req,res) {
    Word.create(req.body.word,function (err,newWord) {
        if(err){
            res.render("new");
        } else {
            res.redirect("/");
        }
    });
});


//  show
app.get("/:id",function (req,res) {
    Word.findById(req.params.id,function (err,foundWord) {
        if(err){
            res.redirect("/");
        }  else {
            res.render("show",{word: foundWord});
        }
    });
});


//  edit
app.get("/:id/edit",function (req,res) {
    Word.findById(req.params.id,function (err,foundWord) {
        if(err){
            res.redirect("/");
        } else {
            res.render("edit",{word: foundWord});
        }
    });
});


//  update
app.put("/:id",function (req,res) {
    Word.findByIdAndUpdate(req.params.id, req.body.word, function (err,updatedword) {
        if(err){
            res.redirect("/");
        }   else {
            res.redirect("/"+req.params.id);
        }
    });
});

//  confirm delete
app.post("/:id/delete",function(req,res) {
    Word.findById(req.params.id, function (err, foundWord) {
        if (err) {
            res.redirect("/" + id);
        } else {
            res.render("delete", {word: foundWord});
        }
    });

});
//  destroy
app.delete("/:id",function (req,res) {
    Word.findByIdAndRemove(req.params.id,function (err) {
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });
});


app.listen(1020,function () {
    console.log("SERVER IS UP at http://localhost:1020/");
});