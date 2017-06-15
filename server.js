/**
 * Created by susil panda on 10/23/2016.
 */
var express = require('express');

var app = express();
var mongojs = require('mongojs');
var db = mongojs('swaggykuteer', [ 'swaggykuteer']);
var bodyParser = require('body-parser');

var nodemailer = require('nodemailer');
//var excelParser = require('excel-parser');



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(_dirname = '/public'));
app.use(bodyParser.json());

app.get('/products', function(req, res){
    console.log("I got Get All Request");
    db.swaggykuteer.find(function(err,docs){
        console.log(docs);
        res.json(docs);
    });
});
app.post('/create', function(req, res){
    console.log("I got a create Request");
    console.log(req.body);
    db.swaggykuteer.insert(req.body, function(err, doc){
        res.json(doc);
        console.log(err);
    });
});

app.get('/getProduct/:id', function(req, res){
    console.log("got a get Request");
    var id = req.params.id;
    db.swaggykuteer.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
        console.log(err);
    });
});

app.put('/update/:id', function (req, res) {
    console.log("update request received");
    var id = req.params.id;
    console.log(id);
    db.swaggykuteer.findAndModify({
        query:{_id: mongojs.ObjectId(id)},
        update:{$set:{name:req.body.name , experience:req.body.experience, currentproject:req.body.currentproject, emailid:req.body.emailid, mobilenumber:req.body.mobilenumber,
            profile:req.body.profile, role:req.body.role, awards:req.body.awards, certification:req.body.certification, testframework:req.body.testframework }},new : true },function(response){
        console.log("updated successfully");
        console.log(response);
        res.json(response);
    });
});

app.put('/updateSkill/:id', function (req, res) {
    console.log("update skill request received");
    var id = req.params.id;
    console.log(req.body);
    db.expertprofiles.findAndModify({
        query:{_id: mongojs.ObjectId(id)},
        update:{$set:{skills :{java:req.body.java, cpp:req.body.cpp, linux:req.body.linux, python:req.body.python, angularjs:req.body.angularjs,
            nodejs:req.body.nodejs, eclipse:req.body.eclipse } }},new : true },function(response){
        console.log("updated successfully");
        console.log(response);
        res.json(response);
    });
});
app.put('/updateCertification/:id', function (req, res) {
    console.log("update certification request received");
    var id = req.params.id;
    console.log(req.body);
    db.expertprofiles.findAndModify({
        query:{_id: mongojs.ObjectId(id)},
        update:{$set:{certification :{name:req.body.name } }},new : true },function(response){
        console.log("updated certification successfully");
        console.log(response);
        res.json(response);
    });
});

app.get('/search/:id', function(req, res){
    console.log("got a get Request");
    var id = req.params.id;
    console.log(id);
    console.log(req.body);
    // var query = {};
    //query[experience] = "4.4";
    db.expertprofiles.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
        console.log(doc);
        console.log(err);
    });
});

app.post('/sendEmail/:id', handleEmailSend); // handle the route at yourdomain.com/sayHello

function handleEmailSend(req, res) {
    console.log("Email recieved to send : " + req.params.id);
    console.log(req.body.message);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'expertprofile123@gmail.com', // admin email id
            pass: 'Unity@123' // admin password
        }
    });
    var mailOptions = {
        from: 'expertprofile123@gmail.com', // sender address
        to: req.params.id, // list of receivers
        subject: 'Requirement..', // Subject line
        text: req.body.message//, // plaintext body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({status: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({status: info.response});
        };
    });
}

function convertToJSON(array) {
    var first = array[0].join()
    var headers = first.split(',');

    var jsonData = [];
    for ( var i = 1, length = array.length; i < length; i++ )
    {

        var myRow = array[i].join();
        var row = myRow.split(',');

        var data = {};
        for ( var x = 0; x < row.length; x++ )
        {
            data[headers[x]] = row[x];
        }
        jsonData.push(data);

    }
    return jsonData;
};

app.post('/uploadData',  parseAndSaveInDB);

  function  parseAndSaveInDB(req, res) {
      console.log("Inside uploadData");
      /*excelParser.worksheets({
          inFile: 'data/productData.xlsx'
      }, function (err, worksheets) {
          if (err) console.error(err);
          console.log(worksheets);
      });*/

      excelParser.parse({
       inFile: 'data/productData.xlsx',
       worksheet: 1,
       skipEmpty: true,
       searchFor: {
       term: ['my search term'],
       type: 'loose'
       }
       },function(err, records){
       if(err) console.error(err);
       console.log(records);
       });
      //console.log(jsonDataArray(data));
      //console.log(JSON.stringify(convertToJSON(data)));
      console.log("End of Parsing");
  }

app.listen(3033);