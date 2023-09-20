import React from 'react'
import IssueHeader from './IssueHeader'

function IssueList() {
  return (
    <div className="border border-gray-500 rounded-md text-center pb-80 pt-0 px-0  relative">
      <IssueHeader />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center mb-4">
          <div className="w-2 h-2 bg-black rounded-full"></div>
        </div>
        <p className="font-bold">There aren’t any open issues.</p>
      </div>
    </div>
  )
}

export default IssueList;
