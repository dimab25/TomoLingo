import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router";

function Home() {
  const { user } = useContext(AuthContext);
  console.log("user :>> ", user);

  const sections = [
    {
      title: "🤝 Meet Language Partners in Berlin & Grow Together!",
      image:
        "https://res.cloudinary.com/dggcfjjc3/image/upload/v1742769060/DALL_E_2025-03-23_23.30.35_-_A_white_man_and_a_Japanese_man_meeting_in_a_cozy_Berlin_caf%C3%A9_for_a_language_tandem._They_are_sitting_at_a_small_table_smiling_and_engaging_in_convers_xvjzaf.webp",
      link: "/profiles",
    },
    {
      title: "🎬 Movies Made Easy – Rate & Learn with Japanese Films!",
      image:
        "https://res.cloudinary.com/dggcfjjc3/image/upload/v1741459565/kanjiImage_iejxbc.webp",
      link: "/media",
    },
    {
      title: "💬 Chat & Practice – Join the virtual Chatroom!",
      image:
        "https://res.cloudinary.com/dggcfjjc3/image/upload/v1742773571/DALL_E_2025-03-22_21.34.46_-_A_diverse_group_of_people_meeting_and_chatting_in_a_cozy_Berlin_caf%C3%A9_engaging_in_a_language_exchange._A_Japanese_flag_or_Japanese_learning_books_are_buyqob.webp",
      link: "/chatroom",
    },
  ];

  return (
    <>
 <Container className="py-5">
      <h2 className="text-center mb-5 display-4 fw-bold">
        Welcome to TomoLingo!
      </h2>
      <Row className="g-4">
        {sections.map((section, idx) => (
          
          <Col md={8} sm={12} key={idx}>
            <Link  style={{textDecoration:"none"}} to={section.link}><Card className="h-100 shadow-sm homeLink">
             
              <Card.Body>
                <Card.Title className="fs-3 text-center">{section.title}</Card.Title>
              </Card.Body>
              <Card.Img style={{maxHeight:"24rem"}} variant="bottom" src={section.image} className="object-fit-cover" />
            </Card></Link>
          </Col> 
        ))}
      </Row>
    </Container>

    {/* <div>
          <img
            className="w-50 homeImage"
            src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1742769060/DALL_E_2025-03-23_23.30.35_-_A_white_man_and_a_Japanese_man_meeting_in_a_cozy_Berlin_caf%C3%A9_for_a_language_tandem._They_are_sitting_at_a_small_table_smiling_and_engaging_in_convers_xvjzaf.webp"
            alt="kanji study block"
          />
       
            <h4 className="homeHeadtitle">
              🤝 Meet Language Partners in Berlin & Grow Together!
            </h4>

  
          <img
            className=" w-50 homeImage"
            src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1741459565/kanjiImage_iejxbc.webp"
            alt="kanji study block"
          />
       
            <h4 className="homeHeadtitle">
              🎬 Movies Made Easy – Rate & Learn with Japanese Films!
            </h4>

          <img
            className=" w-50 homeImage"
            src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1742773571/DALL_E_2025-03-22_21.34.46_-_A_diverse_group_of_people_meeting_and_chatting_in_a_cozy_Berlin_caf%C3%A9_engaging_in_a_language_exchange._A_Japanese_flag_or_Japanese_learning_books_are_buyqob.webp"
            alt="kanji study block"
          />
        
            <h4 className="homeHeadtitle">
              💬 Chat & Practice – Join the virtual Chatroom!
            </h4>
    

</div> */}
      {/* <Carousel>
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
       
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}


    </>
  );
}

export default Home;
