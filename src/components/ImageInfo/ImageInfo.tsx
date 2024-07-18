import classes from './ImageInfo.module.css';

interface ImageWrapperProps {
  title: string;
}

const ImageInfo = ({ title }: ImageWrapperProps) => {
  return (
    <div className={classes['info']}>
      <span className={classes.title}>{title}</span>
    </div>
  )
}

export default ImageInfo;