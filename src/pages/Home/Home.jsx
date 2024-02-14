import { Spinner } from "react-bootstrap";
import Videos from "../../Components/videoes/Videos";
import { useGetVideosQuery } from "../../store/api/apiSlice";
import { useSelector } from "react-redux";
import "./home.css";
import { useMemo } from "react";
export default function Home() {
  const searchValue = useSelector((state) => state.searchValue.search);

  const { data, isLoading, isSuccess, isError, error } =
    useGetVideosQuery(searchValue);
  const videoData = useMemo(() => {
    return isSuccess ? data : null;
  }, [isSuccess, data]);
  let content = "";
  if (isLoading) {
    content = <Spinner animation="border" />;
  } else if (isSuccess) {
    content = videoData?.map(
      (video) =>
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
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return <div className="HomeContent">{content}</div>;
}
