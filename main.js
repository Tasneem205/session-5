const express = require("express");
const bodyParser = require("body-parser")

//creating server
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
let books = [
    {id: 1, number:52639, name:"harry potter", desc:"bestseller", pubAt:"5-10-2000", autherName:"JK Rollings"}
];
app.use(express.json());
app.get('/books', (req, res)=>{
    res.send(books);
    res.end();
});

app.post("/books", (req, res)=>{
    const newBook = req.body;
    books.push(newBook);
    res.send("Book added successfully");
});

app.put("/books/:id", (req, res)=>{
    const id = req.params.id;
    const val = req.body;
    books.forEach((item, index)=>{
        if(item.id == id){
            item.id = val.id ? val.id : item.id;
            item.number = val.number ? val.number : item.number;
            item.name = val.name ? val.name : item.name;
            item.desc = val.desc ? val.desc : item.desc;
            item.pubAt = val.pubAt ? val.pubAt : item.pubAt;
            item.autherName = val.autherName ? val.autherName : item.autherName;
        }
        res.send("edited ");
    });    
});

app.delete("/books/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    books.forEach((item, index)=>{
        if(item.id == id){
            books.splice(index, 1);
            res.send("deleted ");
        }
    });    
    res.send("not found");
});

app.listen(5000);