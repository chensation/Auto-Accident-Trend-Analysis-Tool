const test_payload = {
    "number": 5,
    "vars": null
}

const callAPI = (data) => {
  postData("http://localhost:9000/query", data)
      .then(res => console.log(res));
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors',
    cache: 'default', // change to force-cache when done testing
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data)
  });

  return response.json();
}

export {
  test_payload,
  callAPI
}
