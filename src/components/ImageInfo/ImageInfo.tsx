import { useMutation } from '@tanstack/react-query';

import { addFavorite, deleteFavorite, queryClient } from '../../utils/http';
import StarButton from '../UI/StarButton';

import { Media } from '../../types/types';
import classes from './ImageInfo.module.css';
interface ImageWrapperProps {
  title: string;
  media: Media;
  isFavorite: boolean;
  url: string;
}

const ImageInfo = ({ title, media, isFavorite, url }: ImageWrapperProps) => {

  const { mutate: addMutate } = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites']
      });
    }
  })

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites']
      });
    }
  })


  function sendDataHandler() {
    addMutate(media);
  }

  function deleteDataHandler() {
    deleteMutate({ url: url });
  }

  return (
    <div className={classes['info']}>
      <span className={classes.title}>{title}</span>
      <StarButton isFavorite={isFavorite} handlerClick={isFavorite ? deleteDataHandler : sendDataHandler} />
    </div>
  )
}

export default ImageInfo;