var express = require('express');
var router = express.Router();
var pdfjsLib = require('pdfjs-dist');

//Issue
issuesObject = {
  "1" : {
      "id": "1",
      "title": "Where are you from?",
      "publishedDate" : "07/10/2019",
      "filename" : "test.pdf",
      "previewImage" : "/images/issues/test.png"
  },
    "2": {
        "id": "2",
        "title": "Issue 2",
        "publishedDate": "07/10/2019",
        "filename": "test.pdf",
        "previewImage": "/images/issues/test.png"
    }
}

// Loading file from file system into typed array
var pdfPath = process.argv[2] || '/web/compressed.tracemonkey-pldi-09.pdf';

// Will be using promises to load document, pages and misc data instead of
// callback.
var loadingTask = pdfjsLib.getDocument(pdfPath);
loadingTask.promise.then(function (doc) {
    var numPages = doc.numPages;
    console.log('# Document Loaded');
    console.log('Number of Pages: ' + numPages);
    console.log();

    var lastPromise; // will be used to chain promises
    lastPromise = doc.getMetadata().then(function (data) {
        console.log('# Metadata Is Loaded');
        console.log('## Info');
        console.log(JSON.stringify(data.info, null, 2));
        console.log();
        if (data.metadata) {
            console.log('## Metadata');
            console.log(JSON.stringify(data.metadata.getAll(), null, 2));
            console.log();
        }
    });

    var loadPage = function (pageNum) {
        return doc.getPage(pageNum).then(function (page) {
            console.log('# Page ' + pageNum);
            var viewport = page.getViewport({
                scale: 1.0,
            });
            console.log('Size: ' + viewport.width + 'x' + viewport.height);
            console.log();
            return page.getTextContent().then(function (content) {
                // Content contains lots of information about the text layout and
                // styles, but we need only strings at the moment
                var strings = content.items.map(function (item) {
                    return item.str;
                });
                console.log('## Text Content');
                console.log(strings.join(' '));
            }).then(function () {
                console.log();
            });
        });
    };
    // Loading of the first page will wait on metadata and subsequent loadings
    // will wait on the previous pages.
    for (var i = 1; i <= numPages; i++) {
        lastPromise = lastPromise.then(loadPage.bind(null, i));
    }
    return lastPromise;
}).then(function () {
    console.log('# End of Document');
}, function (err) {
    console.error('Error: ' + err);
});

/* GET Issues page rendering */
router.get('/', function (req, res, next) {

    let issueId = (req.query.id);

console.log(issueId, typeof(issueId))

let currentIssue = issuesObject[issueId];

    if (currentIssue) {
        res.render('issuesViewer', {
            title: 'Issues',
            issueTitle: currentIssue["title"]
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
