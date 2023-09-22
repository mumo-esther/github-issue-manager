import axios from "axios";

const GITHUB_TOKEN = "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";
const OWNER = "mumo-esther";
const REPO = "Js-best-practices"
const GITHUB_API_BASE_URL = "https://api.github.com/repos/${OWNER}/${REPO}";

export async function fetchGitHubIssues() {

  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/issues`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }


    return response.data;
  } catch (error: any) {
    console.error("Error fetching GitHub issues:", error);
    throw error;
  }
}

export async function postNewIssue(issueData: any) {

  try {
    const response = await axios.post(
      `${GITHUB_API_BASE_URL}/issues`,
      {
        title: issueData.title,
        body: issueData.body,
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (response.status !== 201) {
      throw new Error(`Failed to create new issue: ${response.statusText}`);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(`Error creating new issue: ${error.message}`);
  }
}

export async function fetchIssueComments(commentId: any) {

  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/repos/${OWNER}/${REPO}/issuescomments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }


    return response.data;
  } catch (error: any) {
    console.error("Error fetching GitHub issues:", error);
    throw error;
  }
}

export async function fetchLabels() {

  try {
    const response = await axios.get(
      `https://api.github.com/repos/mumo-esther/Js-best-practices/labels`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }


    return response.data;
  } catch (error: any) {
    console.error("Error fetching labels:", error);
    throw error;
  }
}

export async function fetchMilestones() {

  try {
    const response = await axios.get(
      `https://api.github.com/repos/mumo-esther/Js-best-practices/milestones`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }


    return response.data;
  } catch (error: any) {
    console.error("Error fetching milestones:", error);
    throw error;
  }
}

export async function fetchAssignees() {

  try {
    const response = await axios.get(
      `https://api.github.com/repos/mumo-esther/Js-best-practices/assignees`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }


    return response.data;
  } catch (error: any) {
    console.error("Error fetching Asignees:", error);
    throw error;
  }
}
