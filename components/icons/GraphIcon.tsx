
import React from 'react';

const GraphIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-8-5v5m-4-2v2m12-7v7m-4-4v4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4v16" />
  </svg>
);

export default GraphIcon;
