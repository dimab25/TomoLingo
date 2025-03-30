import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Imageupload, User } from "../types/customTypes";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { register, setImageUploaded, imageUploaded,  submitRegisterMessage } = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<User>({} as User);
  
  const [validated, setValidated] = useState(false);

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const file = e.target.files?.[0];
    console.log("file :>> ", file);
    if (file instanceof File) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const formdata = new FormData();
    if (selectedFile)
  {  formdata.append("image", selectedFile)};

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
      console.log("result :>> ", result);
      setNewUser({ ...newUser!, imageUrl: result.imageUrl });
     
      if (result.message === "image uploaded") {
        setImageUploaded(result.imageUrl);
        console.log(" imageUploaded:>> ", imageUploaded);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleRegisterInputChange = (e: ChangeEvent<any>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    console.log("e.target.name :>> ", e.target.name);
    console.log("e.target.value :>> ", e.target.value);
    setNewUser({ ...newUser!, [target.name]: target.value });
  };

  const submitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    console.log("newUser :>> ", newUser);
  
    if(newUser)
    {register(newUser)};
  };

  console.log("selectedFile :>> ", selectedFile);
  console.log('imagePreview :>> ', imagePreview);
  console.log('imageUploaded :>> ', imageUploaded);
  console.log('submitRegisterMessage :>> ', submitRegisterMessage);
  // console.log(' registerCompleted:>> ', registerCompleted);
  return (
    <>
      <div className="pageLayout">
        <h2 className="headline">Register</h2>
        <div className="registerForm">
          <Form onSubmit={submitRegister}  validated={validated}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name*</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="User Name"
                name="name"
                onChange={handleRegisterInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password*</Form.Label>
              <Form.Control
                required
                minLength={5}
                type="text"
                placeholder="Minimum 5 characters"
                name="password"
                onChange={handleRegisterInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address*</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleRegisterInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Age*</Form.Label>
              <Form.Control
              required
                type="number"
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
              <Form.Label>Native language*</Form.Label>
              <Form.Select
                required
                aria-label="Default select example"
                onChange={handleRegisterInputChange}
                name="native_language"
              >
                <option disabled selected value={""}>
                  Select a native language
                </option>
                <option value="German">German</option>
                <option value="English">English</option>
                <option value="Japanese">Japanese</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Target language*</Form.Label>
              <Form.Select
                required
                aria-label="Default select example"
                onChange={handleRegisterInputChange}
                name="target_language"
              >
                <option disabled selected value={""}>
                  Select a target language
                </option>
                <option value="German">German</option>
                <option value="English">English</option>
                <option value="Japanese">Japanese</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Language Level*</Form.Label>
              <Form.Select
                required
                aria-label="Default select example"
                onChange={handleRegisterInputChange}
                name="target_language_level"
              >
                <option disabled selected value={""}>
                  Select your language level
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Form.Select>
            </Form.Group>{" "}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Location*</Form.Label>
              <Form.Select
                required
                aria-label="Default select example"
                onChange={handleRegisterInputChange}
                name="location"
              >
                <option disabled selected value={""}>
                  In which area do you live?
                </option>
                <option value="Charlottenburg">Charlottenburg</option>
                <option value="Friedrichshain">Friedrichshain</option>
                <option value="Kreuzberg">Kreuzberg</option>
                <option value="Lichtenberg">Lichtenberg</option>
                <option value="Mitte">Mitte</option>
                <option value="Neukölln">Neukölln</option>
                <option value="Pankow">Pankow</option>
                <option value="Schöneberg">Schöneberg</option>
                <option value="Spandau">Spandau</option>
                <option value="Zehlendorf">Zehlendorf</option>

                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>{" "}
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleAttachFile}
            />
            {selectedFile && !imageUploaded  &&   <Button onClick={handleImageUpload}>Upload image</Button>}
          


            {imagePreview && imageUploaded && (
              <img style={{ width: "200px" }} src={imagePreview} />
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
            
              <div className="validationMessage">
              {submitRegisterMessage && submitRegisterMessage === "Email already exist in db" ? (
                <h5>Email adress already exist. Please choose another one or try to login.</h5>
              ) : null}
              {submitRegisterMessage && submitRegisterMessage === "User registration succesfull" ? (
                <h5>Registration succesfull.</h5>
              ) : null}
 {submitRegisterMessage && submitRegisterMessage === "Password must be at least 5 characters long" ? (
                <h5>Password must be at least 5 characters long.</h5>
              ) : null}
               {submitRegisterMessage && submitRegisterMessage === "Age must be a number" ? (
                <h5>Age has to be a number.</h5>
              ) : null}</div>

{ !selectedFile && <Button type="submit" variant="outline-primary" className="registerbutton">
                Register
              </Button>}
              {imageUploaded && <Button type="submit" variant="outline-primary" className="registerbutton">
                Register
              </Button> }
              <p>*required</p>


            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Register;
