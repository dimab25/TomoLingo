import { ChangeEvent, FormEvent, useState } from "react";
import { Imageupload, User } from "../types/customTypes";
import { Button, Form } from "react-bootstrap";
// import { ImGift } from "react-icons/im";

function Register() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState<string|null>(null)
  const [newUser, setNewUser] = useState<User>();
  const [registerCompleted, setRegisterCompleted] = useState(false);
  const [imageUploaded, setImageUploaded] = useState<string|null>(null);


  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const file = e.target.files?.[0];
    console.log("file :>> ", file);
    if (file instanceof File) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file))
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
      if (result.message==="image uploaded"){
        setImageUploaded(result.imageUrl)
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

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();

    // have still to add input validation and create type for register form user

    urlencoded.append("name", newUser?.name);
    urlencoded.append("email", newUser?.email);
    urlencoded.append("password", newUser?.password);
    urlencoded.append("age", newUser?.age);
    urlencoded.append("about", newUser?.about);
    urlencoded.append("native_language", newUser?.native_language);
    urlencoded.append("target_language_level", newUser?.target_language_level);
    urlencoded.append("target_language", newUser?.target_language);
    urlencoded.append("imageUrl", imageUploaded);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:4000/api/users/register",
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> ", result.message);
      if (result.message == "User registration succesfull") {
        setRegisterCompleted(true);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  console.log(' imageUploaded:>> ', imageUploaded );
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
          </Form.Group>    <Form.Control
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleAttachFile}
          />
          <Button onClick={handleImageUpload} >Upload image</Button>
          {imagePreview && imageUploaded && <img style={{width:"200px"}} src={imagePreview}/>}
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Button type="submit" variant="outline-primary">
            Register
          </Button>
          {registerCompleted && registerCompleted === true ? (
            <h4>Registered completed</h4>
          ) : null}</Form.Group>
        </Form>
      </div>
      
    </>
  );
}

export default Register;
