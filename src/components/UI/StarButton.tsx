import StarIcon from '../../assets/icons/star_outline.svg';
import StarIconFill from '../../assets/icons/star_fill.svg';
import classes from './StarButton.module.css';

interface StarButtonProps {
  isFavorite: boolean;
  handlerClick: () => void;
}

const StarButton = ({ isFavorite, handlerClick }: StarButtonProps) => {

  const iconSrc = isFavorite ? StarIconFill : StarIcon;

  function onClickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    handlerClick();
  }

  return (
    <button className={classes.button} onClick={onClickHandler}>
      <img src={iconSrc} alt='star' />
    </button>
  )
}

export default StarButton; 