var request = require('request');
var token = require('./secrets.js'); //importing github token from secrets.js 
var fs = require('fs');
var name = process.argv[3];  // return repoName in command argument argv[3]
var owner = process.argv[2]; 

console.log('Welcome to the GitHub Avatar Downloader!!!');

function getRepoContributors(repoOwner, repoName, cb) {
	if (repoName === undefined || repoOwner === undefined) { //if no input for name/owner
		console.log('Please check input'); 
		return; //stop executing the func 
	}


	var options = {
		url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
		headers: {
			'Authorization': token.GITHUB_TOKEN, //access secrets.js file to require github token
			'User-Agent': 'request'
		}
	};

	request(options, function(err, res, body) {
		var repos = JSON.parse(body); // see JSON object of body
		repos.forEach(function(repo) {
			console.log(repo.avatar_url);
			downloadImageByURL(repo.avatar_url, "avatars/" + repo.login + ".jpg");
		}); // function downloadimagebyURL called
		cb(err, body); //invoking this cb when calls getrepocontributors
	});

	function downloadImageByURL(url, filePath) {
		request.get(url)
			.on('error', function(err) {
				console.log("There was an error downloading ", err);
			})
			.pipe(fs.createWriteStream(filePath)); //download file into filepath
	}


}

getRepoContributors(owner, name, function(err, result) {
	console.log("Errors:", err);
	console.log("Result:", result);
});