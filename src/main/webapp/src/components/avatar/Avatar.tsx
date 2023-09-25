import { type FC } from 'react';
import { useAvatar } from '../../hooks/useAvatar';
import './Avatar.scss';

type AvatarProps = {
  name: string;
};

const Avatar: FC<AvatarProps> = ({ name }) => {
  const src = useAvatar(name);

  return <img className='avatar' src={src} />;
};

export default Avatar;
