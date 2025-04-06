import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Imageupload, PostSuccessful, UpdatedMessage, User } from "../types/customTypes";
import { baseURL } from "../utilities/urls";



type ProfileData = {
  profile: User[]; 
  refresh: () => void;  
};

function UpdateProfile(profile: ProfileData) {
  
 const userInfo = profile?.profile;
  // console.log('userInfo :>> ', userInfo);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updatedMessage, setUpdatedMessage] = useState<UpdatedMessage|null>(null);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [targetLanguage, setTargetLanguage] = useState<string>("");
  const [targetLanguageLevel, setTargetLanguageLevel] = useState<string>("");
  const [about, setAbout] = useState<string>("");

  //   image update
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [uploadetImageUrl, setUploadetImageUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [postSuccesfull, setpostSuccesfull] = useState<PostSuccessful|"">("");

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("e.target.files", e.target.files);
    const file = e.target.files?.[0];

    if (file instanceof File) {
      setSelectedFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setErrorMessage("");
    }
  };
  if (imagePreviewUrl) {
    console.log("imagePreview :>> ", imagePreviewUrl);
  }
  if (selectedFile) {
    console.log("selectedFile :>> ", selectedFile);
  }

  const handleImageUpload = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions: RequestInit  = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        `${baseURL}/api/users/uploadImage`,
        requestOptions
      );

      const result = (await response.json()) as Imageupload;

      console.log("result :>> ", result);
      if (result.message === "image uploaded") {
        setUploadetImageUrl(result.imageUrl);
        setErrorMessage("Image ready to update.");
        setImagePreviewUrl(null);
        

      }
      if (result.error === "File not supported") {
        setErrorMessage(
          " Upload not possible. Only png jpg and jpeg are supported. Please choose a different file to upload."
        );
        
      }
    
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const submitImagePost = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
        const urlencoded = new URLSearchParams();
      if (uploadetImageUrl) {
      urlencoded.append("imageUrl", uploadetImageUrl);
    }
        const requestOptions : RequestInit  = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };
        const response = await fetch(
          `${baseURL}/api/users/update/image/user/${userInfo[0]._id}`,
          requestOptions
        );
        const result = await response.json();
        setpostSuccesfull(result);
        profile.refresh();
      } catch (error) {
        console.log(error);
        // console.error(error)
      }

   };


  console.log("postSuccesfull :>> ", postSuccesfull);
