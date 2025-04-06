import { ChangeEvent, useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PostSuccessful } from "../types/customTypes";
import { AuthContext } from "../context/AuthContext";
import { baseURL } from "../utilities/urls";

function UserImagePost({refresh }:{refresh: () => void}) {
  const { user } = useContext(AuthContext);
console.log('refresh :>> ', refresh);
  const [show, setShow] = useState(false);
  // Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [uploadetImageUrl, setUploadetImageUrl] = useState("");
  const [imageText, setImageText] = useState("");
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setImageText(e.target.value);
  };

  const handleImageUpload = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        `${baseURL}/api/users/uploadImage`,
        requestOptions
      );

      const result = (await response.json()) as PostSuccessful;
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

  const submitImagePost = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      if (uploadetImageUrl) {
        urlencoded.append("imageUrl", uploadetImageUrl);
      }
      if (imageText) {
        urlencoded.append("text", imageText);
      }
      if (user) {
        urlencoded.append("user_id", user?._id);
      }

      const requestOptions : RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      const response = await fetch(
        `${baseURL}/api/users/image/post/`,
        requestOptions
      );
      const result = await response.json();
      setpostSuccesfull(result);
     
      refresh();
    } catch (error) {
      console.log(error);
    }
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

            <Button className="uploadImage"  onClick={handleImageUpload}>Upload image</Button>
            {errorMessage && <p>{errorMessage}</p>}

            {imagePreviewUrl && (
              <img style={{ width: "200px" }} src={imagePreviewUrl} />
            )}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <Form.Label>Name</Form.Label> */}
              {uploadetImageUrl !== "" ? (
                <Form.Control
                  type="text"
                  placeholder="Add discription"
                  onChange={handleInputChange}
                />
              ) : null}
            </Form.Group>
            {imageText !== "" && uploadetImageUrl !== "" ? (
              <Button type="submit" variant="outline-primary">
                Upload
              </Button>
            ) : null}

            {postSuccesfull&&  postSuccesfull.message === "Comment sent" ? (
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
