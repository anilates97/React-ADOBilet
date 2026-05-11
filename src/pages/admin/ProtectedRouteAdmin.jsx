import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getUserSession, getUserSessionDatabase } from "../../redux/dataSlice";

function ProtectedRouteAdmin({ children }) {
  const { user, userData } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);

  useEffect(() => {
    dispatch(getUserSession()).finally(() => {
      setIsCheckingSession(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setIsCheckingProfile(true);
      dispatch(getUserSessionDatabase(user.id)).finally(() => {
        setIsCheckingProfile(false);
      });
    }
  }, [dispatch, user]);

  if (isCheckingSession || isCheckingProfile) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#07090d]">
        <HashLoader size={90} color="#d9a85f" />
      </div>
    );
  }

  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/login" replace />;
  }

  if (userData?.authenticated_role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRouteAdmin;
