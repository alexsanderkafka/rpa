import styled from 'styled-components';
import theme from '../../theme';

export const Container = styled.div`
  max-width: 40%;
  margin: 70px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px ${theme.shadow.primary};

`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 10px;
  background: ${theme.background.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${theme.background.secondary};
  }
`;

export const Error = styled.span`
  color: ${theme.errorColor.primary};
  font-size: 14px;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const Description = styled.p`
  text-align: center;
  margin-bottom: 30px;
`;

export const AccountRow = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`