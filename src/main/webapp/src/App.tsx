import { type FC } from 'react';
import Button from './components/button/Button';

const App: FC = () => (
  <div className='app' style={{ padding: '20px' }}>
    <Button square name='edit' onClick={() => {}}>
      Button
    </Button>
  </div>
);

export default App;
