import { type FC } from 'react';
import Input from './components/input/Input';
import Button from './components/button/Button';

const App: FC = () => {
  return (
    <div
      className='app'
      style={{
        display: 'flex',
        padding: '20px',
        alignItems: 'flex-end',
        gap: '20px',
      }}
    >
      <Input
        type='password'
        placeholder='Input Password'
        label='Input 1'
        hint='lorem ipsum dolor...'
      />
      <Input type='text' placeholder='Input Text' disabled label='Input 2' />
      <Button onClick={() => {}}>Teste</Button>
    </div>
  );
};

export default App;
