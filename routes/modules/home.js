const express = require('express')
const router = express.Router()
const URL = require("../../models/URL")
const shortenURL = require("../../utils/shortenURL")


router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  // 沒輸入網址則不動作
  const url = req.body.url
  if (!url) return res.redirect('/')

  // 產生五碼亂數字元
  const shortURL = shortenURL(5)

  // 輸入網址是否已存在 回傳第一個符合條件的結果
  URL.findOne({ originalURL: url })
    .then(data =>
      data ? data : URL.create({ shortURL, originalURL: url })
    )
    .then(data =>
      res.render("index", {
        origin: req.headers.origin,
        shortURL: data.shortURL,
      })
    )
    .catch(error => console.error(error))
})

// //將短網址導向原本網址
router.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params
  URL.findOne({ shortURL })
    .lean()
    .then(data => {
      res.redirect(data.originalURL)
    })
    .catch(error => {
      res.render('index', { error })
    })
})

module.exports = router