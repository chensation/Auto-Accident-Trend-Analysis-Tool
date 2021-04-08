const parser = require('./query-parser.js')
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

/*
Write function to convert the returned values to the desired format based on
*/

function init() {
	try {
		oracledb.initOracleClient({libDir: './instantclient_19_10'});
		console.log("Oracle initialized...")
	} catch (err) {
		console.error(err);
		process.exit(1);
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
	clean = []
	for (var dirt of dirty) {
		clean.push(dirt["rows"])
	}

	return clean
}

async function main() {
	const test_payload = {
		"number": 3,
		"vars": parser.constSet[3][0]
	}

	init();
	var data_meta = await run(test_payload)
	var data = cleanData(data_meta)
	console.log(data)
}

main()