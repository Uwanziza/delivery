const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { reset } = require('nodemon');
require('dotenv').config();
var mysql = require('mysql');
const { read } = require('fs');
const app = express();
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
var http= require ("http").createServer(app);


const port = 3002;


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:'delivery'
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("MySql db Connected!");
  });

  

//To fetch ads from db using by userID  
  app.get('/fetch-ads/user/:userId',(req,res)=>{ 
    var {userId}=req.params;
    var sql=`SELECT * from ads where userId=?`;
    con.query(sql,[userId],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });

   });
//To fetch ads from db using by adsId
   app.get('/fetch-ads/:adsId',(req,res)=>{
    var {adsId}=req.params;
    var sql=`SELECT * from ads where adsId=?`;
    con.query(sql,[adsId],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
   });
//To Fetch ads from db using by status
   app.get('/fetch-status/:status',(req,res)=>{
    var {status}=req.params;
    var sql=`SELECT * from ads where status=?`;
    con.query(sql,[status],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
   });
   //To fetch all ads from db
   app.get('/fetch-ads/',(req,res)=>{ 
    var sql=`SELECT * from ads `;
    con.query(sql,function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
   });

  //To Fetch notification from db using by type
   app.get('/fetch-notification/:type',(req,res)=>{ 
    var{type}=req.params;
    var sql=`SELECT * from nofication where type=?`;
    con.query(sql,[type],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
   });
   //To fetch notification from db using by userId 
   app.get('/fetchs-notification/:userId',(req,res)=>{
    var{userId}=req.params;
    var sql=`SELECT * from nofication where userId =?`;
    con.query(sql,[userId],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
   });
    //To insert into bids 
     app.post('/bids/insert', (req, res) => { 
      let object =req.body;
       con.query("insert into bids set ?",[(object)],(error,data)=>{
        if(error){
         console.log(error);
           res.status(404).send({message:'error'})
           return;
         }
         res.status(200).send({message:'success'})
       console.log(object);
       });
       });
   //To fetch bids by adsId from db 
   app.get('/fetch-bids/:adsId',(req,res)=>{
    var {adsId}=req.params;
    var sql=`SELECT * from bids where adsId=?`;
    con.query(sql,[adsId],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
   });
    //To fetch bids by bidderId from db 
   app.get('/fetch-bids/bidder/:bidder_id',(req,res)=>{
    var {bidder_id}=req.params;
    var sql=`SELECT * from bids where bidder_id =?`;
    con.query(sql,[bidder_id],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
   });
    //To fetch bids by bidderId from db 
   app.get('/fetch-bids/ads/:bidder_id',(req,res)=>{ 
    var {bidder_id}=req.params;
    var sql=`SELECT * from bids where bidder_id =?`;
    con.query(sql,[bidder_id],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
   });
    //To FETCH all bids from db 
   app.get('/fetch-allbids/',(req,res)=>{ 
    var sql=`SELECT * from bids `;
    con.query(sql,function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
   });
    //To Fetch order from db by userId 
   app.get('/fetch-order/:userId',(req,res)=>{
    var {userId}=req.params;
    var sql=`SELECT * from orders where userId=?`;
    con.query(sql,[userId],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
   });
   //To FETCH ESCO from db using ORDER_ID
   app.get('/fetch-esco/:order_id',(req,res)=>{ 
    var {order_id}=req.params;
    var sql=`SELECT * from esco where order_id=?`;
    con.query(sql,[order_id],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
   });
    //To FETCH image from db using adsId
   app.get('/fetch-images/:adsId',(req,res)=>{ 
    var {adsId}=req.params;
    var sql=`SELECT * from images where adsId=?`;
    con.query(sql,[adsId],function (err,data){
        if(err) {
            console.log(err)
            return;
          };
          if (data.length > 0) {
            res.send({status:200, message:'success',data});    
          } else {    
            res.send({status:404, message:'failed'});
          }
        });
   });
     //  To insert into orders  in the db 
   app.post('/order/insert/', (req, res) => {
    let object=req.body;
     con.query("insert into orders set ?",[(object)],(error,data)=>{
      if(error){
       console.log(error);
         res.status(404).send({message:'error'})
         return;
       }
       res.status(200).send({message:'success'})
     console.log(object);
     });
       });
       //  To insert into review
       app.post('/insert/review/', (req, res) => { 
        let object=req.body;
         con.query("insert into review set ?",[(object)],(error,data)=>{
          if(error){
           console.log(error);
             res.status(404).send({message:'error'})
             return;
           }
           res.status(200).send({message:'success'})
         console.log(object);
         });
           });

             //To fetch review from db by ownerId
           app.get('/fetch-reviews/:ownerId',(req,res)=>{
            var {ownerId}=req.params;
            var sql=`SELECT * from review where ownerId=?`;
            con.query(sql,[ownerId],function (err,data){
                if(err) {
                    console.log(err)
                    return;
                  };
                  if (data.length > 0) {
                    res.send({status:200, message:'success',data});    
                  } else {    
                    res.send({status:404, message:'failed'});
                  }
                });
           });

           //To insert into message
           app.post('/insert/message/', (req, res) => { 
            let object=req.body;
             con.query("insert into message set ?",[(object)],(error,data)=>{
              if(error){
               console.log(error);
                 res.status(404).send({message:'error'})
                 return;
               }
               res.status(200).send({message:'success'})
             console.log(object);
             });
               });

               //HOW TO INSERT MULTIPLE MESSAGE USING ARRAY OF OBJECT

               app.post('/insert/messages/', (req, res) => {
                // let { date_created, messages} = req.body;
                let date_created = new Date();
                let status = 0;
                let messages = [{
                  sender_id:1,
                  receiver_id:2,
                  status,date_created,reference_id:23,
                  sender_username:'pat12',receiver_username:'chanelle12',
                  content:'hellhho'
                },{
                  sender_id:2,
                  receiver_id:1,
                  status,date_created,reference_id:23,
                  sender_username:'chanelle12',receiver_username:'pat12',
                  content:'how are you?'
                },{
                  sender_id:1,
                  receiver_id:2,
                  status,date_created,reference_id:23,
                  sender_username:'pat12',receiver_username:'chanelle12',
                  content:'am doing good'
                }];


              //  let values=[{
              //   message_id:message_id,
              //   sender_id:sender_id,
              //   receiver_id:receiver_id,
              //   status:status,
              //   date_created:date_created,
              //   reference_id:reference_id,
              //   sender_username:sender_username,
              //   receiver_username:receiver_username,
              //   content:content
              //  }]  
              //console.log (values);
              var sql="insert into message set ?"
                  con.query(sql,messages,(error,data)=>{
                   // console.log(data)
                 if(error){
                  console.log(error);
                    res.status(404).send({message:'error'})
                    return;
                  }
                

                  // res.status(200).send({message:'success'});

                  // broadcast to the receiver that a new message was sent.
                  //  socket.io(room).emit
             
                });
                   });

                   /*const executeThis = ()=>{
                    let date_created = new Date();
                    let status = 0;
                    let messages = [{
                      sender_id:1,
                      receiver_id:2,
                      status,date_created,reference_id:23,
                      sender_username:'pat12',receiver_username:'chanelle12',
                      content:'hello'
                    },{
                      sender_id:2,
                      receiver_id:1,
                      status,date_created,reference_id:23,
                      sender_username:'chanelle12',receiver_username:'pat12',
                      content:'how are you?'
                    },{
                      sender_id:1,
                      receiver_id:2,
                      status,date_created,reference_id:23,
                      sender_username:'pat12',receiver_username:'chanelle12',
                      content:'am doing good'
                    }];
    
                  var sql="insert into message set ?"
                      con.query(sql,messages,(error,data)=>{
                       // console.log(data)
                     if(error){
                      console.log(error);
                        return;
                      }
                     console.log('success');
                     //console.log({message_id:data.insertId, ...messages[2]});
                 
                    });
                   };
                   executeThis();*/





             //To fetch message by senderId,receiverId and referenceId
               app.get('/fetch-message/:sender_id/:receiver_id/:reference_id/',function(req,res){
                con.query('SELECT * FROM message WHERE sender_id=? AND reference_id=? OR receiver_id=? AND reference_id=?  ',[req.params.sender_id, req.params.reference_id,req.params.receiver_id,req.params.reference_id],function(error,data,fields){
                    if(error) throw error;
                    else {
                    res.json({'data':data , message:'success'})
                    console.log(JSON.stringify(data));
                    }
                });
            });

            //To fetch message by referenceId from db
          app.get('/fetch-message/reference/:reference_id',(req,res)=>{
            var {reference_id}=req.params;
            var sql=`SELECT * from message where reference_id=?`;
            con.query(sql,[reference_id],function (err,data){
                if(err) {
                    console.log(err)
                    return;
                  };
                  if (data.length > 0) {
                    res.send({status:200, message:'success',data});    
                  } else {    
                    res.send({status:404, message:'failed'});
                  }
                });
           });
           //To fetch message by senderId,receiverId
           app.get('/fetch-message/user/:id',function(req,res){
            con.query('SELECT * FROM message WHERE sender_id=? OR receiver_id =? ',[req.params.id, req.params.id],function(error,data,fields){
                if(error) throw error;
                else {
                res.json({'data':data, message:'success'})
                }
            });
        });
        //
        app.get('/mute/status',(req,res)=>{
          var sql=`SELECT * from ads where status=1`;
          con.query(sql,function (err,data){
              if(err) {
                  console.log(err)
                  return;
                };
                if (data.length > 0) {
                  res.send({status:200, message:'success',data});    
                } else {    
                  res.send({status:404, message:'failed'});
                }
              });
         });

       

        app.post('/mute-change/status/', function(req, res, next) {//SOLD AND NOT VISIIBLE
          var{adsId}=req.body;
              var sql = `UPDATE ads SET status=1 WHERE adsId=?`;
              con.query(sql, [adsId], function (err, data) {
              if (err) throw err;
              console.log(data.affectedRows + " record(s) updated");
            });
            res.status(200).send({message:'success'});
          
          });
          app.post('/unmute/status/', function(req, res, next) {//VISIBLE AND NOT SOLD
            var{adsId}=req.body;
                var sql = `UPDATE ads SET status=0 WHERE adsId=?`;
                con.query(sql, [adsId], function (err, data) {
                if (err) throw err;
                console.log(data.affectedRows + " record(s) updated");
              });
              res.status(200).send({message:'success'});
            
            });

            app.post('/mute/status/', function(req, res, next) {//MUTED NOT SOLD AND NOT VISBLE
              var{adsId}=req.body;
                  var sql = `UPDATE ads SET status=2 WHERE adsId=?`;
                  con.query(sql, [adsId], function (err, data) {
                  if (err) throw err;
                  console.log(data.affectedRows + " record(s) updated");
                });
                res.status(200).send({message:'success'});
              
              });


          app.post('/delete-ads/id/', function(req, res, next) {
            var{adsId}=req.body;
                var sql = `DELETE FROM ads WHERE adsId=?`;
                con.query(sql, [adsId], function (err, data) {
                if (err) throw err;
                console.log(data.affectedRows + " record(s) deleted");
              });
              res.status(200).send({message:'success'});
            
            });

        app.post('/change/status/', function(req, res, next) {
        var{message_id}=req.body;
            var sql = `UPDATE message SET status=1 WHERE message_id=?`;
            con.query(sql, [message_id], function (err, data) {
            if (err) throw err;
            console.log(data.affectedRows + " record(s) updated");
          });
          res.status(200).send({message:'success'});
        
        });

        app.post('/update/ad/', function(req, res, next) {

          var{description,category,adsId,title,image,sub_category,price,date_created}=req.body;
              var sql = `UPDATE ads SET description=?, category=?, title=?, image=?, sub_category=?,price=?, date_created=? WHERE adsId=?`;
              con.query(sql, [description,category,title,image,sub_category,price,date_created,adsId], function (err, data) {
              if (err) throw err;
              console.log(data.affectedRows + " record(s) updated");
            });
            res.status(200).send({message:'success'});
          
          });

          app.get('/fetch-ads/owner/:userId',(req,res)=>{
            var {userId}=req.params;
            var sql=`SELECT * from ads where userId=?`;
            con.query(sql,[userId],function (err,data){
                if(err) {
                    console.log(err)
                    return;
                  };
                  if (data.length > 0) {
                    res.send({status:200, message:'success',data});    
                  } else {    
                    res.send({status:404, message:'failed'});
                  }
                });
           });
           
           //The function of socket 
           var objects = [];
           var socketCount = 0
           
           var io =require("socket.io")(http);
           io.on("connection",function(socket){
                socketCount++
                io.sockets.emit('users connected', socketCount)
           
                socket.on('disconnect', function() {
                    socketCount--
                    io.sockets.emit('users disconnected', socketCount)
                })
                socket.on('new msg', function(data){
                   // New msg added, push to all sockets and insert into db
                   objects.push(data)
                   io.sockets.emit('new msg', data)
                   con.query('INSERT INTO message (content) VALUES (?)',data.content)
               })


                // insert multiple messages
        app.post('/insert/messages/', (req, res) => {
          let {messages}=req.body;
        var sql="insert into message (sender_id,receiver_id,status,date_created,reference_id,sender_username,receiver_username,content) VALUES ?"
        con.query(sql,[messages],(error,data)=>{
                 console.log (req.body);
            if(error){
                console.log(error);
                  res.status(404).send({message:'error'})
                 return;
                }
              console.log(data);
           
          res.status(200).send({message:'success'});
          //console.log({message_id:data.insertId, ...messages[2]})
          io.sockets.emit('delayedmessages',messages)
      
              });
          });

           //delete the multiple messages
        app.post('/DELETE/messages/', (req, res) => {
          let {message_id}=req.body;
       var sql="DELETE FROM message  WHERE  (message_id) IN (?)"
        con.query(sql,[message_id],(error,data)=>{
                 console.log (req.body);
            if(error){
                console.log(error);
                  res.status(404).send({message:'error'})
                 return;
                }
              console.log(data);
           
          res.status(200).send({message:'success'});
          io.sockets.emit('delayedmessages',messages)
         
              });
          });

           //To update messages++++++++++
        app.post('/Update/message/',(req,res)=>{
          let{content,message_id}=req.body
      var sql="Update message SET content=? WHERE message_id=? "
      con.query(sql,[content,message_id],(error,data)=>{
          console.log (req.body);
     if(error){
      console.log(data.affectedRows + " record(s) updated");
      console.log(error);
      res.status(404).send({message:'error'})
          return;
         }
       console.log(data);
       res.status(200).send({message:'success'});
       io.sockets.emit('delayedmessages',messages) 
         
      })
  })



               



           
           });

           app.get("/",function (request, result){
            result.sendFile(`${__dirname}/socket.html`);
            
             //console.log(__dirname)
             });
         

            /*//How to insert multiple messages
               const testing = () =>{
            let array = [
              {cont}
            ]
            con.query("insert into message set ?",[(array)],(error,data)=>{
             if(error){
              console.log(error);
                res.status(404).send({message:'error'})
                return;
              }
              res.status(200).send({message:'success'})
            console.log(object);
            });
               }*/

            

             
         















          
        const storage=multer.diskStorage({
          destination:'./upload',

          filename:(req,file,cb)=>{
          return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
          }
          
          })
        const upload = multer({ storage : storage });
        app.use('/file',express.static('upload'));
          
          app.post('/insert/ads',upload.single('file'),(req,res)=>{
            console.log(req.file);
          const object=({
           userId:req.body.userId,
            title:req.body.title,
            image:'http://localhost:3002/file/' + req.file.filename,
             description:req.body.description,
             category:req.body.category,
             sub_category:req.body.sub_category,
           properties:req.body.properties,
            owner:req.body.owner,
             status:req.body.status,
             boosted :req.body.boosted,
             type :req.body.type,
             price :req.body.price,
             date_created:req.body.date_created
          });
          
             var sql= "insert into ads set ?"
            con.query(sql,[(object)],(error,data)=>{
             if(error){
               console.log(error);
                 res.status(404).send({message:'error'})
                 return;
               }
               res.status(200).send({message:'success', profile_url:`http://localhost:3002/file/${req.file.filename}`})
             console.log(object);
             });

          });

          http.listen(port,function(){
            console.log("Listening to port " +port); 
            }); 
  //app.listen(port, () => console.log(`Hello safi app listening on port ${port}!`));