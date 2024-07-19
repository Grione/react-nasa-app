import { useQuery } from "@tanstack/react-query";
import { Media } from "../../types/types";
import ImageInfo from "../ImageInfo/ImageInfo";
import classes from './ImagesList.module.css';
import { fetchFavorite } from "../../utils/http";

interface ImagesListProps {
  images: Media[];
}

const ImagesList = ({ images }: ImagesListProps) => {

  const { data } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => fetchFavorite(),
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
            <img src={url} alt={image.title} />
            <ImageInfo title={image.title} media={image} isFavorite={isFavorite} url={url}/>
          </li>
        )
      })}
    </ul>
  )
}

export default ImagesList;