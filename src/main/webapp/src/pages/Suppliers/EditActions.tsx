import { type FC } from 'react';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

type EditActionProps = {
  id: string;
};

const EditAction: FC<EditActionProps> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <Button
      square
      name='edit'
      onClick={() => {
        navigate(`./edit/${id}`);
      }}
    />
  );
};

export default EditAction;
