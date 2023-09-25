import { type FC } from 'react';

const Error: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1>Erro!</h1>
      <p>Alguma coisa não saiu como o esperado...</p>
    </div>
  );
};

export default Error;
