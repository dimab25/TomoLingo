import { ChangeEvent, FormEvent, useState } from "react";
import { Imageupload, User } from "../types/customTypes";

function Register() {
  const [selectedFile, setSelectedFile] = useState<File | string >("");
const [newUser, setNewUser] = useState<User>()
  

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const file = e.target.files?.[0];
    console.log("file :>> ", file);
    if (file instanceof File) {
      setSelectedFile(file);
    }
  };

  const handleImageUpload = async (e: FormEvent<HTMLFormElement>) => {
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
      )
    
        const result  = await response.json() as Imageupload;
      setNewUser({...newUser!, imgUrl:result.imgUrl})
     console.log('result :>> ', result);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleImageUpload}>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleAttachFile}
          />
          <button>Upload image</button>
        </form>
      </div>
      <div>Register</div>
    </>
  );
}

export default Register;
