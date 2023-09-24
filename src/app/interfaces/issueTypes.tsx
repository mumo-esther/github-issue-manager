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
    issues: Issue[];
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

  export interface Assignee {
    id: number;
    login: string;
  }

 export interface Label {
    id: number;
    name: string;
  }
  
  export interface Milestone {
    id: number;
    title: string;
  }

  export interface FilterContextType {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    selectedMilestone: string;
    setSelectedMilestone: React.Dispatch<React.SetStateAction<string>>;
    selectedLabel: string;
    setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
    selectedAssignee: string;
    setSelectedAssignee: React.Dispatch<React.SetStateAction<string>>;
  }

  export interface Milestone {
    id: number;
    title: string;
    updated_at: Date;
    user: User;
    number: number;
    comments: string;
    state: string;
    description: string;
    closed_issues: number;
    open_issues: number;
  }

  export interface Label {
    id: number;
    name: string;
    color: string,
    description: string;
    default: boolean;
  }