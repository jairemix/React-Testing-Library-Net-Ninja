import { render, screen, fireEvent } from '@testing-library/react';
import AddInput from '../AddInput';

const mockedSetTodos = jest.fn();

describe('AddInput', () => {
    it('allow us to type in input', () => {
        render(
            <AddInput
                todos={[]}
                setTodos={mockedSetTodos}
            />
        );
        const inputElement = screen.getByPlaceholderText('Add a new task here...');
        expect(inputElement).toBeInTheDocument();
        fireEvent.change(inputElement, {
            target: {
                value: 'Go Grocery Shopping'
            }
        });
        expect(inputElement.value).toBe('Go Grocery Shopping');
    });
    it('should have an empty input when button is clicked', () => {
        render(
            <AddInput
                todos={[]}
                setTodos={mockedSetTodos}
            />
        );
        const inputElement = screen.getByPlaceholderText('Add a new task here...');
        const buttonElement = screen.getByRole('button', { name: /Add/i });
        fireEvent.change(inputElement, {
            target: {
                value: 'Go Grocery Shopping'
            }
        });
        fireEvent.click(buttonElement);
        expect(inputElement.value).toBe('');
    });
});
