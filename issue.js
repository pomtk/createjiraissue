
//   //const recordingurl=require('./exotel')
//   const request=require('request')
//   const express = require('express');
//   const axios=require('axios')
// const fetch=require('node-fetch')
// const app = express();
// const fs=require('fs')
// const FormData=require('form-data')
// const projectkey="Enquiry"
// let recordingurl=''
// let appname=''
// const myemail= "trijraj.k@sheru.se"
// const apitoken="ATATT3xFfGF0KugeeQeDyaTtUGS9Rhu-Lo_1qNVcB-DcUag17nSG2cu-s1vqGhMHS115cP2qchfrpFRxF2hVuk3fQEnAAZ4YNuY8vbUmOa1Xj-F9NtOvdRl3sFewZUxo26REySjxk0a7GmdMQ3IljtUia0qpd_0JLVymP_eSFFUC7sNgiq2838A=6CDF19D1"
 
// //sheru wala apitoken: ATATT3xFfGF0Pnk5gZUBrNzjIoeSHq3fip8AKkdSrLR7gd7HsqUTWJmJBhUJ2qfMgUQzR2M-dcRlFOT7pPR-ZwlIti4rTgsZWRmZlIEDhNg7i74LkQe9-DWTH504GumoaJ7q4S8EylIHWeP1focimv3rx73K0FshONvq0xECcDwES34sPk1HTdM=07722A5A
// //mytoken:ATATT3xFfGF0KugeeQeDyaTtUGS9Rhu-Lo_1qNVcB-DcUag17nSG2cu-s1vqGhMHS115cP2qchfrpFRxF2hVuk3fQEnAAZ4YNuY8vbUmOa1Xj-F9NtOvdRl3sFewZUxo26REySjxk0a7GmdMQ3IljtUia0qpd_0JLVymP_eSFFUC7sNgiq2838A=6CDF19D1
// console.log(recordingurl)
// //5c7d0e64d706436de8a9566b aj id
// const bodyData = `{
//   "fields": {
//     "assignee":{
//       "id": "63d92727db4f715c971f586e"
//     },
//     "project":
//     {
//       "key": "LEAR"
//     },
//     "summary": "shaam wali call recording test part 2",
//     "description": "testing with aj sir with exoappname as : ${appname} ",
//     "issuetype": {
//         "id": "10002"
//     }
//   }
// }`;
// app.get("/exocall-details", (req, res) => {
//   // Set the API key and token
//   const apiKey = "76679fbe9684813aef29f1266fa34c4058f412be422f64b8";
//   const apiToken = "f4d0421c70e5f386f2059e51dab0fdd3ef7a600f55ed7449";

//   //request options, including the Authorization header
//   const options = { 
//     method: 'GET',
//     url: 'https://76679fbe9684813aef29f1266fa34c4058f412be422f64b8:f4d0421c70e5f386f2059e51dab0fdd3ef7a600f55ed7449@ccm-api.exotel.com/v3/accounts/sheru1/calls/7396bd0ef4b4ce69b23f14f5af92173n',
//     headers: { 'content-type': 'application/json' } 
//   };
//   // request to the API endpoint
//   request(options, function (error, response, body) {
//     if (error) {
//       console.error(error);
//       res.status(500).send("an error occurred while making the request to the API endpoint.");
//     } else {
      
//       const responseBody=JSON.parse(body)
//       recordingurl= responseBody.response.call_details.recordings[0].url
//       appname=responseBody.response.call_details.app_name
//        //res.send(body)
//       console.log(recordingurl)
//     }
//   });
// });
// app.post('/create-jira-issue', (req, res) => { //sheruorg
//   fetch('https://trijraj.atlassian.net/rest/api/2/issue', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Basic ${Buffer.from(
//         `${myemail}:${apitoken}`
//       ).toString('base64')}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: bodyData
//   })
//     .then(response => {
//       console.log(
//         `Response: ${response.status} ${response.statusText}`
//       );
//       return response.text();
//     })
//     .then(text => {
//       console.log(text);
//       res.send(text);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

//   // const filePath = "assets/image.png";
//   // const form = new FormData();
//   // const stats = fs.statSync(filePath);
//   // const fileSizeInBytes = stats.size;
//   // const fileStream = fs.createReadStream(filePath);

//   // form.append('file', fileStream, { knownLength: fileSizeInBytes });
  

//   app.post('/upload-jira-attachment', (req, res) => {
//     const mp3Url = recordingurl;
    

// request.get(mp3Url, { encoding: null }, (error, response, body) => {
//   if (error) {
//     console.error(`Failed to download MP3 file: ${error}`);
//     res.status(500).send(error);
//   } else if (response.statusCode !== 200) {
//     console.error(`Failed to download MP3 file: ${response.statusMessage}`);
//     res.status(500).send(response.statusMessage);
//   } else {
//     const form = {
//       file: {
//         value: body,
//         options: {
//           filename: 'callrecording.mp3',
//           contentType: 'audio/mpeg'
//         }
//       }
//     };

//     request.post({
//       url: `https://trijraj.atlassian.net/rest/api/3/issue/LEAR-3/attachments/temporary`,
//       formData: form,
//       headers: {
//         Authorization: `Basic ${Buffer.from(`${myemail}:${apitoken}`).toString('base64')}`,
//         Accept: 'application/json',
//         'X-Atlassian-Token': 'no-check'
//       }
//     }, (error, response, body) => {
//       if (error) {
//         console.error(`Failed to upload file: ${error}`);
//         res.status(500).send(error);
//       } else if (response.statusCode !== 200) {
//         console.error(`Failed to upload file: ${response.statusMessage}`);
//         res.status(500).send(response.statusMessage);
//       } else {
//         const data = JSON.parse(body);
//         console.log(data);
//         //?doc thing add attachment to issue using data.temporaryAttachments[0].temporaryAttachmentId
//         res.send(data);
//       }
//     });
//   }
// });

//   })




// // app.listen(3000, () => {
// //   console.log('Server started on port 3000');
// // });
