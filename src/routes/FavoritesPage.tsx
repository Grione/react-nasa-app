import { useQuery } from "@tanstack/react-query";
import { fetchFavorite } from "../utils/http";
import ImagesList from "../components/ImagesList/ImagesList";

const FavoritePage = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => fetchFavorite(),
  });

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error data fetching.</p>
  }

  if (data && data.length < 1) {
    return <p>No images in the favorites</p>
  }


  return (
    <>
      <h1>Favorites Page</h1>
      <ImagesList images={data} />
    </>
  )
}

export default FavoritePage; 