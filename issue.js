

  const express = require('express');
const fetch = require('node-fetch');
const app = express();
const projectkey="LEAR"
const myemail= "trijraj.k@sheru.se"
const apitoken="ATATT3xFfGF0mrqkR48LtYrbQr6O2slOoMkVdu65hS70cDmUVp-YgtGanLL5dCX4zfTP7WcALTnn82FRfwIXclTSLhcwYsysIiIjl4-7c0ATCmw7dfLo8mLbcvNxU9COIYn_HQ3WqUpiL7rLEhShcwo_IXwDPquSgn1xbYEbtE0ByXstOECxyC8=07DF3450"
const bodyData = `{
  "fields": {
    "project":
    {
      "key": "LEAR"
    },
    "summary": "Test issue for abhinav sir ",
    "description": "Creating an issue in Jira ",
    "issuetype": {
        "id": "10002"
    }
  }
}`;

app.post('/create-jira-issue', (req, res) => {
  fetch('https://trijraj.atlassian.net/rest/api/2/issue', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        `${myemail}:${apitoken}`
      ).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => {
      console.log(text);
      res.send(text);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
