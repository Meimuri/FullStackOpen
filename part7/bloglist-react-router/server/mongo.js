const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://michaelalcaraz:${password}@cluster0.w51nakq.mongodb.net/testBlogApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog({
    title: "HTML is Easy",
    author: "Michael Alcaraz",
    url: "www.google.com",
    likes: 37,
});

blog.save().then(() => {
    console.log("Blog saved!");
    mongoose.connection.close();
});
