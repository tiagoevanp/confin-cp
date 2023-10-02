import { type FC } from 'react';
import Button from '../../components/button/Button';
import { useAxios } from '../../hooks/useAxios';
import { useConfirmation } from '../../hooks/useConfirmation';

type DeleteActionProps = {
  id: string;
};

const DeleteAction: FC<DeleteActionProps> = ({ id }) => {
  const { request, loading } = useAxios('DELETE', `supplier/${id}`);

  const confirmAction = useConfirmation('Tem certeza que deseja deletar este fornecedor?', request);

  return <Button loading={loading} square name='delete' onClick={confirmAction} />;
};

export default DeleteAction;
