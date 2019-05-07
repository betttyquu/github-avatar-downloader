var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');

// const access_token = process.env.GITHUB_TOKEN;

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'Authorization': token.GITHUB_TOKEN,
        'User-Agent': 'request'
      }
    };
    request(options, function(err, res, body) {
    var repos = JSON.parse(body);
    repos.forEach(function(repo) {
        console.log(repo.avatar_url);
        downloadImageByURL(repo.avatar_url,"avatars/"+repo.login+".jpg");
      });
      cb(err, body);
    });
    function downloadImageByURL(url, filePath) {
        request.get(url)
        .on('error',function(err){
            console.log("There was an error downloading ",err);
        })
        .pipe(fs.createWriteStream(filePath));
    }
  }

getRepoContributors("jquery", "jquery", function(err, result) {
// console.log("Errors:", err);
// console.log("Result:", result);
});