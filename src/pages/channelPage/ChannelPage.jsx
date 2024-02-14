import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useChannelsQuery } from "../../store/api/apiSlice";
import ChannelVideos from "./ChannelVideos";
import { useLayoutEffect, useMemo, useState } from "react";
export default function Channel() {
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

  const { id } = useParams();
  const { data, isLoading, isSuccess, isError, error } = useChannelsQuery(id);
  const channel = useMemo(() => {
    return isSuccess ? data : null;
  }, [data, isSuccess]);
  let content;
  if (isLoading) {
    content = <Spinner animation="border" />;
  } else if (isSuccess) {
    const img =
      channel.snippet.thumbnails.high.url ||
      channel.snippet.thumbnails.default.url;
    content = (
      <>
        <Card
          style={{
            width: "60%",
            height: "25vh",
          }}
        >
          <Card.Img variant="top" className="w-100 h-100" src={img} />
        </Card>
        <Row className={`d-flex w-100 me-auto my-5 `}>
          <Col
            xs={screenWidth > 820 ? 3 : 12}
            className={
              screenWidth > 820
                ? ""
                : "d-flex justify-content-center align-items-center"
            }
          >
            <img
              style={{ width: "160px", height: "160px", borderRadius: "50%" }}
              src={
                channel.snippet.thumbnails.high
                  ? channel.snippet.thumbnails.high.url
                  : channel.snippet.thumbnails.default.url
              }
              alt="channelImage"
            />
          </Col>
          <Col
            xs={screenWidth > 820 ? 9 : 12}
            className={
              screenWidth > 820
                ? ""
                : "d-flex flex-column justify-content-center align-items-center"
            }
          >
            <h1 style={{ fontSize: "36px" }}>{channel.snippet.title}</h1>
            <p>
              {channel.snippet.customUrl} .{" "}
              {channel.statistics.subscriberCount > 1000000
                ? `${channel.statistics.subscriberCount / 1000000}M subscribers`
                : channel.statistics.subscriberCount > 1000
                ? `${channel.statistics.subscriberCount / 1000}K subscribers`
                : `${channel.statistics.subscriberCount} subscribers`}{" "}
              .{" "}
              {channel.statistics.videoCount > 1000
                ? `${channel.statistics.videoCount / 1000}K videos`
                : `${channel.statistics.videoCount} videos`}
            </p>
            <p>{channel.snippet.description.substring(0, 88)}...</p>
            <button className="btn btn-light rounded-5 px-4">subscribe</button>
          </Col>
        </Row>
        <div className="mt-5 w-100">
          <ChannelVideos id={channel.id} />
        </div>
      </>
    );
  } else if (isError) {
    content = <div>{error}</div>;
  }
  return (
    <div
      className="container-fluid d-flex flex-column align-items-center"
      style={{ width: "100%" }}
    >
      {content}
    </div>
  );
}
