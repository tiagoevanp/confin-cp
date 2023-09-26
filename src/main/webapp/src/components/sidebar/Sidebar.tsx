import { type FC } from 'react';
import './Sidebar.scss';
import Section from './Section';
import Item from './Item';

const Sidebar: FC = () => {
  return (
    <aside className='sidebar'>
      <div className='sidebar__sections'>
        <Section title='Painel Principal' icon='home'>
          <Item title='Dashboard' to='dashboard' />
          <Item title='Logs' to='logs' />
        </Section>
        <Section title='Administração' icon='clipboard' />
        <Section title='Configurações' icon='settings' />
      </div>
      <div className='sidebar__footer'>{/* <Section title='Sair' icon='logout' /> */}</div>
    </aside>
  );
};

export default Sidebar;