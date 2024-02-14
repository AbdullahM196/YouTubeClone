import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import "./Videos.css";

export default function Videos({
  id,
  publishedAt,
  title,
  channelId,
  channelTitle,
  thumbnails,
}) {
  const date = parseISO(publishedAt);
  const timeAgo = formatDistanceToNow(date);
  const navigate = useNavigate();
  return (
    <Card className="videoCard" id={id}>
      <Card.Header
        className="videoTitle"
        onClick={() => navigate(`/details/${id}`)}
        style={{
          width: "100%",
          height: "225px",
          background: `url(${thumbnails})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "155px",
          color: "white",
          fontSize: "16px",
          backgroundColor: "black",
        }}
      >
        <Card.Title onClick={() => navigate(`/details/${id}`)}>
          {title.substring(0, 50)}
        </Card.Title>
        <Card.Text className="d-flex flex-column">
          <span
            onClick={() => {
              navigate(`/channel/${channelId}`);
            }}
          >
            {" "}
            {channelTitle}
          </span>
          <span> {`${timeAgo} ago`}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
Videos.propTypes = {
  id: PropTypes.string,
  publishedAt: PropTypes.string,
  channelId: PropTypes.string,
  title: PropTypes.string,
  channelTitle: PropTypes.string,
  thumbnails: PropTypes.string,
};
