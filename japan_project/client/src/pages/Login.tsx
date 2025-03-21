import { ChangeEvent, FormEvent, useContext, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import DelayedLink from "../components/DelayedLink";



function Login() {
  const { user, errorMessage, handleSetErrorMessage} = useContext(AuthContext);
  const [loginCredentials, setLoginCredentials] = useState(null);
  //   const [newUser, setNewUser] = useState<User>();
  // const [user, setUser] = useState(null);

   const { login } = useContext(AuthContext);
  const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.name :>> ", e.target.name);
    console.log("e.target.value :>> ", e.target.value);

    setLoginCredentials({
      ...loginCredentials!,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
login (loginCredentials.email, loginCredentials.password);
handleSetErrorMessage("");
console.log('errorMessage :>> ', errorMessage);

     };
console.log('errorMessage :>> ', errorMessage);

  return (
    <>
    <div className="pageLayout">
      <h2>Login</h2>
      <div className="registerForm">
        <Form onSubmit={submitLogin}>
         
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleLoginInputChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
 <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              name="password"
              onChange={handleLoginInputChange}
            />
               {user? null:
              <Form.Text className="text-muted">
              The password has to be minimum 6 characters long!{" "}
            </Form.Text> }
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Button type="submit" variant="outline-primary">
              Login
            </Button>
            {/* {registerCompleted && registerCompleted === true ? (
              <h4>Registered completed</h4>
            ) : null} */}
          </Form.Group> 
         
          {errorMessage  === "Email does not exist in the database" || errorMessage === "Password not correct" ? (
            <div
              style={{
                background: "red",
                borderRadius: "20px",
                width: "max-content",
              }}
            >
              {"Your email and password do not match. Please try again."}{" "}
            </div>
          ) : null}
          {user ? (
            <>
              <p>You have successfully logged in.</p>
              <p>You will be redirected to the home display.</p>
            </>
          ) : (
            <Link to={"/register"}>No account yet? Please register here.</Link>
          )}
          {user && <DelayedLink />}
        </Form>
       
      </div>
      </div>
    </>
  );
}

export default Login;
