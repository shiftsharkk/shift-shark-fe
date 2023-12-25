import { Navigate, useParams } from 'react-router-dom';

const Dashboard = () => {
  const { role } = useParams();

  return <Navigate to={`/${role}/coming-soon`} />;
};

export default Dashboard;
