import { useNavigate, useParams } from "react-router-dom";
import { useVideoDetailsQuery } from "../../store/api/apiSlice";
import ReactPlayer from "react-player";
import "./details.css";
import { Row, Spinner } from "react-bootstrap";
import { SlLike, SlDislike } from "react-icons/sl";
import { PiShareFat } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuMoreHorizontal } from "react-icons/lu";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import Comments from "../../Components/Comments/Comments";
import SuggestedVideos from "../../Components/suggestedVideos/SuggestedVideos";

export default function Details() {
  const navigate = useNavigate();
  const [openDescription, setOpen] = useState(false);
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useVideoDetailsQuery(id);

  const videoDetail = useMemo(() => {
    return isSuccess ? data : null;
  }, [isSuccess, data]);

  function toggleDescription() {
    setOpen(!openDescription);
  }
  function convertUrlsToLinks(text) {
    var urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g;

    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + "</a>";
    });
  }

  let content;
  if (isLoading) {
    content = <Spinner animation="border" />;
  } else if (isSuccess) {
    const description = videoDetail?.snippet.description;
    let convertLinks = convertUrlsToLinks(description);
    convertLinks = convertLinks.replace(/\n/g, "<br />");
    const views = videoDetail?.statistics.viewCount;
    const date = parseISO(videoDetail?.snippet.publishedAt);
    const timeAgo = formatDistanceToNow(date);
    content = (
      <>
        <div className="detailsPage">
          <div className="leftSide">
            <ReactPlayer
              className="react-player"
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 1,
                  },
                },
              }}
              url={`https://www.youtube.com/watch?v=${id}`}
              controls={true}
              loop={true}
              light={true}
            />
            <Row className="d-flex">
              <div className="col-12 my-2">
                {videoDetail?.snippet.localized.title}
              </div>
              <div className="mainData">
                <div className="ChannelData">
                  <span
                    onClick={() => {
                      navigate(`/channel/${videoDetail?.snippet.channelId}`);
                    }}
                    className="ChannelLogo"
                  >
                    {videoDetail?.snippet.channelTitle.substring(0, 1)}
                  </span>
                  <span
                    onClick={() => {
                      navigate(`/channel/${videoDetail?.snippet.channelId}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {videoDetail?.snippet.channelTitle}
                  </span>
                </div>
                <div className="descItems">
                  <div id="likes">
                    <span>
                      {videoDetail?.statistics.likeCount} <SlLike />
                    </span>
                    <span>
                      <SlDislike />
                    </span>
                  </div>
                  <div className="ms-1" id="share">
                    <PiShareFat />
                    <span className="spanSecondItem">Share</span>
                  </div>
                  <div id="download" className=" ms-1">
                    <LiaDownloadSolid style={{ fontSize: "22px" }} />
                    <span className="spanSecondItem">Download</span>
                  </div>
                  <div id="more" className=" ms-1">
                    <LuMoreHorizontal className="fs-2" />
                  </div>
                </div>
              </div>
            </Row>
            <Row>
              <div
                id="description"
                className="my-3 overflow-hidden position-relative mx-auto"
                style={{ height: openDescription ? "auto" : "108px" }}
              >
                <div className="col-12 my-1">
                  {views > 1000
                    ? `${views.substring(0, 1)}K views`
                    : `${views} views`}
                  <span className="ms-3">{timeAgo} ago</span>
                </div>
                {openDescription ? (
                  <div dangerouslySetInnerHTML={{ __html: convertLinks }} />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: convertLinks.substring(0, 340),
                    }}
                  />
                )}
                <span
                  className="ms-3"
                  style={{
                    color: "#0078d4",
                    cursor: "pointer",
                    position: "absolute",
                    bottom: "5px",
                    right: "15px",
                  }}
                  onClick={toggleDescription}
                >
                  {openDescription ? "Show less" : "Show more"}
                </span>
              </div>
            </Row>
            <Row>
              <div className="col-12 my-2">
                {videoDetail.statistics.commentCount > 1000
                  ? `${videoDetail.statistics.commentCount.substring(
                      0,
                      1
                    )}K Comments `
                  : `${videoDetail.statistics.commentCount} Comments `}
              </div>
              <div className="col-12 my-2">
                <Comments id={videoDetail.id} />
              </div>
            </Row>
          </div>
          <div className="rightSide">
            <SuggestedVideos id={videoDetail.id} />
          </div>
        </div>
      </>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return <div className="d-flex justify-content-center w-100">{content}</div>;
}
