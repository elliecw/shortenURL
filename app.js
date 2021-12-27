// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const URL = require("./models/URL")
const shortenURL = require("./utils/shortenURL")
require('./config/mongoose')

const routes = require('./routes')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
app.use(express.static("public"))

app.use(routes)

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})