import { useQuery } from "@tanstack/react-query";
import { fetchPicturesArray } from "../utils/http";
import { Media } from "../types/types";
import ImagesList from "../components/ImagesList/ImagesList";
import { queryClient } from "../utils/http";

const ExplorerPage = () => {
  const COUNT_OF_PICTURES = 9;

  const { data, isFetching, isError } = useQuery<Media[], Error>({
    queryKey: ['pictures'],
    queryFn: ({ signal }) => fetchPicturesArray({ signal, count: COUNT_OF_PICTURES }),
    staleTime: 1000 * 60 * 5,
  });

  function getPhotosHandler() {
    queryClient.invalidateQueries({
      queryKey: ['pictures'],
    });
  }

  let content;

  if (isFetching) {
    content = <h3>Loading...</h3>
  }

  if (isError) {
    content = <h3>Error defined</h3>
  }

  if (data) {
    const imagesArray = data.filter((obj) => obj.media_type === 'image');
    content = (
      <>
        <button disabled={isFetching} onClick={getPhotosHandler}>Regenerate Photos</button>
        <ImagesList images={imagesArray} />
      </>
    )
  }

  return (
    <>
      <h1>ExplorerPage</h1>
      {content}
    </>

  )
}

export default ExplorerPage; 