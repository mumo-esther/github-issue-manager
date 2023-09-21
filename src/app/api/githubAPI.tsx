import axios from 'axios';


const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = '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';

export async function fetchGitHubIssues() {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/repos/mumo-esther/Js-best-practices/issues`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error: any) {
    console.error('Error fetching GitHub issues:', error);
    throw error;
  }
}

async function postNewIssue(issueData: any) {
  try {
    const formData = new FormData();

    formData.append('title', issueData.title);
    formData.append('body', issueData.body);
       console.log(FormData)
    const response = await axios.post(`${GITHUB_API_BASE_URL}/repos/mumo-esther/Js-best-practices/issues`, {
      title: "some data",
      body: "some body"
      }, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (response.status !== 201) {
      throw new Error(`Failed to create new issue: ${response.statusText}`);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(`Error creating new issue: ${error.message}`);
  }
}

export default postNewIssue;
