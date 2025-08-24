
import React from 'react';

const EquationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-9-5.747h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9.049c.842-1.21 2.29-2.049 3.772-2.049s2.93.839 3.772 2.049M8.228 14.951c.842 1.21 2.29 2.049 3.772 2.049s2.93-.839 3.772-2.049" />
  </svg>
);

export default EquationIcon;
