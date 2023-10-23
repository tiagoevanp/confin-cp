import { type FC, type PropsWithChildren } from 'react';
import './Card.scss';
import { useClassName } from '../../hooks/useClassName';

type CardProps = PropsWithChildren<{
  title: string;
  size: 'quarter' | 'third' | 'half' | 'full';
}>;

const Card: FC<CardProps> = ({ title, size, children }) => {
  const className = useClassName('card', { size });

  return (
    <div className={className}>
      <div className='card__title'>{title}</div>
      <div className='card__content'>{children}</div>
    </div>
  );
};

export default Card;
