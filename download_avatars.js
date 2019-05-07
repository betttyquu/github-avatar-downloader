var request = require('request');
var token = require('./secrets.js');

const access_token = process.env.GITHUB_TOKEN;

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
      });
      cb(err, body);
    });
  }

getRepoContributors("jquery", "jquery", function(err, result) {
// console.log("Errors:", err);
// console.log("Result:", result);
});