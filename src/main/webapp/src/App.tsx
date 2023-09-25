import { type FC } from 'react';
import Input from './components/input/Input';
import Button from './components/button/Button';
import Select from './components/select/Select';
import Avatar from './components/avatar/Avatar';

const App: FC = () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option with a long message on it' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '10px' }}>
      <Avatar name='coelho papeleiro' />
      <div
        className='app'
        style={{
          display: 'flex',
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
        <Input type='text' placeholder='Input Text' label='Input 2' disabled />
        <Select options={options} disabled label='Teste' hint='Lorem ipsum dolor sit met...' />
        <Button onClick={() => {}}>Teste</Button>
      </div>
    </div>
  );
};

export default App;
