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

export async function fetchOpenIssues(label: string | null, assignee: string | null, milestone: string | null) {
  let filterParams = '';

  if(label) filterParams += `&labels=${label}`;
  if(assignee) filterParams += `&assignee=${assignee}`;
  if(milestone) filterParams += `&milestone=${milestone}`;

  return makeGitHubRequest(`/issues?state=open${filterParams}`, "GET");
}

export async function fetchClosedIssues(label: string | null, assignee: string | null, milestone: string | null) {
  let filterParams = '';

  if(label) filterParams += `&labels=${label}`;
  if(assignee) filterParams += `&assignee=${assignee}`;
  if(milestone) filterParams += `&milestone=${milestone}`;

  return makeGitHubRequest(`/issues?state=closed${filterParams}`, "GET");
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

export async function addLabel(issue_number: number, labelNames: string[]) {
  const endpoint = `/issues/${issue_number}/labels`;
  const method = "POST";
  const data = labelNames;

  try {
    const result = await makeGitHubRequest(endpoint, method, data);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function removeLabel(issue_number: number, labelName: string) {
  const endpoint = `/issues/${issue_number}/labels/${encodeURIComponent(labelName)}`;
  const method = "DELETE";
  try {
    await makeGitHubRequest(endpoint, method);
    console.log(`Label "${labelName}" removed from the issue.`);
  } catch (error) {
    console.error(`Error removing label "${labelName}" from the issue:`, error);
    throw error;
  }
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

export async function addAssignees(issue_number: number, assigneeUsernames: string[]) {
  const endpoint = `/issues/${issue_number}/assignees`;
  const method = "POST";
  const data = {
    assignees: assigneeUsernames,
  };

  try {
    await makeGitHubRequest(endpoint, method, data);
    console.log(`Assignees added to the issue: ${assigneeUsernames.join(', ')}`);
  } catch (error) {
    console.error('Error adding assignees:', error);
    throw error;
  }
}


export async function removeAssignee(issue_number: any, assignees: string[]) {
  const endpoint = `/issues/${issue_number}/assignees`;
  const method = "DELETE";
  const data = {
    assignees: assignees,
  };

  try {
    await makeGitHubRequest(endpoint, method, data);
    console.log(`Assignees removed from the issue.`);
  } catch (error) {
    console.error('Error removing assignees from the issue:', error);
    throw error;
  }
}

