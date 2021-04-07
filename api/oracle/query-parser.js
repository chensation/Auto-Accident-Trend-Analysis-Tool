const defaultTable = {
	1: [["0000"], ["00", "XXXX"]],
	2: [["00", "01"]],
	3: [["00", "01"], ["00", "01"]],
	4: null,
	5: null
}

async function processQuery(number, vars = null) {
	let contents = await getSQLQuery(number).catch((err) => {
		console.log(err)
	})

	queries = convertQuery(defaultTable, number, contents, vars)
	console.log(queries)
	return contents
}

function getSQLQuery(number) {
	return new Promise((resolve, reject) => {
		if (number < 1 || number > 5) {
			console.error("Not a valid SQL query. :(")
		} else {
			var contents = []
			readContent(number, function (err, contents) {
				if (!err) {
					resolve(contents)
				} else {
					console.err("Not reading SQL files correctly. :(")
					reject(err)
				}
			})
		}
	})
}

function readContent(number, callback) {
	const fs = require('fs')
	const folder = `../../sqlScripts/query${number}`

	var files = []
	fs.readdirSync(folder).forEach(file => {
		if (file != `query${number}.sql`) files.push(`${folder}/${file}`)
	})

	var contents = []
	files.forEach(function (item, index) {
		try {
			contents.push(fs.readFileSync(item, 'utf8'))
		} catch (err) {
			callback(err)
		}
	})
	callback(null, contents)
}

function convertQuery(defaultTable, number, queries, vars) {
	const table = defaultTable[number]

	if (vars) {
		if (queries.length != vars.length) {
			console.error("Number of queries doesn't match variables. :(")
			return null
		}
		else {
			for (var i = 0; i < vars.length; i++) {
				if (vars[i].length != table[i].length) {
					console.error("Number of variables doesn't match default table. :(")
					return null
				} else {
					for (var j = 0; j < vars[i].length; j++) {
						queries[i] = queries[i].replace(new RegExp(table[i][j], "g"), vars[i][j])
					}
				}
			}
		}
	} else if (table) {
		console.error("No variables given. :(")
		return null;
	}

	return queries
}

module.exports = {
	defaultTable: defaultTable,
	processQuery: processQuery,
	getSQLQuery: getSQLQuery,
	readContent: readContent,
	convertQuery: convertQuery
}
