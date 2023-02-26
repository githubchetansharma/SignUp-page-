const expres = require("express") ;
const bodyparser = require("body-parser") ;
const https = require("https") ;
const { urlencoded } = require("body-parser");
// const request = require("request") ;
const app = expres() ;
app.use(bodyparser.urlencoded({extended:true})) ;

app.use(expres.static("public"));
app.get("/" , function(req, res){
    res.sendFile(__dirname + "/signup.html");
 
}) ;
app.post("/" , function(req,res){
    
    const firstname = req.body.firstname ;
    const lastname = req.body.secondname ;
    const emailname = req.body.emailaddress;
    var data={
        members:[
            {
                email_adddress : emailname  ,
                status : "subscribed"  ,
                merge_fields:{
                    FNAME:firstname ,
                    LNAME:lastname,
                }

            }
        ]
    };
    var jsonData = JSON.stringify(data) ;
    const url  = "https://us8.api.mailchimp.com/3.0/list/f58269993d"
    const option  ={

        method:"post"  ,
        auth:"chetan1:490f4a8bea58aa098eefe2bc3ed91104-us8"
    }
    const request = https.request(url , option , function(response){
        response.on("data" , function(data){
            console.log(JSON.parse(data))  ;
        })
    });
    request.write(jsonData);
    request.end();

})
app.listen(3000 , function(){
    console.log("server is running") ;
})
// 490f4a8bea58aa098eefe2bc3ed91104-us8
// f58269993d