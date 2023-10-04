import { useContext, type FC } from 'react';
import Button from '../../components/button/Button';
import { useAxios } from '../../hooks/useAxios';
import { useConfirmation } from '../../hooks/useConfirmation';
import ActionbarContext from '../../contexts/ActionbarContext';

type DeleteActionProps = {
  id: string;
};

const DeleteAction: FC<DeleteActionProps> = ({ id }) => {
  const { request, loading } = useAxios('DELETE', `supplier/${id}`);
  const { reloadData } = useContext(ActionbarContext);

  const confirmAction = useConfirmation(
    'Tem certeza que deseja deletar este fornecedor?',
    async () => {
      await request();
      reloadData();
    },
  );

  return <Button loading={loading} square name='delete' onClick={confirmAction} variant='danger' />;
};

export default DeleteAction;
