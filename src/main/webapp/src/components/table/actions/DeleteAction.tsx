import { useContext, type FC } from 'react';
import Button from '../../button/Button';
import { useAxios } from '../../../hooks/useAxios';
import { useConfirmation } from '../../../hooks/useConfirmation';
import ActionbarContext from '../../../contexts/ActionbarContext';

type DeleteActionProps = {
  id: string;
  endpoint: string;
};

const DeleteAction: FC<DeleteActionProps> = ({ id, endpoint }) => {
  const { request, loading } = useAxios('DELETE', `${endpoint}/${id}`);
  const { reloadData } = useContext(ActionbarContext);

  const confirmAction = useConfirmation('Tem certeza que deseja deletar este dado?', async () => {
    await request();
    reloadData();
  });

  return <Button loading={loading} square name='delete' onClick={confirmAction} variant='danger' />;
};

export default DeleteAction;
