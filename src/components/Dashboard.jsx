import React from "react";
import Topbar from "./Topbar";
import DashboardContent from "./DashboardContent";

const Dashboard = () => {
  return (
    <>
      <div className="flex-grow h-screen">
        <div className="dashboard-container ml-36 pt-7 pr-7 pl-2 h-full flex flex-col">
          <Topbar />
          <DashboardContent />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
