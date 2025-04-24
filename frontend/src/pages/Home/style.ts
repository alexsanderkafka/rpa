import styled from 'styled-components';
import theme from '../../theme';

export const Container = styled.div`
  max-width: 100%;
  margin: 70px auto;
  padding: 24px;
  background: ${theme.background.tertiary};
  border-radius: 8px;
  box-shadow: 0 2px 8px ${theme.shadow.primary};
  height: auto;
  display: flex;
  flex-direction: column;
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
  color: ${theme.textColor.secondary};
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

export const TableContainer = styled.div`
  max-width: auto;
  margin: 0 auto 70px auto;
  background: ${theme.background.tertiary};
  border-radius: 8px;
  box-shadow: 0 2px 8px ${theme.shadow.primary};
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${theme.background.tertiary};
  border-radius: 8px;
  overflow: hidden;
`

export const TableHeader = styled.th`
  background-color: ${theme.background.primary};
  color: #fff;
  padding: 12px;
  text-align: left;
  font-weight: 500;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
`;

export const BaseContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`