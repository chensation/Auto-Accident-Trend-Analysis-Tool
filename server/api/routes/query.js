const runner = require("../oracle/query-runner.js")

var express = require("express");
var router = express.Router();

router.get("/", async function(req, res, next) {
	var data = await runner.main()
	console.log(data)
    res.send(data)
});

module.exports = router;