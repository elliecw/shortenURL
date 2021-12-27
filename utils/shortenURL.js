/** 字元表，由 0-9、a-z、A-Z 組成 */
const BASE_62_CHAR = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
/** 字元表的最大 Index */
const MAX = 61
/** 字元表的最小 Index */
const MIN = 0

/**
 * 依照輸入的短網址長度，產生對應的亂數字串
 * @param {number} shortenURL_Length
 */
module.exports = (shortenURL_Length) => {
  /** 負責儲存對應的字元 */
  let result = ""

  for (let i = 0; i < shortenURL_Length; i++) {
    /** 產生亂數 Index */
    const randomIndex = Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
    /** 依照亂數表找出對應的字元 */
    const chooseChar = BASE_62_CHAR[randomIndex]
    /** 將對應字元放入 result */
    result += chooseChar
  }

  /** 回傳，即為亂數字串 */
  return result
}