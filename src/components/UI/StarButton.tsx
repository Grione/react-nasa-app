import StarIcon from '../../assets/icons/star_outline.svg';
import StarIconFill from '../../assets/icons/star_fill.svg';
import classes from './StarButton.module.css';

interface StarButtonProps {
  isFavorite: boolean;
  handlerClick: () => void;
}

const StarButton = ({ isFavorite, handlerClick }: StarButtonProps) => {

  const iconSrc = isFavorite ? StarIconFill : StarIcon;

  return (
    <button className={classes.button} onClick={handlerClick}>
      <img src={iconSrc} alt='star' />
    </button>
  )
}

export default StarButton; 