import { useQuery } from "@tanstack/react-query";
import { fetchPictures } from "../utils/http";
import IFrameVideo from "../components/UI/IFrameVideo";

const now = new Date();
const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
const staleTime = endOfDay.getTime() - now.getTime();

const MainPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['main-photo'],
    queryFn: ({ signal }) => fetchPictures({ signal }),
    staleTime: staleTime,
  });

  let content;

  if (isLoading) {
    content = <h3>Loading...</h3>
  }

  if (isError) {
    content = <h3>Error defined</h3>
  }

  if (data && data.media_type !== 'video') {
    content = (
      <div className="main-picture">
        <img src={data.url} alt={data.url} />
      </div>
    )
  }

  if (data && data.media_type === 'video') {
    content = (
      <div className="main-video">
        <IFrameVideo src={data.url} />
      </div>
    )
  }
  return (
    <div>
      <h1>The Main Page</h1>
      {content}
    </div>

  )
}

export default MainPage; 