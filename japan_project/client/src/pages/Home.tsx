import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { Carousel, Image } from "react-bootstrap";

function Home() {
  const { user } = useContext(AuthContext);
  console.log("user :>> ", user);

  return (
    <>
 <Carousel>
      <Carousel.Item interval={3000}>
      <img className="d-block w-100"
        src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1741459565/kanjiImage_iejxbc.webp"
        alt="kanji study block"
        
      />
               <Carousel.Caption className="top-0 mt-5">
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <img className="d-block w-100"
        src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1740655970/samples/landscapes/beach-boat.jpg"
        alt="kanji study block"
      />
        <Carousel.Caption className="top-0 mt-5">
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <img className="d-block w-100"
        src="https://res.cloudinary.com/dggcfjjc3/image/upload/v1742207153/userImages/hvmd3bmwqwpp0eib0le6.jpg"
        alt="kanji study block"
      />
        <Carousel.Caption className="top-0 mt-5">
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> 
    </Carousel>


     
    
    </>
  );
}

export default Home;
