import { memo } from "react";
import ImageInfo from "../ImageInfo/ImageInfo";
import { Media } from '../../types/types';
import classes from './ImageWrapper.module.css'
import { useModal } from "../../store/ModalContext";

interface ImageWrapperProps {
  data: Media;
  isFavorite: boolean;
}


const ImageWrapper = memo(function ImageWrapper({ data, isFavorite }: ImageWrapperProps) {

  const { openModal } = useModal();

  return (
    <div className={classes.wrapper} onClick={() => openModal(data)}>
      <img src={data.url} alt={data.title} className={classes.image} />
      <ImageInfo title={data.title} media={data} url={data.url} isFavorite={isFavorite} />
    </div>
  )
});


export default ImageWrapper;