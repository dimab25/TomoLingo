import { useEffect, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { GB } from "country-flag-icons/react/3x2";
import { DE } from "country-flag-icons/react/3x2";
import { JP } from "country-flag-icons/react/3x2";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import getFormattedDate from "../utilities/changeDate";
// import { FaMessage } from "react-icons/fa6";
// import { IoPersonAddOutline } from "react-icons/io5";


function ProfileDetails() {
    const queryParameters = new URLSearchParams(window.location.search);
    const idQuery = queryParameters.get("id");

  const [file, setFile] = useState<[] | string>("");

  const [show, setShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const handleClose = () => {
    setShow(false);
    setSelectedPost(null);
  };
  const handleShow = (post) => {
    setShow(true);
    setSelectedPost(post);
  };

  const getProfileById = async () => {
    fetch(`http://localhost:4000/api/users/all/id/${idQuery}`)
      .then((response) => response.json())
      .then((result) => setFile(result.userById))

      .catch((error) => console.error(error));
  };

  console.log(file);
  useEffect(() => {
    getProfileById();
  }, []);

  return (
    <>
     <div className="pageLayout">
        <Image style={{ width: "300px" }} src={file[0]?.imageUrl} />
        <div className="profileInfoContainer">
          <h5>{file[0]?.name}</h5>
          <p>{file[0]?.native_language}</p>
          <div>
            Native:{" "}
            {file[0]?.native_language == "German" && <DE className="flags" />}
            {file[0]?.native_language == "Japanese" && <JP className="flags" />}
            {file[0]?.native_language == "English" && <GB className="flags" />}
          </div>
          <div>
            Learning:{" "}
            {file[0]?.target_language == "German" && <DE className="flags" />}
            {file[0]?.target_language == "Japanese" && <JP className="flags" />}
            {file[0]?.target_language == "English" && <GB className="flags" />}
          </div>

          <div className="levelIcons">
            {file[0]?.target_language_level == "beginner" && (
              <>
                <FaCircle />
                <FaRegCircle />
                <FaRegCircle />
              </>
            )}
            {file[0]?.target_language_level == "intermediate" && (
              <>
                <FaCircle />
                <FaCircle />
                <FaRegCircle />
              </>
            )}
            {file[0]?.target_language_level == "advanced" && (
              <>
                <FaCircle />
                <FaCircle />
                <FaCircle />
              </>
            )}
          </div>
        </div>
        <div className="profileAboutContainer">About{file[0]?.about}</div>
        <div className="postedImagesFullDiv"><div>Posted Content</div>
        <div className="postedImages">

           
            {file &&
              file[0].posts?.map((item, index) => (
                <>
                  <div key={index}>
                    <Image
                      style={{ width: "200px" }}
                      src={item.imageUrl}
                      onClick={() => handleShow(item)}
                    />

                    <Modal size="xl" show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        
                        {/* <Modal.Title>Modal heading</Modal.Title> */}
                      </Modal.Header>
                      <Modal.Body>
                        <Image
                          style={{ width: "auto" }}
                          src={selectedPost?.imageUrl}
                          fluid
                        />
                        <div>{selectedPost?.text}</div>{" "}
                      </Modal.Body>
                      <Modal.Footer>
                        <div>{getFormattedDate(selectedPost?.created_at)}</div>{" "}
                       
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </>
              ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
