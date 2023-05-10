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

app.get('/top_products', function(req, res) {
  connection.query(
    'select C.NICKname,P.Pid, O.Qty, sum(O.Qty*P.Price) as Total_Price from a1_order as O inner join a1_product as P on O.Oid = P.Pid inner join a1_customer as C on C.Cid = O.Cid group by C.NICKname, O.Oid, O.Qty, P.Price order by Total_Price desc;;',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
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

app.listen(5000, () => {
  console.log('Server is started.')
})
