const parser = require('./query-parser.js')
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

function init() {
	try {
		oracledb.initOracleClient({libDir: './oracle/instantclient_19_10'});
		console.log("Oracle initialized...")
	} catch (err) {
		// console.log("Already initialized...")
		// console.error(err);
	}
}

async function run(payload) {
	let connection = await oracledb.getConnection(dbConfig);

	try {
		number = payload["number"]
		vars = payload["vars"]
	} catch(err) {
		console.error("Incorrect payload format.")
		return null
	}

	try {
	  	queries = await parser.processQuery(number, vars)
	  	var results = []

	  	for (const query of queries) {
	  		let result = await connection.execute(
	  			query,
	  			[],
	  			{
	  				outFormat: oracledb.OUT_FORMAT_ARRAY
	  			}
	  		)
	  		results.push(result)
	  	}
	} catch(err) {
    	console.log(err);
	} finally {
    	if (connection) {
    		try {
    			await connection.close();
    		} catch (err) {
    			console.log(err);
    		}
    	}
    }

    return results
}

function cleanData(dirty) {
	var cleanedData = {}

	for (var i = 1; i <= dirty.length; i++) {
		var columnWise = dirty[i - 1]["rows"][0].map(function(col, k) {
			return dirty[i - 1]["rows"].map(function(row) {
				return row[k];
			})
		})

		clean = {}
		for (var j = 0; j < dirty[i - 1]["metaData"].length; j++) {
			header = dirty[i - 1]["metaData"][j]["name"]
			clean[header] = columnWise[j]
		}		

		cleanedData[i] = clean
	}

	return cleanedData
}

async function main(payload) {
	init();
	var data_meta = await run(payload)
	var data = cleanData(data_meta)

	return data
}

module.exports = {
	main: main
}
