var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
});
var Blog = mongoose.model("Blog", blogSchema);
//
// Blog.create({
//   title: "Test Blog",
//   image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbebfe204ad7e04d558d7e0cbc0d2eb&auto=format&fit=crop&w=500&q=60",
//   body: "hello this is a blog post"
// })

app.get("/", function (req, res) {
  res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err)
    } else {
        res.render("index", {blogs: blogs})
    }
  })
});

app.listen(3000, process.env.PORT, process.env.IP, function () {
console.log("restful_blog_app initialized on port 3000");
});
