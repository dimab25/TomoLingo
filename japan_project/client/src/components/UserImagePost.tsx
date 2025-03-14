import { ChangeEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Imageupload } from "../types/customTypes";

function UserImagePost() {
  const [show, setShow] = useState(false);
  // Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [uploadetImageUrl, setUploadetImageUrl] = useState("");
  const [imageText, setImageText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [postSuccesfull, setpostSuccesfull] = useState("second");

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setImageText(e.target.value);
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
      //   setNewUser({ ...newUser!, imgUrl: result.imgUrl });
      console.log("result :>> ", result);
      if (result.message === "image uploaded") {
        setUploadetImageUrl(result.imageUrl);
        setErrorMessage("Image ready to upload. Please add a discription");
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
  console.log(" uploadetImageUrl:>> ", uploadetImageUrl);
  console.log("imageText :>> ", imageText);
  console.log("errorMessage :>> ", errorMessage);

  const submitImagePost = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    if (uploadetImageUrl) {
      urlencoded.append("imageUrl", uploadetImageUrl);
    }
    if (imageText) {
      urlencoded.append("text", imageText);
    }
    urlencoded.append("user_id", "67cffb39e6571e713867c437");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:4000/api/users/image/post/", requestOptions)
      .then((response) => response.json())
      .then((result) => setpostSuccesfull(result))
      .catch((error) => console.error(error));
  };
  console.log("postSuccesfull :>> ", postSuccesfull);

  return (
    <>
     
      <Button variant="outline-primary" onClick={handleShow}>
        Add+
      </Button>
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitImagePost}>
            <Form.Control
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleAttachFile}
            />

            <Button onClick={handleImageUpload}>Upload image</Button>
            {errorMessage && <p>{errorMessage}</p>}

            {imagePreviewUrl && (
              <img style={{ width: "200px" }} src={imagePreviewUrl} />
            )}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <Form.Label>Name</Form.Label> */}
              {uploadetImageUrl!==""?  <Form.Control
                type="text"
                placeholder="Add discription"
                onChange={handleInputChange}
              />: null}
            
            </Form.Group>
            {imageText!=="" && uploadetImageUrl!=="" ?  <Button type="submit" variant="outline-primary">
              Upload
            </Button>: null}
           

            {postSuccesfull.message === "Comment sent" ? (
              <p>Post was succesfull.</p>
            ) : null}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {" "}
          <Button variant="outline-primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserImagePost;
