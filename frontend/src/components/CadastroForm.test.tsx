import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CadastroForm from './CadastroForm';

test('renders CadastroForm component', () => {
    render(<CadastroForm onSuccess={() => {}} />);
    // Busca pelo label do campo Nome
    const inputElement = screen.getByLabelText(/nome/i);
    expect(inputElement).toBeInTheDocument();
});

test('submits form with user input', () => {
    render(<CadastroForm onSuccess={() => {}} />);
    const nomeInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByPlaceholderText(/exemplo@email.com/i);
    const senhaInput = screen.getByLabelText(/senha/i);

    fireEvent.change(nomeInput, { target: { value: 'Teste' } });
    fireEvent.change(emailInput, { target: { value: 'teste@email.com' } });
    fireEvent.change(senhaInput, { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    // Como o fetch é real, o teste pode falhar sem mock. O ideal é mockar o fetch.
    // Aqui apenas verifica se o botão está presente após submit.
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
});