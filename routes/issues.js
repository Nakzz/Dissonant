var express = require('express');
var router = express.Router();
var pdfjsLib = require('pdfjs-dist');

var issuesObject = require('../issuesContext.js')
//Issue
// issuesObject = {
//   "1" : {
//       "id": "1",
//       "title": "Where are you from?",
//       "publishedDate" : "07/10/2019",
//       "filename": "/issues/WAYF.pdf",
//       "previewImage" : "/images/issues/test.jpg"
//   },
//     "2": {
//         "id": "2",
//         "title": "Issue 2",
//         "publishedDate": "07/10/2019",
//         "filename": "/test.pdf",
//         "previewImage": "/images/issues/test.jpg"
//     }
// }



/* GET Issues page rendering */
router.get('/', function (req, res, next) {

    let issueId = (req.query.id);

console.log(issueId, typeof(issueId))

let currentIssue = issuesObject[issueId];

    if (currentIssue) {
        // res.render('issuesViewer', {
        //     title: 'Issues',
        //     issueTitle: currentIssue["title"]
        // });
                res.render('viewer', {
                    title: 'Issues',
                    issueTitle: currentIssue["title"],
                    issueFilename: currentIssue["filename"]
                });
    } else {
                   res.render('issues', {
                       title: 'Issues',
                       issueTitle: "",
                       issuesObject : issuesObject
                   });
    }


});


module.exports = router;
