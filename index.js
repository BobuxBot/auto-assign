const core = require("@actions/core");
const github = require("@actions/github");

const octokit = github.getOctokit(core.getInput("GITHUB_TOKEN"));

const defaultParams = {
    owner: github.context.repo.owner,
    repo: github.context.repo.repo
};

async function main() {
    await octokit.request("POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers", {
        ...defaultParams,
        pull_number: github.context.payload.pull_request.number,
        team_reviewers: [core.getInput("TEAM")]
    });
}

main();
