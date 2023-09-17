import { useState, type FC } from 'react';
import Button from './components/button/Button';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='app' style={{ padding: '20px' }}>
      <Button
        variant='danger'
        disabled={isLoading}
        loading={isLoading}
        // square
        // name='edit'
        onClick={() => {
          setIsLoading(!isLoading);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        }}
      >
        Button
      </Button>
    </div>
  );
};

export default App;
