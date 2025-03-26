import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Imageupload, User } from "../types/customTypes";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function TestRegister() {
  const { register, setImageUploaded, imageUploaded } = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<User>();
  const [registerCompleted, setRegisterCompleted] = useState(false);

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const file = e.target.files?.[0];
    console.log("file :>> ", file);
    if (file instanceof File) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/uploadImage",
        requestOptions
      );

      const result = (await response.json()) as Imageupload;
      setNewUser({ ...newUser!, imgUrl: result.imgUrl });
      console.log("result :>> ", result);
      if (result.message === "image uploaded") {
        setImageUploaded(result.imageUrl);
        console.log(" imageUploaded:>> ", imageUploaded);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleRegisterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.name :>> ", e.target.name);
    console.log("e.target.value :>> ", e.target.value);
    setNewUser({ ...newUser!, [e.target.name]: e.target.value });
  };

  const submitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("newUser :>> ", newUser);
    //input validation, talked with raul
    // registerFormValidation() ------- but in all the values and set it to true or false, based on that decide to do register function or not
    register(newUser);
  };

  return (
    <>
      <h2>Register</h2>
      <div className="registerForm">
        <Form onSubmit={submitRegister}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="User Name"
              name="name"
              onChange={handleRegisterInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Password"
              name="password"
              onChange={handleRegisterInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleRegisterInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Age"
              name="age"
              onChange={handleRegisterInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>About you</Form.Label>
            <Form.Control
              type="text"
              placeholder="About"
              name="about"
              onChange={handleRegisterInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Native language</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleRegisterInputChange}
              name="native_language"
            >
              <option>Select a native language</option>
              <option value="German">German</option>
              <option value="English">English</option>
              <option value="Japanese">Japanese</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Target language</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleRegisterInputChange}
              name="target_language"
            >
              <option>Select a target language</option>
              <option value="German">German</option>
              <option value="English">English</option>
              <option value="Japanese">Japanese</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Language Level</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleRegisterInputChange}
              name="target_language_level"
            >
              <option>How is your level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Form.Select>
          </Form.Group>{" "}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Location</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleRegisterInputChange}
              name="location"
            >
              <option>In which area do you live?</option>
              <option value="Wedding">Wedding</option>
              <option value="Neuköln">Neuköln</option>
              <option value="Friedrichshain">Friedrichshain</option>
              <option value="Others">Others</option>
            </Form.Select>
          </Form.Group>{" "}
          <Form.Control
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleAttachFile}
          />
          <Button className="uploadImage" onClick={handleImageUpload}>Upload image</Button>
          {imagePreview && imageUploaded && (
            <img style={{ width: "200px" }} src={imagePreview} />
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Button type="submit" variant="outline-primary">
              Register
            </Button>
            {registerCompleted && registerCompleted === true ? (
              <h4>Registered completed</h4>
            ) : null}
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default TestRegister;
