const runner = require("../oracle/query-runner.js")
const bodyParser = require('body-parser')
var express = require("express");
var router = express.Router();

router.post("/", async function(req, res, next) {
	var data = await runner.main(req.body)
	// console.dir(req.body)
    res.send(data)
});

module.exports = router;