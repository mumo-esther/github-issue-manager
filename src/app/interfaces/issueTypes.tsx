export interface Issue {
    id: number;
    title: string;
    created_at: Date;
    user: User;
    number: number;
    comments: string;
    state: string;
    body: string;
  }
  
  interface User {
    login: string;
    avatar_url: string;
  }
  
 export interface IssueDetailsProps {
    issue: Issue;
    onClose: () => void;
    issueNumber: number | null;
  }

  export interface IssueListProps {
    filter: string; 
  }

  export interface SearchBarProps {
    onSearch: (query: string) => void;
  }

 export  interface IssueHeaderProps {
    onFilterChange: (filter: string) => void;
  }

  export interface NavbarProps {
    onFilterChange: (filter: string) => void;
    onSearch: (query: string) => void;
  }

  export interface Comment {
    commentId : number
  }
