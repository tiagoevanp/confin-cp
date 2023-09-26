import { useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';
import { useClassName } from '../../hooks/useClassName';
import { usePathResolver } from '../../hooks/usePathResolver';

type ItemProps = {
  title: string;
  to: string;
};

const Item: FC<ItemProps> = ({ title, to }) => {
  const { page } = usePathResolver();

  const isSelected = useMemo(() => to === page, [page, to]);
  const className = useClassName('sidebar__item', { selected: isSelected });

  return (
    <Link to={to} className={className}>
      {title}
    </Link>
  );
};

export default Item;
