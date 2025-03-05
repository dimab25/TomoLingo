import { ChangeEvent, FormEvent, useState } from "react";

import { Button, Form } from "react-bootstrap";

function Login() {
  const [loginCredentials, setLoginCredentials] = useState(null);
  //   const [newUser, setNewUser] = useState<User>();
  const [user, setUser] = useState(null);

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

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();

    // have still to add input validation and create type for register form user
    if (loginCredentials) {
      urlencoded.append("email", loginCredentials?.email);
      urlencoded.append("password", loginCredentials?.password);
    } else {
      console.log("no empty forms allowed");
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(
        "http://localhost:4000/api/users/login",
        requestOptions
      );
      const result = await response.json();

      console.log("result :>> ", result);
      if (!result.token) {
        //do something about it
        console.log("user token does not exist");
      }
      if (result.token) {
        // storing the user token in the browser
        localStorage.setItem("token", result.token);
      }
      setUser(result.user);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <div className="registerForm">
        <Form onSubmit={submitLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              name="password"
              onChange={handleLoginInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleLoginInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Button type="submit" variant="outline-primary">
              Login
            </Button>
            {/* {registerCompleted && registerCompleted === true ? (
              <h4>Registered completed</h4>
            ) : null} */}
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default Login;
