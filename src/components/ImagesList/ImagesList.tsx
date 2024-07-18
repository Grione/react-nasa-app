import { Media } from "../../types/types";
import ImageInfo from "../ImageInfo/ImageInfo";
import classes from './ImagesList.module.css';

interface ImagesListProps {
  images: Media[];
}

const ImagesList = ({ images }: ImagesListProps) => {
  return (
    <ul className={classes['images-list']}>
      {images.map((image) => {
        return (
          <li className={classes['image-item']} key={image.title}>
            <img src={image.url} alt={image.title} />
            <ImageInfo title={image.title} media={image} />
          </li>
        )
      })}
    </ul>
  )
}

export default ImagesList;