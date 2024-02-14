import PropTypes from "prop-types";
import { useVideoCommentsQuery } from "../../store/api/apiSlice";
import { Col, Row, Spinner } from "react-bootstrap";
import "./comments.css";
import { formatDistanceToNow, parseISO } from "date-fns";
import { SlLike, SlDislike } from "react-icons/sl";
import { useLayoutEffect, useState } from "react";
export default function Comments({ id }) {
  const [screenWidth, setScreen] = useState(window.innerWidth);

  useLayoutEffect(function () {
    function handleResize() {
      setScreen(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { data, isLoading, isSuccess, isError, error } =
    useVideoCommentsQuery(id);
  let content;
  if (isLoading) {
    content = <Spinner animation="border" />;
  } else if (isSuccess) {
    if (data?.length == 0) {
      content = <h3>No comments</h3>;
    } else {
      content = (
        <div>
          {data?.map((comment) => {
            const date = parseISO(
              comment.snippet.topLevelComment.snippet.publishedAt
            );
            const timeAgo = formatDistanceToNow(date);
            return (
              <Row
                key={comment.id}
                className={`my-3 ${
                  screenWidth > 760 ? "" : "d-flex justify-content-between"
                }`}
              >
                <Col xs={1}>
                  <img
                    className="chanelCircle"
                    src={
                      comment.snippet.topLevelComment.snippet
                        .authorProfileImageUrl
                    }
                    alt={
                      comment.snippet.topLevelComment.snippet.authorDisplayName
                    }
                  />
                </Col>
                <Col xs={10} className="d-flex flex-column">
                  <span className="d-flex gap-3 flex-wrap ">
                    <h5>
                      {
                        comment.snippet.topLevelComment.snippet
                          .authorDisplayName
                      }
                    </h5>{" "}
                    <span style={{ fontSize: "14px", color: "gray" }}>
                      {timeAgo} ago
                    </span>
                  </span>
                  <p>{comment.snippet.topLevelComment.snippet.textOriginal}</p>
                  <div
                    className="d-flex"
                    style={{
                      fontSize: "20px",
                      color: "gray",

                      alignItems: "center",
                    }}
                  >
                    <span>
                      {comment.snippet.topLevelComment.snippet.likeCount}
                    </span>
                    <SlLike size={16} className="ms-1 me-2" />
                    <SlDislike size={16} />
                  </div>
                </Col>
              </Row>
            );
          })}
        </div>
      );
    }
  } else if (isError) {
    content = <h3>{error}</h3>;
  }
  return <div>{content}</div>;
}
Comments.propTypes = {
  id: PropTypes.string,
};
