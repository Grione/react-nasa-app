import { useMutation } from '@tanstack/react-query';

import { addFavorite, queryClient } from '../../utils/http';
import StarButton from '../UI/StarButton';

import { Media } from '../../types/types';
import classes from './ImageInfo.module.css';
interface ImageWrapperProps {
  title: string;
  media: Media;
  isFavorite: boolean;
}

const ImageInfo = ({ title, media, isFavorite }: ImageWrapperProps) => {
  const { mutate } = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites']
      });
    }
  })

  function sendDataHandler() {
    mutate(media)
  }

  function deleteDataHandler() {
    console.log('delete');
  }

  return (
    <div className={classes['info']}>
      <span className={classes.title}>{title}</span>
      <StarButton isFavorite={isFavorite} handlerClick={isFavorite ? deleteDataHandler : sendDataHandler} />
    </div>
  )
}

export default ImageInfo;