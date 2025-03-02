import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { GB } from "country-flag-icons/react/3x2";
import { DE } from "country-flag-icons/react/3x2";
import { JP } from "country-flag-icons/react/3x2";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
// import { FaMessage } from "react-icons/fa6";
// import { IoPersonAddOutline } from "react-icons/io5";


function ProfileDetails() {
  //   const queryParameters = new URLSearchParams(window.location.search);
  //   const idQuery = queryParameters.get("id");

  const [file, setFile] = useState<[] | string>("");

  const fetchAllMovies = async () => {
    fetch("http://localhost:4000/api/users/all/emails/test@test.de?name=dimson")
      .then((response) => response.json())
      .then((result) => setFile(result.userByEmail))

      .catch((error) => console.error(error));
  };

  console.log(file);
  useEffect(() => {
    fetchAllMovies();
  }, []);

  return (
    <>
      <div>
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
      </div>
    </>
  );
}

export default ProfileDetails;
