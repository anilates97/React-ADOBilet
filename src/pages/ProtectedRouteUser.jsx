import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { getUserSession } from "../redux/dataSlice";

function ProtectedRouteUser({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.data);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    dispatch(getUserSession()).finally(() => {
      setIsChecking(false);
    });
  }, [dispatch]);

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#07090d]">
        <HashLoader size={90} color="#d9a85f" />
      </div>
    );
  }

  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRouteUser;
