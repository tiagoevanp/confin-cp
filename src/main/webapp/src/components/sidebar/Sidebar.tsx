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
        </Section>
        <Section title='Administração' icon='clipboard'>
          <Item title='Produtos' to='products' />
          <Item title='Fornecedores' to='suppliers' />
          <Item title='Custos Fixos' to='fixed-costs' />
          <Item title='Descontos' to='discounts' />
        </Section>
        <Section title='Configurações' icon='settings' />
      </div>
      <div className='sidebar__footer'>{/* <Section title='Sair' icon='logout' /> */}</div>
    </aside>
  );
};

export default Sidebar;
