import classes from './MainImageContent.module.css';

interface MainImageContentProps {
  title: string;
  description: string;
}

const MainImageContent = ({ title, description }: MainImageContentProps) => {
  return (
    <div className={classes.wrapper}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default MainImageContent; 