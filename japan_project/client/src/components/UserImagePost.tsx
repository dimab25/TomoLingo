import { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Imageupload } from "../types/customTypes";

function UserImagePost() {


    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | string>("");
const [uploadetImageUrl, setUploadetImageUrl] = useState("")
const [imageText, setImageText]= useState("")

      const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log("e.target.files", e.target.files);
        const file = e.target.files?.[0];
       
        if (file instanceof File) {
          setSelectedFile(file);
          setImagePreviewUrl(URL.createObjectURL(file));
        }
      };
if (imagePreviewUrl)
{console.log('imagePreview :>> ', imagePreviewUrl)};
if (selectedFile)
{console.log('selectedFile :>> ', selectedFile)};

const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

    console.log("e.target.value :>> ", e.target.value);
    setImageText(e.target.value );
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
       
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
 console.log(" uploadetImageUrl:>> ", uploadetImageUrl);
 console.log('imageText :>> ', imageText);

 const submitImagePost =async(e)=>{
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    if (uploadetImageUrl)
    {urlencoded.append("imageUrl", uploadetImageUrl)};
if (imageText)
    {urlencoded.append("text", imageText)};
    urlencoded.append("user_id", "67cffb39e6571e713867c437");
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };
    
    fetch("http://localhost:4000/api/users/image/post/", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
 }

  return (
    <>
      <div>UserImagePost</div>{" "}
      <Form onSubmit={submitImagePost}>
      <Form.Control
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleAttachFile}
          />
  {imagePreviewUrl && (
            <img style={{ width: "200px" }} src={imagePreviewUrl} />
          )}
          <Button onClick={handleImageUpload}>Upload image</Button>


          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User Name"
                // name="name"
                onChange={handleInputChange}
              />
            </Form.Group>

          <Button type="submit" variant="outline-primary">
              Send
            </Button>
      </Form>
    </>
  );
}

export default UserImagePost;
