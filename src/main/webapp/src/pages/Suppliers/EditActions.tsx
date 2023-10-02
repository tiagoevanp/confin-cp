import { useContext, type FC } from 'react';
import Button from '../../components/button/Button';
import ActionbarContext from '../../contexts/ActionbarContext';

type EditActionProps = {
  row: any;
};

const EditAction: FC<EditActionProps> = ({ row }) => {
  const { hidden, toggle, setRow } = useContext(ActionbarContext);

  return (
    <Button
      square
      name='edit'
      onClick={() => {
        if (hidden) {
          toggle();
          setRow(row);
        }
      }}
    />
  );
};

export default EditAction;
