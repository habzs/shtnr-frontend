import DashboardContainer from "@/containers/DashboardContainer";

const Dashboard = () => {
  return (
    <div className="divide-blue-bg mx-auto flex max-w-4xl flex-col gap-5 divide-y px-4 md:gap-10 md:px-8 lg:px-16">
      <DashboardContainer />
    </div>
  );
};

export default Dashboard;
