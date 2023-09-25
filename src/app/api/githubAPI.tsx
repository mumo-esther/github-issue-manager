import axios, { AxiosRequestConfig } from "axios";

const GITHUB_TOKEN = "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";
const OWNER = "mumo-esther";
const REPO = "Js-best-practices";
const GITHUB_API_BASE_URL = "https://api.github.com";

export async function makeGitHubRequest(
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

    console.log('Response:', response.status, response.data);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.error(`GitHub request failed with status: ${response.status}`);
      throw new Error(`GitHub request failed with status: ${response.status}`);
    }
  } catch (error: any) {
    console.error(`Error making GitHub request for ${endpoint}:`, error);
    throw error;
  }
}


{/**Issues */ }
export async function fetchGitHubIssues() {
  return makeGitHubRequest("/issues", "GET");
}

export async function postNewIssue(issueData: any) {
  return makeGitHubRequest("/issues", "POST", issueData);
}

export async function fetchOpenIssues() {
  return makeGitHubRequest("/issues?state=open", "GET");
}

export async function fetchClosedIssues() {
  return makeGitHubRequest("/issues?state=closed", "GET");
}

export async function UpdateIssue(issueNumber: number, updatedData: any) {
  const response = await makeGitHubRequest(`/issues/${issueNumber}`, "PATCH", updatedData);
  return response;
}

export async function lockIssue(issueNumber: number) {
  return makeGitHubRequest(`/issues/${issueNumber}/lock`, "PUT");
}

export async function unlockIssue(issueNumber: number) {
  return makeGitHubRequest(`/issues/${issueNumber}/lock`, "DELETE");
}

{/**Comments */ }
export async function fetchIssueComments(issueNumber: number) {
  return makeGitHubRequest(`/issues/${issueNumber}/comments`, "GET");
}

export async function postNewComment(issueNumber: number, commentData: any) {
  return makeGitHubRequest(`/issues/${issueNumber}/comments`, "POST", commentData);
}

export async function UpdateComment(commentId: number, UpdatedComment: any) {
  return makeGitHubRequest(`/issues/comments/${commentId}`, "PATCH", UpdatedComment);
}

export async function DeleteComment(commentId: number) {
  return makeGitHubRequest(`/issues/comments/${commentId}`, "DELETE");
}


{/**Labels */ }
export async function fetchLabels() {
  return makeGitHubRequest("/labels", "GET");
}

export async function postNewLabel(LabelData: any) {
  return makeGitHubRequest("/labels", "POST", LabelData);
}

export async function UpdateLabel(name:string, updatedlabel:any) {
  return makeGitHubRequest(`/labels/${name}`, "PATCH", updatedlabel)
}

export async function deleteLabel(name:string) {
  return makeGitHubRequest(`/labels/${name}`, "DELETE")
}

export async function addLabel(issue_number:any) {
  return makeGitHubRequest(`/issues/${issue_number}/labels`, "POST");
}

export async function removeLabel(issue_number:any) {
  return makeGitHubRequest(`/issues/${issue_number}/labels`, "DELETE");
}


{/**Milestones */ }

export async function fetchMilestones() {
  return makeGitHubRequest("/milestones", "GET");
}

export async function postNewMilestone(milestoneData: any) {
  return makeGitHubRequest("/milestones", "POST", milestoneData);
}

export async function UpdateMilestone(milestoneNumber: number, UpdatedMilestone: any) {
  return makeGitHubRequest(`/milestones/${milestoneNumber}`, "PATCH", UpdatedMilestone);
}

export async function DeleteMilestone(milestoneNumber: number) {
  return makeGitHubRequest(`/milestones/${milestoneNumber}`, "DELETE");
}


{/**Assignees */ }
export async function fetchAssignees() {
  return makeGitHubRequest("/assignees", "GET");
}

export async function addAssignee(issue_number:any) {
  return makeGitHubRequest(`/issues/${issue_number}/assignees`, "POST");
}


export async function removeAssignee(issue_number:any) {
  return makeGitHubRequest(`/issues/${issue_number}/assignees`, "DELETE");
}
