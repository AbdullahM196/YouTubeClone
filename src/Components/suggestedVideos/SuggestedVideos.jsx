import { Spinner } from "react-bootstrap";
import { useSuggestedVideosQuery } from "../../store/api/apiSlice";
import Videos from "../videoes/Videos";
import PropTypes from "prop-types";
import "../../pages/Details/details.css";
export default function SuggestedVideos({ id }) {
  const { data, isLoading, isSuccess, isError, error } =
    useSuggestedVideosQuery(id);

  let content;
  if (isLoading) {
    content = <Spinner animation="border" />;
  } else if (isSuccess) {
    content = data.map((video) => {
      return (
        <Videos
          key={video.id.videoId}
          id={video.id.videoId}
          publishedAt={
            video.snippet.publishedAt
              ? video.snippet.publishedAt
              : "2021-11-01T00:00:00Z"
          }
          title={video.snippet.title}
          channelId={video.snippet.channelId}
          channelTitle={video.snippet.channelTitle}
          thumbnails={video.snippet.thumbnails.default.url}
        />
      );
    });
  } else if (isError) {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h2
        style={{
          width: "100%",
          backgroundColor: "#1c1f23",
          padding: "8px",
          borderRadius: "8px",
          color: "white",
          textAlign: "center",
          marginBottom: "16px",
          marginTop: "16px",
          fontSize: "28px",
        }}
      >
        Suggested Videos
      </h2>
      <div className=" suggestedVideos">{content}</div>
    </div>
  );
}
SuggestedVideos.propTypes = {
  id: PropTypes.string,
};
