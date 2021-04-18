const runner = require("../oracle/query-runner.js")
const bodyParser = require('body-parser')
var express = require("express");
var router = express.Router();

router.get("/", async function(req, res, next) {
    const number = req.query.number
    const vars = JSON.parse(req.query.vars)
    // console.log(number)
    // console.log(vars)
    
    const payload = {
        "number": number,
        "vars": vars
    }

	const data = await runner.main(payload)
    res.send(data)
});

module.exports = router;