import { Link } from "react-router";

function ErrorPage() {
  return (
    <div className="pageLayout" style={{ textAlign: "center" }}>
      <h5>404: Oops! We couldn't find that page.</h5>
      <h6>
        It seems like you've taken a detour! But don't worry, just like in
        language learning, sometimes the journey has unexpected turns. Whether
        you're here to learn Japanese, improve your German, or discover the
        latest movie reviews, you're just a click away from getting back on
        track.
      </h6>

      <Link to={"/"}>
        <p>Go back to the home page and let's continue your adventure together!</p>
      </Link>
    </div>
  );
}

export default ErrorPage;
