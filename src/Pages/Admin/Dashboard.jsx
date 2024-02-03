import React from "react";
import Left from '../../Container/Admin/left/Left'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="border border-red-200 col-span-2 h-screen bg-blue-600">
        <Left/>
      </div>
      <div className="col-span-10 border border-blue-200">right</div>
    </div>
  );
};

export default Dashboard;
