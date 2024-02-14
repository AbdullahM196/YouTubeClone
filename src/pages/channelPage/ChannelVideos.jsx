import { Spinner } from "react-bootstrap";
import { useChannelVideosQuery } from "../../store/api/apiSlice";
import Videos from "../../Components/videoes/Videos";
import PropTypes from "prop-types";
import "./channel.css";
export default function ChannelVideos({ id }) {
  const { data, isLoading, isSuccess, isError, error } =
    useChannelVideosQuery(id);
  let content;
  if (isLoading) {
    content = <Spinner animation="border" />;
  } else if (isSuccess) {
    content = (
      <div className=" channelVideos">
        {data.map((video) => {
          return (
            video.id.videoId && (
              <Videos
                key={video.id.videoId}
                id={video.id.videoId}
                publishedAt={video.snippet.publishedAt}
                title={video.snippet.title}
                channelId={video.snippet.channelId}
                channelTitle={video.snippet.channelTitle}
                thumbnails={video.snippet.thumbnails.high.url}
              />
            )
          );
        })}
      </div>
    );
  } else if (isError) {
    content = <div>{error}</div>;
  }

  return (
    <div className="w-100">
      <nav className="w-100">
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            className="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            href="#nav-home"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Videos
          </a>
        </div>
      </nav>
      <hr />
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          {content}
        </div>
      </div>
    </div>
  );
}

ChannelVideos.propTypes = {
  id: PropTypes.string.isRequired,
};
