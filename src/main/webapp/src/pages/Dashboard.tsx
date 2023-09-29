import { type FC } from 'react';
import Callout from '../components/callout/Callout';
import Input from '../components/input/Input';
import Select from '../components/select/Select';
import Button from '../components/button/Button';
import { useDataTable } from '../hooks/useDataTable';
import Table from '../components/table/Table';
import Actionbar from '../components/actionbar/Actionbar';
import PageContent from '../components/page/PageContent';
import PageActionBar from '../components/page/PageActionbar';

const optionsMock = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option with a long message on it' },
];

const dataMock = [
  { id: '1', name: 'Teste 1', email: 't@t.com' },
  { id: '2', name: 'Teste 42', email: 't2@t.com' },
  { id: '3', name: 'Teste 3', email: 't3@t.com' },
  { id: '4', name: 'Teste 30', email: 't3@t.com' },
  { id: '5', name: 'Teste 3', email: 't3@t.com' },
  { id: '6', name: 'Teste 32', email: 't3@t.com' },
  { id: '7', name: 'Teste 3', email: 't3@t.com' },
  { id: '8', name: 'Teste 31', email: 't3@t.com' },
  { id: '9', name: 'Teste 3', email: 't5@t.com' },
  { id: '10', name: 'Teste 3', email: 't3@t.com' },
  { id: '11', name: 'Teste 3', email: 't3@t.com' },
  { id: '12', name: 'Teste 39', email: 't19@t.com' },
  { id: '13', name: 'Teste 2', email: 't3@t.com' },
];

const Dashboard: FC = () => {
  const { data, sortBy } = useDataTable(dataMock);

  return (
    <>
      <PageContent>
        <Callout message='blabla' type='success' />
        <h1>Dashboard</h1>
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
          <Select
            options={optionsMock}
            disabled
            label='Teste'
            hint='Lorem ipsum dolor sit met...'
          />
          <Button onClick={() => {}}>Teste</Button>
        </div>
        <Table
          data={data}
          headers={['Name', 'Email']}
          sortBy={sortBy}
          actions={[
            {
              edit: (id: any) => {
                // console.log(id);
              },
            },
            {
              delete: (id: any) => {
                // console.log(id);
              },
            },
          ]}
        />
      </PageContent>
      <PageActionBar>
        <Actionbar title='Add Something' content={<div></div>} />
      </PageActionBar>
    </>
  );
};

export default Dashboard;
