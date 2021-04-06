/* Copyright (c) 2015, 2020, Oracle and/or its affiliates. All rights reserved. */

/******************************************************************************
 *
 * You may not use the identified files except in compliance with the Apache
 * License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   select1.js
 *
 * DESCRIPTION
 *   Executes a basic query without using a connection pool or ResultSet.
 *
 *   For a connection pool example see connectionpool.js
 *   For a ResultSet example see resultset2.js
 *   For a query stream example see selectstream.js
 *
 *   This example uses Node 8's async/await syntax.
 *
 *****************************************************************************/

'use strict';

const oracledb = require('oracledb');
	try {
		oracledb.initOracleClient({libDir: './instantclient_19_10'});
		console.log("Oracle initialized...")
	} catch (err) {
	console.error('Whoops!');
	console.error(err);
	process.exit(1);
}

const dbConfig = require('./dbconfig.js');

async function run() {
	let connection;

	try {
		connection = await oracledb.getConnection(
		    {
		      user : dbConfig.user,
		      password : dbConfig.password,
		      connectString : dbConfig.connectString
		    }
		 if (err) {
		 	console.err(err.message);
		 	return;
		 } else {
		 	console.log("connected to Oracle...")
		 });
	}


	    function(err, connection)
	    {
			if (err) {
				console.err(err.message);
				return;
	      	}
	      	else {
	      		console.log("connected to Oracle...")
	      	}

	      	try {
		      	const query = 
		      		`SELECT COUNT(*), STATE_CODE, P,(COUNT(*)/P)*1000 AS ACCIDENT_PER_THOUSAND_POP 
					 FROM SIYUCHEN.ACCIDENT NATURAL JOIN SIYUCHEN.LOCATION NATURAL JOIN ( 
							SELECT POPULATION_COUNT AS P,STATE_CODE 
						     FROM SIYUCHEN.POPULATION 
						     WHERE YEAR = 2020 
					)
					GROUP BY STATE_CODE, P 
					ORDER BY ACCIDENT_PER_THOUSAND_POP DESC;`;

		      	let result = await connection.execute(query);
	  			console.log(result.metaData);
		      	console.log(result.rows);

		    } catch(err) {
		    	console.log(error);
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
	);
}

run();