console.log('errorMessage :>> ', errorMessage);





  const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setName(e.target.value);
  };
  const handleOnChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setAge(e.target.value);
  };
  const handleOnChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setEmail(e.target.value);
  };
  const handleOnChangeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setLocation(e.target.value);
  };
  const handleOnChangeTargetLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setTargetLanguage(e.target.value);
  };
  const handleOnChangeLevel = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setTargetLanguageLevel(e.target.value);
  };
  const handleOnChangeAbout = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setAbout(e.target.value);
  };

  const updateAbout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (userInfo)
     { const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      if (about) {
        urlencoded.append("about", about);
      }
      const requestOptions: RequestInit  = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      const response = await fetch(
        `${baseURL}/api/users/update/about/user/${userInfo[0]._id}`,
        requestOptions
      );
      const result = await response.json();
      setUpdatedMessage(result);
      profile.refresh();
    }
    } catch (error) {
      console.log(error);
      // console.error(error)
    }
  };
  const updateTargetLanguageLevel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      if (targetLanguageLevel) {
        urlencoded.append("target_language_level", targetLanguageLevel);
      }
      const requestOptions : RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      const response = await fetch(
        `${baseURL}/api/users/update/level/user/${userInfo[0]._id}`,
        requestOptions
      );
      const result = await response.json();
      setUpdatedMessage(result);
      profile.refresh();
    } catch (error) {
      console.log(error);
      // console.error(error)
    }
  };
  const updateTargetLanguage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      if (targetLanguage) {
        urlencoded.append("target_language", targetLanguage);
      }
      const requestOptions : RequestInit  = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      const response = await fetch(
        `${baseURL}/api/users/update/targetlanguage/user/${userInfo[0]._id}`,
        requestOptions
      );
      const result = await response.json();
      setUpdatedMessage(result);
      profile.refresh();
    } catch (error) {
      console.log(error);
      // console.error(error)
    }
  };

  const updateLocation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      if (location) {
        urlencoded.append("location", location);
      }
      const requestOptions : RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      const response = await fetch(
        `${baseURL}/api/users/update/location/user/${userInfo[0]._id}`,
        requestOptions
      );
      const result = await response.json();
      setUpdatedMessage(result);
      profile.refresh();
    } catch (error) {
      console.log(error);
      // console.error(error)
    }
  };

  const updateEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      if (email) {
        urlencoded.append("email", email);
      }
      const requestOptions : RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      const response = await fetch(
        `${baseURL}/api/users/update/email/user/${userInfo[0]._id}`,
        requestOptions
      );
      const result = await response.json();
      setUpdatedMessage(result);
      profile.refresh();
    } catch (error) {
      console.log(error);
      // console.error(error)
    }
  };

  const updateName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      if (name) {
        urlencoded.append("name", name);
      }
      const requestOptions : RequestInit  = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      const response = await fetch(
        `${baseURL}/api/users/update/name/user/${userInfo[0]._id}`,
        requestOptions
      );
      const result = await response.json();
      setUpdatedMessage(result);
      profile.refresh();
    } catch (error) {
      console.log(error);
      // console.error(error)
    }
  };
  const updateAge = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      if (age) {
        urlencoded.append("age", age);
      }
      const requestOptions : RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      const response = await fetch(
        `${baseURL}/api/users/update/age/user/${userInfo[0]._id}`,
        requestOptions
      );
      const result = await response.json();
      setUpdatedMessage(result);
      profile.refresh();
    } catch (error) {
      console.log(error);
      // console.error(error)
    }
  };
  console.log("updatedMessage :>> ", updatedMessage);

  console.log("age :>> ", age);

  
  
  return (
    <>
      <Button variant="outline-primary"  onClick={handleShow}>
        Update Profile
      </Button>
      

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userInfo && (
            <>
              <div className="updateProfileDiv">
                <Form onSubmit={updateName}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={userInfo[0].name}
                      onChange={handleOnChangeName}
                    />
                  </Form.Group>
                  {name && <Button type="submit">Update</Button>}
                </Form>
              </div>
            </>
          )}
          {updatedMessage && updatedMessage.message === "Name updatet" ? (
            <div>Update succesfull!</div>
          ) : null}

          {userInfo && (
            <>
              <div className="updateProfileDiv">
                <Form onSubmit={updateAge}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={userInfo[0].age}
                      onChange={handleOnChangeAge}
                    />
                  </Form.Group>
                  {age && <Button type="submit">Update</Button>}
                </Form>
              </div>
            </>
          )}
          {updatedMessage && updatedMessage?.errormessage?.valueType!=="number" ?   <div>Age has to be a number!</div>:null }
          {updatedMessage && updatedMessage.message === "Age updatet" ? (
            <div>Update succesfull!</div>
          ) : null}


          {userInfo && (
            <>
              <div className="updateProfileDiv">
                <Form onSubmit={updateEmail}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={userInfo[0].email}
                      onChange={handleOnChangeEmail}
                    />
                  </Form.Group>
                  {email && <Button type="submit">Update</Button>}
                </Form>
              </div>
            </>
          )}
          {updatedMessage && updatedMessage.message === "Email updatet" ? (
            <div>Update succesfull!</div>
          ) : null}

          {userInfo && (
            <>
              <div className="updateProfileDiv">
                <Form onSubmit={updateLocation}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Location</Form.Label>
              <Form.Select
                required
                aria-label="Default select example"
                                     onChange={handleOnChangeLocation}
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





                  {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={userInfo[0]?.location}
                      onChange={handleOnChangeLocation}
                    />
                  </Form.Group> */}
                  {location && <Button type="submit">Update</Button>}
                </Form>
              </div>
            </>
          )}
          {updatedMessage && updatedMessage.message === "Location updatet" ? (
            <div>Update succesfull!</div>
          ) : null}

          {userInfo && (
            <>
              <div className="updateProfileDiv">
                <Form onSubmit={updateTargetLanguage}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Target Language</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleOnChangeTargetLanguage}
                    >
                      <option>Select</option>
                      <option value="German">German</option>
                      <option value="English">English</option>
                      <option value="Japanese">Japanese</option>
                    </Form.Select>
                  </Form.Group>
                  {targetLanguage && <Button type="submit">Update</Button>}
                </Form>
              </div>
            </>
          )}
          {updatedMessage &&
          updatedMessage.message === "Language target updatet" ? (
            <div>Update succesfull!</div>
          ) : null}

          {userInfo && (
            <>
              <div className="updateProfileDiv">
                <Form onSubmit={updateTargetLanguageLevel}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Language Level</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleOnChangeLevel}
                    >
                      <option>Select</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </Form.Select>
                  </Form.Group>
                  {targetLanguageLevel && <Button type="submit">Update</Button>}
                </Form>
              </div>
            </>
          )}
          {updatedMessage &&
          updatedMessage.message === "Language level updatet" ? (
            <div>Update succesfull!</div>
          ) : null}

          {userInfo && (
            <>
              <div className="updateProfileDiv">
                <Form onSubmit={updateAbout}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>About</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={userInfo[0]?.about}
                      onChange={handleOnChangeAbout}
                    />
                  </Form.Group>
                  {about && <Button type="submit">Update</Button>}
                </Form>
              </div>
            </>
          )}
          {updatedMessage && updatedMessage.message === "About into updatet" ? (
            <div>Update succesfull!</div>
          ) : null}

          {userInfo && (
            <>
              <div className="updateProfileDiv">
                <Form onSubmit={submitImagePost}>
                  <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleAttachFile}
                    />
                  </Form.Group>
                  
                  {errorMessage && <p>{errorMessage}</p>}
                  {imagePreviewUrl && (
                    <>
                      <img style={{ width: "200px" }} src={imagePreviewUrl} />
                      <Button onClick={handleImageUpload}>Upload</Button>
                    </>
                  )}
                  {postSuccesfull && postSuccesfull.message==="Profile image updatet" ? <div>Update succesfull!</div>: null}
                  {/* {selectedFile} */}
                  {errorMessage && errorMessage==="Image ready to update." ?   <Button type="submit">Update</Button> :null}
               
                </Form>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateProfile;
