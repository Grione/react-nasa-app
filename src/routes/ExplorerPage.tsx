import { useQuery } from "@tanstack/react-query";
import { fetchPicturesArray } from "../utils/http";
import { Media } from "../types/types";

const ExplorerPage = () => {
  const COUNT_OF_PICTURES = 9;
  const { data, isLoading, isError } = useQuery<Media[], Error>({
    queryKey: ['pictures'],
    queryFn: ({ signal }) => fetchPicturesArray({ signal, count: COUNT_OF_PICTURES }),
    staleTime: 1000 * 60 * 60 * 24,
  });

  let content;

  if (isLoading) {
    content = <h3>Loading...</h3>
  }

  if (isError) {
    content = <h3>Error defined</h3>
  }

  if (data) {
    const imagesArray = data.filter((obj) => obj.media_type === 'image');
    content = (
      imagesArray.map((image) => {
        return (
          <img src={image.url} alt={image.title} />
        )
      })


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