var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var ProductsDB = require('./app/models/products');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://shirley:123456@jello.modulusmongo.net:27017/gy7Gomiw')

var successResponse = '{"success": "Successfully!", "status" : 200}';

app.use("/", express.static(path.join(__dirname, '/views')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//create
app.post('/products', function(req, res){
  var mydb = new ProductsDB();
  mydb.fullName = req.body.fullName;
  mydb.shortName = req.body.shortName;
  mydb.imageUrl = req.body.imageUrl;
  mydb.price = req.body.price;

  mydb.save(function(err){
    if(err)
      res.send(err);

    res.end(successResponse);
  });

});

//read
app.get('/products', function(req, res){
  var nums = req.query.currentPage * 10;
  console.log(req.query.currentPage);
  ProductsDB.find(function(err, products){
    if (err)
      res.send(err);

    res.json(products);
  }).skip(nums).limit(10);
});

// app.get('/', function(req, res){
//   res.sendFile(path.join(__dirname, 'products.json'));
// });

app.get('/products/:id', function(req, res){
  ProductsDB.findById(req.params.id, function(err, product){
    if (err)
      res.send(err);

    res.json(product);
  });
});


//update
app.put('/products/:id', function(req, res){
  ProductsDB.findById(req.params.id, function(err, product){
    if (err)
      res.send(err);

    product.fullName = req.body.fullName;
    product.shortName = req.body.shortName;
    product.imageUrl = req.body.imageUrl;
    product.price = req.body.price;

    product.save(function(err){
      if (err)
        res.send(err);

      res.end(successResponse);
    });
  });
});

//delete
app.delete('/products/:id', function(req, res){
  ProductsDB.remove({
    _id: req.params.id
  }, function(err, product){
    if (err)
      res.send(err);

    res.end(successResponse);
  });
});

app.listen(8888, function(){
  console.log('app started');
});
