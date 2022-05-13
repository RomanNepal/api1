// const http = require("http");
const express = require("express");
const app = express();
const port = 3001;
const home_routes = require("./routes/home.routes");
const auth_routes = require("./routes/auth.routes");
const routes = require("./routes");


app.use("/assets", express.static(process.cwd() + "/uploads"));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/views");

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))
// const app = http.createServer((req, res) => {
//   console.log("Request method " + req.method);
//   console.log("Req url is " + req.url);

//   if (req.method == "GET" && req.url == "/") {
//     res.end("Home page here");
//   } else if (req.method == "GET" && req.url == "/about") {
//     res.end("About us page");
//   } else if (req.method == "GET" && req.url == "/contact") {
//     res.end("contact us page");
//   } else if (req.method == "POST" && req.url == "/login") {
//     let response = {
//       result: { name: "Roman", email: "nepalroman100@gmail.com" },
//       status: 200,
//       msg: "Login successful",
//     };
//     res.end(JSON.stringify(response));
//   } else {
//     res.end("404 not found");
//   }
// });
// port ranges from 0 to 65535
// smtp => 25, 2525, 465, 587
// ftp/sftp => 21, 22
// http/https => 80, 443
app.get("/", (req, res, next) => {
  //for static files=> res.sendFile(process.cwd()+"/views/index.html");
  // for dynamic
  let name = "Roman";
  res.render("index", { name: name });
});

app.use(routes);

// app.get("/aboutus",(req, res)=>{
//   res.json({
//     content: "This is about us page",
//     status: 200
//   })
// })

// app.get("/contact",(req, res)=>{
//   res.json({
//     content: "This is contact us page",
//     status: 200
//   })
// })

app.get("/product/:id", (req, res) => {
  let id = req.params.id;
  res.end(id);
});

app.get("/download", (req, res) => {
  res.download("git.jpg");
});

app.use((req, res) => {
  res.status(404).json({
    result: {
      name: "Roman",
      email: "nepalroman100@gmail.com",
    },
    status: false,
    msg: "Login failure",
  });
});

app.use((err, req, res, next) => {
  let status_code = err?.status || 500;
  let msg = err?.msg || "Error";
  console.log('error here')
  res.status(status_code).json({
    result: null,
    status: false,
    msg: msg
  });
});

//error handling middleware
// app.use((err, req, res, next)=>{})

app.listen(3001, "localhost", (error) => {
  if (error) {
    console.log("Server connection Error!!!");
  } else {
    console.log("Server connection successful on port no. " + port);
  }
});
module.exports = app;
