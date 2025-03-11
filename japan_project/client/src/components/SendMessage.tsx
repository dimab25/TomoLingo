import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function SendMessage() {
      const [message, setMessage] = useState(null)
      const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
          console.log("e.target.name :>> ", e.target.name);
          console.log("e.target.value :>> ", e.target.value);
          setMessage({ ...message!, [e.target.name]: e.target.value })
      }

    const handlePostMessage = (e) => {
        e.preventDefault();
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("from_id", "67cabc5f1f34a765f741f3ce");
      urlencoded.append("to_id", "67bf21ebc254a865cd3a7e24");
      urlencoded.append("message", "hallo");
      urlencoded.append("from_name", "dim");
      urlencoded.append("to_name", "sim");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch("http://localhost:4000/api/messages/all/message", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    };

  return (
    <>
      <Form 
      onSubmit={handlePostMessage}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Message"
            name="message"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>From</Form.Label>
          <Form.Control
            type="text"
            placeholder="from"
            name="from_id"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>to_id</Form.Label>
          <Form.Control
            type="text"
            placeholder="to_id"
            name="to_id"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>from_name</Form.Label>
          <Form.Control
            type="text"
            placeholder="from_name"
            name="from_name"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>to_name</Form.Label>
          <Form.Control
            type="text"
            placeholder="to_name"
            name="to_name"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button type="submit">Send</Button>
      </Form>
    </>
  );
}

export default SendMessage;
