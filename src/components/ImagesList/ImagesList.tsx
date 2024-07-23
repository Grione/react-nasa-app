import { useQuery } from "@tanstack/react-query";
import { Media } from "../../types/types";
import classes from './ImagesList.module.css';
import { fetchFavorite } from "../../utils/http";
import ImageWrapper from "../ImageWrapper/ImageWrapper";
import { useUser } from "../../store/UserContext";

interface ImagesListProps {
  images: Media[];
}

const ImagesList = ({ images }: ImagesListProps) => {

  const { isUserAuth } = useUser()

  const { data } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => fetchFavorite(),
    enabled: isUserAuth
  });

  return (
    <ul className={classes['images-list']}>
      {images.map((image) => {
        const url = image.url;

        let isFavorite = false;

        if (data) {
          isFavorite = !!data.find((obj) => obj.url === url);
        }

        return (
          <li className={classes['image-item']} key={image.title}>
            <ImageWrapper data={image} isFavorite={isFavorite} />
          </li>
        )
      })}
    </ul>
  )
}

export default ImagesList;