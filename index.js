const express = require('express');
const mongoose = require('mongoose'); //for mongodb database management

const Article = require("./models/Article") //this is the model for article db scheme

const app = express(); //a good practice is to place the express() method into a const


app.use(express.json()); //we need this line if we want to include body paramters json way

mongoose.connect("mongodb+srv://WahebyAdminMemoriesProject:donthackme22@atlascluster.wzsvziu.mongodb.net/?retryWrites=true&w=majority")
.then((response) => {
  console.log("connected to database successfully")

}).catch((error) => {
  console.log("error in connecting database", error)
})

app.put("/hello", (req, res) => {
  res.send("hello");
});

app.get("/numbers", (req, res) => {
  
  let numbers = "";
  for(let i=0; i <= 100; i++);
  {
    numbers += i + " - "
  }
  res.send(`numbers are: ${numbers}`);
});

app.get("/", (req, res) => {
  res.send("u visited test");
});

app.post("/addComent", (req, res) => {
  res.send("post request on addComment");;
});

app.delete("/testingDelete", (req, res) => {
  res.send("this is a delete request test");
})

app.get("/findSum/:number1/:number2", (req,res) => {
  const num1 = req.params.number1;
  const num2 = req.params.number2;

  const total = Number(num1) + Number(num2);

  res.send(String(total));
})

app.get("/findSum2", (req, res) => {
  const body1 = req.body.name
  console.log(body1)


  //res.send(__dirname + "/views/numbers.html")
  //res.sendFile(__dirname + "/views/numbers.html");
  //res.send(`Hello ${body1}`);
  res.render("numbers.ejs", {
    name: "Shoon",
    body: body1,
  });
})

app.get("/sayHello", (req, res) => {

  res.json({
    name: req.body.name,
    age: req.query.age,
    language: "Arabic"
  })

})


// ========= ARTICLES ENDPOINTS =========== //
app.post("/articles", async (req, res) => {
  const newArticle = new Article()

  const artTitle = req.body.articleTitle
  const artBody = req.body.articleBody

  newArticle.title = artTitle;
  newArticle.body = artBody;
  newArticle.likes = 0;

  await newArticle.save()

  res.json(newArticle)
})

app.get("/articles", async (req, res) => {
  
  const articles = await Article.find();
  
  res.json(articles);

})

app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId

  try {
    const article = await Article.findById(id)
    res.json(article);
    return;
  }catch(error){
    console.log("error in reading article by Id", id);
    return res.send("error");
  }
})

app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;

  try {
    const article = await Article.findByIdAndDelete(id);
    res.json(article);
    return;
  }catch(error){
    console.log("error in deleting article by Id", id);
    return res.json(error);
  }
})

app.get("/showArticles", async(req, res) => {
  const articles = await Article.find()

  res.render("articles.ejs", {
    allArticles: articles
  })
});

app.listen(3000, () => {
  console.log("im listening in port 3000");
});
