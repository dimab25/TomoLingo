import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {

  // 9. Subscribe to the context and use the elements available
  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? (
        children
      ) : (
        <h2 className="pageLayout" style={{ textAlign: "center" }}>
          You have to login to view this information.
          <Link to={"/login"}>
         
          <h3 style={{marginTop:"20px"}}>Login here.</h3>
          
          </Link>

        </h2>
      )}
    </>
  );
}
export default ProtectedRoute;