

  const express = require('express');
const fetch = require('node-fetch');
const app = express();
const fs=require('fs')
const FormData=require('form-data')
const projectkey="Enquiry"
const myemail= "abhinav.j@sheru.se"
const apitoken="ATATT3xFfGF0Pnk5gZUBrNzjIoeSHq3fip8AKkdSrLR7gd7HsqUTWJmJBhUJ2qfMgUQzR2M-dcRlFOT7pPR-ZwlIti4rTgsZWRmZlIEDhNg7i74LkQe9-DWTH504GumoaJ7q4S8EylIHWeP1focimv3rx73K0FshONvq0xECcDwES34sPk1HTdM=07722A5A"




const bodyData = `{
  "fields": {
    "assignee":{
      "id": "5c7d0e64d706436de8a9566b"
    },
    "project":
    {
      "key": "EN"
    },
    "summary": "testing for service mangae",
    "description": "testing with aj sir  ",
    "issuetype": {
        "id": "10002"
    }
  }
}`;

app.post('/create-jira-issue', (req, res) => {
  fetch('https://sheruorg.atlassian.net/rest/api/2/issue', {
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
app.post('/upload-jira-attachment', (req, res) => {
  const filePath = "assets/groovy-light-future-bass-15881.mp3";
  const form = new FormData();
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  const fileStream = fs.createReadStream(filePath);

  form.append('file', fileStream, { knownLength: fileSizeInBytes });

  fetch(
    `https://sheruorg.atlassian.net/rest/api/3/issue/EN-1/attachments`,
    {
      method: 'POST',
      body: form,
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${myemail}:${apitoken}`
        ).toString('base64')}`,
        Accept: 'application/json',
        'X-Atlassian-Token': 'no-check'
      }
    }
  )
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.json();
    })
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
