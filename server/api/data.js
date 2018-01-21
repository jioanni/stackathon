const router = require('express').Router()
const request = require('request')

router.get('/:id', (req, res, next) => {
    var subreddit = req.params.id
    if (subreddit === undefined) {
        return request({
            uri: `https://www.reddit.com/r/rarepuppers/top.json`
        }).pipe(res) 
    } else {
        return request({
            uri: `https://www.reddit.com/r/${subreddit}/top.json`
        }).pipe(res) 
    }
})


module.exports = router