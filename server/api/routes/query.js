const runner = require("../oracle/query-runner.js")
const bodyParser = require('body-parser')
var express = require("express");
var router = express.Router();

router.post("/", async function(req, res, next) {
	// const payload = JSON.stringify(req.body)
	const data = await runner.main(req.body)
    res.send(data)
});

module.exports = router;