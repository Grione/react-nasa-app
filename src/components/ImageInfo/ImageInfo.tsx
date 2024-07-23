import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { addFavorite, deleteFavorite, queryClient } from '../../utils/http';
import StarButton from '../UI/StarButton';

import { Media } from '../../types/types';
import classes from './ImageInfo.module.css';
import { useUser } from '../../store/UserContext';
interface ImageWrapperProps {
  title: string;
  media: Media;
  isFavorite: boolean;
  url: string;
}

const ImageInfo = ({ title, media, isFavorite, url }: ImageWrapperProps) => {

  const { isUserAuth } = useUser();
  const navigate = useNavigate();

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
  });

  function favoriteActionHandler() {

    if (!isUserAuth) {
      navigate('/auth?mode=login');
      return;
    }
    if (isFavorite) {
      deleteMutate({ url: url });
    } else {
      addMutate(media);
    }
  }

  return (
    <div className={classes['info']}>
      <span className={classes.title}>{title}</span>
      <StarButton isFavorite={isFavorite} handlerClick={favoriteActionHandler} />
    </div>
  )
}

export default ImageInfo;