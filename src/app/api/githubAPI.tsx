import axios, { AxiosRequestConfig } from "axios";

const GITHUB_TOKEN = "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";
const OWNER = "mumo-esther";
const REPO = "Js-best-practices";
const GITHUB_API_BASE_URL = "https://api.github.com";

async function makeGitHubRequest(
  endpoint: string,
  method: AxiosRequestConfig["method"],
  data?: any
) {
  const url = `${GITHUB_API_BASE_URL}/repos/${OWNER}/${REPO}${endpoint}`;
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    if (response.status !== 200) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    return response.data;
  } catch (error: any) {
    console.error(`Error fetching GitHub data for ${endpoint}:`, error);
    throw error;
  }
}

export async function fetchGitHubIssues() {
  return makeGitHubRequest("/issues", "GET");
}

export async function postNewIssue(issueData: any) {
  return makeGitHubRequest("/issues", "POST", issueData);
}

export async function fetchIssueComments(commentId: any) {
  return makeGitHubRequest(`/issues/comments/${commentId}`, "GET");
}

export async function fetchLabels() {
  return makeGitHubRequest("/labels", "GET");
}

export async function fetchMilestones() {
  return makeGitHubRequest("/milestones", "GET");
}

export async function fetchAssignees() {
  return makeGitHubRequest("/assignees", "GET");
}

export async function fetchOpenIssues() {
  return makeGitHubRequest("/issues?state=open", "GET");
}

export async function fetchClosedIssues() {
  return makeGitHubRequest("/issues?state=closed", "GET");
}

export async function postNewMilestone(milestoneData: any) {
  return makeGitHubRequest("/milestones", "POST", milestoneData);
}

export async function postNewLabel(LabelData: any) {
  return makeGitHubRequest("/labels", "POST", LabelData);
}
