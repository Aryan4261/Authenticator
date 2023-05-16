const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/0c6dae47d5";
  const options = {
    method: "POST",
    auth: "sptravels:4de013347d70334d0a1069af6875fbed-us21"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

})

app.post("/failure", function(req,res){
  res.redirect("/")
})



app.listen(3000, function(){
  console.log("Server is running at port 3000.");
});



// 4b979c0e74f2160fcad2cff648c21e21-us21
// 0c6dae47d5
