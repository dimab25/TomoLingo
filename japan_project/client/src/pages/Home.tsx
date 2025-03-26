import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Carousel } from "react-bootstrap";
function Home() {
  const { user } = useContext(AuthContext);
  console.log("user :>> ", user);

  return (
    <>
      <Carousel>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100 homeImage"
            src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1742769060/DALL_E_2025-03-23_23.30.35_-_A_white_man_and_a_Japanese_man_meeting_in_a_cozy_Berlin_caf%C3%A9_for_a_language_tandem._They_are_sitting_at_a_small_table_smiling_and_engaging_in_convers_xvjzaf.webp"
            alt="kanji study block"
          />
          <Carousel.Caption className="top-0 mt-3">
            <h4 className="homeHeadtitle">
              🤝 Meet Language Partners in Berlin & Grow Together!
            </h4>

            {/* <p className="homeText">Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100 homeImage"
            src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1741459565/kanjiImage_iejxbc.webp"
            alt="kanji study block"
          />
          <Carousel.Caption className="top-0 mt-3">
            <h4 className="homeHeadtitle">
              🎬 Movies Made Easy – Rate & Learn with Japanese Films!
            </h4>

            {/* <p className="homeText">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100 homeImage"
            src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1742773571/DALL_E_2025-03-22_21.34.46_-_A_diverse_group_of_people_meeting_and_chatting_in_a_cozy_Berlin_caf%C3%A9_engaging_in_a_language_exchange._A_Japanese_flag_or_Japanese_learning_books_are_buyqob.webp"
            alt="kanji study block"
          />
          <Carousel.Caption className="top-0 mt-3">
            <h4 className="homeHeadtitle">
              💬 Chat & Practice – Join the virtual Chatroom!
            </h4>
            {/* <p className="homeText">
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Home;
