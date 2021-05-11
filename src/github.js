const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput("token");
console.log(token);
const octokit = github.getOctokit(token);

function getCurrentIssueNumber() {
	return github.context.issue.number;
}

async function getIssue(number) {
	console.log("Details:");
	console.log(github.context.repo.owner);
	console.log(github.context.repo.name);
	return await octokit.rest.issues.get({
		owner: github.context.repo.owner,
		repo: github.context.repo.name,
		issue_number: number,
	}).catch(error => {
		console.log(`Failed to get issue #${number}`);
		core.setFailed(error);
	});
}

async function writeComment(issueNumber, text) {
	await octokit.rest.issues.createComment({
		owner: github.context.repo.owner,
		repo: github.context.repo.name,
		issue_number: number,
		body: text,
	});
}

async function applyLabel(issueNumber, label) {
	await octokit.rest.issues.addLabels({
		owner: github.context.repo.owner,
		repo: github.context.repo.name,
		issue_number: issueNumber,
		labels: label
  });
}

async function removeLabel(issueNumber, label) {
	await octokit.rest.issues.addLabels({
		owner: github.context.repo.owner,
		repo: github.context.repo.name,
		issue_number: issueNumber,
		name: label
  });
}

module.exports = {
	getCurrentIssueNumber,
	getIssue,
	writeComment,
	applyLabel,
	removeLabel,
}
