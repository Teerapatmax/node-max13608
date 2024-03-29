const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '157.245.59.56',
  user: 'u6402802',
  password: '6402802',
  database: 'u6402802_shopee',
  port: 3366
})

var app = express()
app.use(cors())
app.use(express.json())

app.get('/', function(req, res) {
  res.json({
    "status": "ok",
    "message": "Hello World"
  })
})


app.get('/customer', function(req, res) {
  connection.query(
    'SELECT * FROM a1_customer',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

app.get('/orders', function(req, res) {
  connection.query(
    'SELECT * FROM a1_order',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

app.get('/product', function(req, res) {
  connection.query(
    'SELECT * FROM a1_product',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

// เรียงลับดับจากคนที่ซื้อเยอะ => น้อยที่สุด
app.get("/top_customers", function (req, res) {
  connection.query(
    `SELECT 
    C.NICKname, 
    SUM(O.Qty*P.Price) AS price_sum 
  FROM a1_customer AS C 
    INNER JOIN a1_order AS O ON C.Cid = O.Oid
    INNER JOIN a1_product AS P ON O.Pid = P.Pid 
  GROUP BY 
    C.Cid 
  ORDER BY 
    price_sum DESC;`,
    function (err, results) {
      res.json(results);
    }
  );
});

// เรียงลับดับจากคนที่ซื้อเยอะ => น้อยที่สุด
app.get('/top_products', function(req, res){
  connection.query(
    `SELECT O.id, P.Pname, O.Qty, SUM(O.Qty) as Total_Qty FROM a1_order as O INNER JOIN a1_product as P ON O.Pid= P.Pid GROUP BY O.id, P.Pname, O.Qty, P.price ORDER BY Total_Qty DESC;`,
    function (err, results) {
      res.json(results);
    }
  );
});

app.listen(5000, () => {
  console.log('Server is started.')
})
