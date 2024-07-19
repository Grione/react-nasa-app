import { useQuery } from "@tanstack/react-query";
import { fetchFavorite, fetchSinglePicture } from "../utils/http";
import IFrameVideo from "../components/UI/IFrameVideo";
import { Media } from "../types/types";
import ImageWrapper from "../components/ImageWrapper/ImageWrapper";
import classes from './MainPage.module.css'
import MainImageContent from "../components/MainImageContent/MainImageContent";

const now = new Date();
const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
const staleTime = endOfDay.getTime() - now.getTime();

const MainPage = () => {
  const { data, isLoading, isError } = useQuery<Media, Error>({
    queryKey: ['main-photo'],
    queryFn: ({ signal }) => fetchSinglePicture({ signal }),
    staleTime: staleTime,
  });

  const { data: favoriteImages } = useQuery<Media[], Error>({
    queryKey: ['favorites'],
    queryFn: () => fetchFavorite(),
  });

  let content;

  if (isLoading) {
    content = <h3>Loading...</h3>
  }

  if (isError) {
    content = <h3>Error defined</h3>
  }

  if (data && data.media_type !== 'video') {

    let isFavorite = false;

    if (favoriteImages) {
      isFavorite = !!favoriteImages.find((image) => image.url === data.url);
    }

    content = (
      <div className={classes['image-container']}>
        <ImageWrapper data={data} isFavorite={isFavorite} />
        <MainImageContent title={data.title} description={data.explanation} />
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