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

async function run() {
	let connection = await oracledb.getConnection(dbConfig);

	try {
	  	var query = `SELECT COUNT(*),TO_CHAR(START_TIME, 'MM') AS MONTH  FROM SIYUCHEN.ACCIDENT 
           WHERE (LATITUDE>=00 AND LATITUDE < 01)  
GROUP BY TO_CHAR(START_TIME, 'MM')
ORDER BY TO_CHAR(START_TIME, 'MM') ASC`
	  	console.log(query)
		query = query.replace("2010", year);

	  	const result = await connection.execute(
	  		query,
	  		[],
	  		{
	  			outFormat: oracledb.OUT_FORMAT_OBJECT,
	  		}
	  	);

	  	const result2 = await connection.execute(
	  		query,
	  		[],
	  		{
	  			outFormat: oracledb.OUT_FORMAT_OBJECT,
	  		}
	  	);
		console.log(result.metaData);
	  	console.log(result.rows);
	  	console.log(result2.metaData)
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
}

// init();
// run();