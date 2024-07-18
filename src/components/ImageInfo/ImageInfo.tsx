import { useMutation } from '@tanstack/react-query';
import classes from './ImageInfo.module.css';
import { Media } from '../../types/types';
import { addFavorite } from '../../utils/http';
interface ImageWrapperProps {
  title: string;
  media: Media;
}

const ImageInfo = ({ title, media }: ImageWrapperProps) => {
  const { mutate } = useMutation({
    mutationFn: addFavorite
  })

  function sendDataHandler() {
    console.log(media)
    mutate(media)
  }

  return (
    <div className={classes['info']}>
      <span className={classes.title}>{title}</span>
      <button onClick={sendDataHandler}>Send</button>
    </div>
  )
}

export default ImageInfo;