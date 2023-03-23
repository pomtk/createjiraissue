const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const app = express();
const FormData=require('form-data')
const apiKey = '76679fbe9684813aef29f1266fa34c4058f412be422f64b8';
const apiToken = 'f4d0421c70e5f386f2059e51dab0fdd3ef7a600f55ed7449';
let myemail= "trijraj.k@sheru.se"
let apitoken="ATATT3xFfGF0KugeeQeDyaTtUGS9Rhu-Lo_1qNVcB-DcUag17nSG2cu-s1vqGhMHS115cP2qchfrpFRxF2hVuk3fQEnAAZ4YNuY8vbUmOa1Xj-F9NtOvdRl3sFewZUxo26REySjxk0a7GmdMQ3IljtUia0qpd_0JLVymP_eSFFUC7sNgiq2838A=6CDF19D1"
let bodyData = `{
    "fields": {
      "assignee":{
        "id": "63d92727db4f715c971f586e"
      },
      "project":
      {
        "key": "LEAR"
      },
      "summary": "shaam wali call recording test part 2",
      "description": "testing with aj sir with exoappname  ",
      "issuetype": {
          "id": "10002"
      }
    }
  }`
app.get('/process-call-and-upload', async (req, res) => {
  try {
    
    // First API call - Get call details
    const callDetails = await getCallDetails();
    const recordingUrl = callDetails.recordingUrl;

    // Second API call - Create JIRA issue
    const issueResponse = await createJiraIssue();
    const issueId = issueResponse.id;

    // Third API call - Upload attachment
    const attachmentResponse = await uploadJiraAttachment(recordingUrl, issueId);

    // Send success response
    res.send({
      callDetails: callDetails,
      issueResponse: issueResponse,
      attachmentResponse: attachmentResponse
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

function getCallDetails() {
  return new Promise((resolve, reject) => {
   
    const options = {
      method: 'GET',
      url: 'https://76679fbe9684813aef29f1266fa34c4058f412be422f64b8:f4d0421c70e5f386f2059e51dab0fdd3ef7a600f55ed7449@ccm-api.exotel.com/v3/accounts/sheru1/calls/7396bd0ef4b4ce69b23f14f5af92173n',
      headers: { 'content-type': 'application/json' }
    };

    request(options, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        const responseBody = JSON.parse(body);
        const recordingUrl = responseBody.response.call_details.recordings[0].url;
        //const appName = responseBody.response.call_details.app_name;
        resolve({ recordingUrl});
      }
    });
  });
}

function createJiraIssue() {
  return new Promise(async (resolve, reject) => {
    const bodyData = JSON.stringify({
        
            "fields": {
              "assignee":{
                "id": "63d92727db4f715c971f586e"
              },
              "project":
              {
                "key": "LEAR"
              },
              "summary": "shaam wali call recording test part 2",
              "description": "testing with aj sir with exoappname  ",
              "issuetype": {
                  "id": "10002"
              }
            }
          
    });

    try {
      const response = await fetch('https://trijraj.atlassian.net/rest/api/2/issue', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${myemail}:${apitoken}`).toString('base64')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: bodyData
      });

      const data = await response.json();

      if (!response.ok) {
        reject(data);
      } else {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function uploadJiraAttachment(recordingUrl, issueId) {
  return new Promise((resolve, reject) => {
    request.get(recordingUrl, { encoding: null }, (error, response, body) => {
      if (error) {
        reject(`Failed to download MP3 file: ${error}`);
      } else if (response.statusCode !== 200) {
        reject(`Failed to download MP3 file: ${response.statusMessage}`);
    } else {
    const form = {
    file: {
    value: body,
    options: {
    filename: 'callrecording.mp3',
    contentType: 'audio/mpeg'
    }
    }
    };
    request.post({
        url: `https://trijraj.atlassian.net/rest/api/3/issue/${issueId}/attachments/temporary`,
        formData: form,
        headers: {
          Authorization: `Basic ${Buffer.from(`${myemail}:${apitoken}`).toString('base64')}`,
          Accept: 'application/json',
          'X-Atlassian-Token': 'no-check'
        }
      }, (error, response, body) => {
        if (error) {
          reject(`Failed to upload file: ${error}`);
        } else if (response.statusCode !== 200) {
          reject(`Failed to upload file: ${response.statusMessage}`);
        } else {
          const data = JSON.parse(body);
          resolve(data);
        }
      });
    }
  });
});
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});
