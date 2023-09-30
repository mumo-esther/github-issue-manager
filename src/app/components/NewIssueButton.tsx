import React from "react";
import Link  from "next/link";

function NewIssueButton() {
  return (
   <Link href='/NewIssue'>
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ml-3">
   New Issue
 </button> 
   </Link>
     
  );
}

export default NewIssueButton;
