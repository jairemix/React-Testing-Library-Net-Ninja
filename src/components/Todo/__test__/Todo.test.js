import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Todo from '../Todo';

const MockTodo = () => {
    return (
        <BrowserRouter>
            <Todo />
        </BrowserRouter>
    )
};

/**
 * Enters task in inputElement and clicks on buttonElement. This should add the task to the page.
 */
const addTasks = (tasks) => {
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    tasks.forEach((task) => {
        fireEvent.change(inputElement, { target: {
            value: task,
        }})
        fireEvent.click(buttonElement);
    });
}

// integration tests

describe('Todo', () => {

    it('renders a todo item with text entered in input element', () => {
        render(<MockTodo />);
        addTasks(['Go Grocery Shopping']);
        const todoDivElement = screen.getByText(/Go Grocery Shopping/i);
        expect(todoDivElement).toBeInTheDocument();
    });

    it('can render multiple todo items', () => {
        render(<MockTodo />);
        const tasks = ['Go Grocery Shopping', 'Catch that magic panda. Use her powers', 'Make Michael think he\'s in the bad place'];
        addTasks(tasks);
        const todoDivElements = screen.getAllByTestId('todo-item');
        expect(todoDivElements.length).toBe(3);

        // make sure all tasks have the right text
        tasks.forEach((task, index) => {
            const todoDivElement = todoDivElements[index];
            const regexp = new RegExp(`^${task}$`); // use regex for exact match
            expect(todoDivElement).toHaveTextContent(regexp);
            // or we can use expect(todoDivElement.innerHTML).toBe(task);
        });
    });

    it('items should not have completed class when initially rendered', () => {
        render(<MockTodo />);
        addTasks(['Make Michael think he\'s in the bad place']);

        const todoDivElement = screen.getByText('Make Michael think he\'s in the bad place');

        expect(todoDivElement).not.toHaveClass('todo-item-active');
    });

    it('items should have completed class when clicked', () => {
        render(<MockTodo />);
        addTasks(['Make Michael think he\'s in the bad place']);
        const todoDivElement = screen.getByText('Make Michael think he\'s in the bad place');
        fireEvent.click(todoDivElement);

        expect(todoDivElement).toHaveClass('todo-item-active');
    });

});
