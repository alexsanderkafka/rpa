import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Container,
  Form,
  Input,
  Button,
  Error,
  Title,
  Description,
  AccountRow,
  InputContainer,
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  BaseContainer
} from './style';
import api from '../../api';

interface ClienteForm {
  name: string;
  social: string;
  email: string;
  phone: string;
  agency: string;
  accountNumber: string;
  amount: number;
}

function Home(): React.ReactElement {
  const { register, handleSubmit, formState: { errors }, reset} = useForm<ClienteForm>();

  const [data, setData] = useState<any[]>([])
  //const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchData() {

      try{

        const response = await api.get('/invoice');

        console.log(response.data);
        
        setData(response.data);

        //setLoading(true);

      }catch(err){
        //setLoading(true);
        console.log(err);
      }
    }

    fetchData();

  }, []);

  const onSubmit = (data: ClienteForm) => {
    // Aqui você pode enviar os dados para a API ou manipular como desejar
    console.log(data);

    api.post('/client', data);

    reset();
    
  };

  // Regex para CPF (com ou sem máscara) e CNPJ (com ou sem máscara)
  const cpfCnpjPattern = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;

  /*
  const data = [
    {
      id: 1,
      nome: 'Alex Pereira',
      cpf: '123.456.789-00',
      valor: 'R$ 250,00',
      dataVencimento: '2025-04-30',
      status: 'Pago',
      dataPagamento: '2025-04-15',
      metodoPagamento: 'Cartão de Crédito',
      codigoDeBarra: '23793381286000000012345678900001234567890000',
    },
    {
      id: 2,
      nome: 'Mariana Souza',
      cpf: '987.654.321-00',
      valor: 'R$ 150,00',
      dataVencimento: '2025-05-10',
      status: 'Em aberto',
      dataPagamento: '',
      metodoPagamento: '',
      codigoDeBarra: '23793381286000000009876543210009876543210000',
    },
    {
      id: 3,
      nome: 'Carlos Lima',
      cpf: '111.222.333-44',
      valor: 'R$ 300,00',
      dataVencimento: '2025-04-25',
      status: 'Pago',
      dataPagamento: '2025-04-20',
      metodoPagamento: 'Pix',
      codigoDeBarra: '23793381286000000001112223334445556667778888',
    },
  ];*/
  

  return (
    <BaseContainer>
      <Container>
        <Title>Cadastro de Cliente</Title>
        <Description>Geração de boletos</Description>

        <Form onSubmit={handleSubmit(onSubmit)}>

          <InputContainer>
            <label>Nome completo</label>
            <Input {...register('name', { required: 'Nome é obrigatório' })} 
            style={{
              borderColor: errors.name ? 'red' : '#ccc'
            }}
            placeholder="Digite o nome"
            type='text' />
            {errors.name && <Error>{errors.name.message}</Error>}
          </InputContainer>

          <InputContainer>
            <label>CPF/CNPJ</label>
            <Input {...register('social', {
              required: 'CPF ou CNPJ é obrigatório',
              pattern: {
                value: cpfCnpjPattern,
                message: 'CPF ou CNPJ inválido'
              },
            })} 
            style={{
              borderColor: errors.social ? 'red' : '#ccc'
            }}
            placeholder="Digite o CPF ou CNPJ" 
            type='text'/>
            {errors.social && <Error>{errors.social.message}</Error>}
          </InputContainer>

          <AccountRow>
            <div style={{ display: 'flex',flexDirection: 'column', flex: 1 }}>
              <label>Agência</label>
              <Input {...register('agency', { required: 'Agência é obrigatória' })}
              style={{
                borderColor: errors.agency ? 'red' : '#ccc'
              }}
              placeholder="Digite a agência" 
              type='text'/>
              {errors.agency && <Error>{errors.agency.message}</Error>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <label>Número da conta</label>
              <Input {...register('accountNumber', { required: 'Número da conta é obrigatório' })} 
              style={{
                borderColor: errors.accountNumber ? 'red' : '#ccc'
              }}
              placeholder="Digite o número da conta"
              type='text' />
              {errors.accountNumber && <Error>{errors.accountNumber.message}</Error>}
            </div>
          </AccountRow>

          <InputContainer>
            <label>Email</label>
            <Input {...register('email', { required: 'Email é obrigatório', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' } })}
            style={{
              borderColor: errors.email ? 'red' : '#ccc'
            }}
            placeholder="Digite o email"
            type='text' />
            {errors.email && <Error>{errors.email.message}</Error>}
          </InputContainer>

          <InputContainer>
            <label>Telefone</label>
            <Input {...register('phone', { required: 'Telefone é obrigatório', minLength: { value: 8, message: 'Telefone muito curto' } })}
            style={{
              borderColor: errors.phone ? 'red' : '#ccc'
            }}
            placeholder="Digite o telefone" 
            type='text'/>
            {errors.phone && <Error>{errors.phone.message}</Error>}
          </InputContainer>

          <InputContainer>
            <label>Total a pagar</label>
            <Input {...register('amount', { required: 'Total a pagar é obrigatório', minLength: { value: 0.01, message: 'Valor mínimo é R$ 0,01' } })}
            style={{
              borderColor: errors.amount ? 'red' : '#ccc'
            }}
            placeholder="Digite o telefone" 
            type='number'
            step="0.01"/>
            {errors.amount && <Error>{errors.amount.message}</Error>}
          </InputContainer>

          <Button type="submit">Cadastrar</Button>
        </Form>

      </Container>

      <TableContainer>
        <Title>Faturas</Title>
        
        <Table>
          <thead>
            <TableHeader>Id</TableHeader>
            <TableHeader>Nome</TableHeader>
            <TableHeader>CPF</TableHeader>
            <TableHeader>Valor</TableHeader>
            <TableHeader>Data de Criação</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Data de Vencimento</TableHeader>
            <TableHeader>Método de Pagamento</TableHeader>
            <TableHeader>Código de Barra</TableHeader>
          </thead>

          <tbody>
            {
                data.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.client.name}</TableCell>
                      <TableCell>{item.client.social}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{item.issueDate}</TableCell>
                      <TableCell>{item.status == 'PENDING' ? 'Pendente' : item.status}</TableCell>
                      <TableCell>{item.dueDate}</TableCell>
                      <TableCell>{item.paymentMethod}</TableCell>
                      <TableCell>{item.barcode}</TableCell>
                    </TableRow>
                  )
                })
              }
          </tbody>
        </Table>


      </TableContainer>
    </BaseContainer>
  );
};

export default Home;

/* {
              data.map((item) => 
                <TableRow>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.cpf}</TableCell>
                  <TableCell>{item.valor}</TableCell>
                  <TableCell>{item.dataVencimento}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.dataPagamento}</TableCell>
                  <TableCell>{item.metodoPagamento}</TableCell>
                  <TableCell>{item.codigoDeBarra}</TableCell>
                </TableRow>
              ))
            }*/