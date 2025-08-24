import React from 'react';
import { Link } from 'react-router-dom';

interface ActivityCardProps {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ to, title, description, icon, color }) => {
  return (
    <Link to={to} className="group block">
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out h-full flex flex-col">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mt-4 text-slate-800 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
        <p className="text-slate-500 mt-2 flex-grow">{description}</p>
        <div className="mt-4 text-blue-500 font-semibold group-hover:translate-x-1 transition-transform duration-300">
          활동 시작하기 →
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;