import ImageInfo from "../ImageInfo/ImageInfo";
import { Media } from '../../types/types';
import classes from './ImageWrapper.module.css'

interface ImageWrapperProps {
  data: Media;
  isFavorite: boolean;
}


const ImageWrapper = ({ data, isFavorite }: ImageWrapperProps) => {
  return (
    <div className={classes.wrapper}>
      <img src={data.url} alt={data.title} className={classes.image} />
      <ImageInfo title={data.title} media={data} url={data.url} isFavorite={isFavorite} />
    </div>
  )
}


export default ImageWrapper;