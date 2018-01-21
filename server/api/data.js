const router = require('express').Router()
const request = require('request')

router.get('/', (req, res, next) => {
    return request({
        uri: "https://www.reddit.com/r/rarepuppers/top.json"
    }).pipe(res) 
})


module.exports = router