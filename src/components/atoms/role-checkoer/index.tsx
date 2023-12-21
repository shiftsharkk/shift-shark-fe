import { Navigate, Outlet, useParams } from "react-router-dom";
import { USER_ROLES } from "../../../constants/roles";
import { TRole } from "../../../types/user";

const RoleChecker = () => {
  const { role } = useParams();

  if (role && !USER_ROLES.includes(role as TRole))
    return <Navigate to="/404" />;
  return <Outlet />;
};

export default RoleChecker;
