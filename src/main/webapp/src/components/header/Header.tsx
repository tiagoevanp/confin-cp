import { type FC } from 'react';
import './Header.scss';
import Avatar from '../avatar/Avatar';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  return (
    <header className='header'>
      <div className='header__links'>
        <Link to='#'>Link 1</Link>
        <Link to='#'>Link 2</Link>
        <Link to='#'>Link 3</Link>
      </div>
      <Avatar name='coelho papeleiro' />
    </header>
  );
};

export default Header;
