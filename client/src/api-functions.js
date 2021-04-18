const test_payload = {
  "number": 5,
  "vars": null
}

const defaultTable = {
	1: [
		["0000"]
	],
	2: [
		["00", "01"]
	],
	3: [
		["00", "01", "AND"],
		["00", "01", "AND"]
	],
	4: [
		["00-00"],
		["00-00"],
		["00-00"],
		["00-00"]
	],
	5: null
}

const constSet = {
	1: null, 
	2: [
			[["25", "30"]],
			[["30", "45"]],
			[["35", "40"]],
			[["40", "45"]],
			[["45", "50"]]
	],
	3: [
		[["12", "03", "OR"], ["12", "03", "OR"]],
		[["03", "06", "AND"], ["03", "06", "AND"]],
		[["06", "09", "AND"], ["06", "09", "AND"]],
		[["09", "12", "AND"], ["09", "12", "AND"]]
	],
	4: [
		[["20-01"], ["20-01"], ["20-01"], ["20-01"]]
	],
	5: null
}

const callAPI = (number, vars) => {
  return getData("http://localhost:9000/query", number, vars)
      .then(res => {
        return res;
      });
}

async function getData(url = '', number, vars) {
  var qurl = `${url}?number=${number}&vars=${vars}`
  // console.log(qurl)

  const response = await fetch(qurl, {
    method: 'GET', 
    mode: 'cors',
    cache: 'force-cache', // default 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer'
  });

  return response.json();
}

export {
  test_payload,
  defaultTable,
  constSet,
  callAPI
}
