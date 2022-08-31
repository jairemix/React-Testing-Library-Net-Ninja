import { render, screen } from '@testing-library/react';
import TodoFooter from '../TodoFooter';
import { BrowserRouter } from 'react-router-dom';

const MockTodoFooter = ({ numberOfIncompleteTasks }) => {
    return (
        <BrowserRouter>
            <TodoFooter numberOfIncompleteTasks={numberOfIncompleteTasks}></TodoFooter>
        </BrowserRouter>
    );
}

it('renders the correct amount of incomplete tasks', () => {
    render(<MockTodoFooter numberOfIncompleteTasks={5} />);
    const taskText = screen.getByText('5 tasks left');
    expect(taskText).toBeInTheDocument();

    // more assertions
    // expect(taskText).toBeVisible();
    // expect(taskText).toContainHTML('p');
    // expect(taskText).toHaveTextContent('5 tasks left');
    // expect(taskText.textContent).toBe('5 tasks left');
});

it('renders the render "task" when the number of incomplete tasks is 1', () => {
    render(<MockTodoFooter numberOfIncompleteTasks={1} />);
    const taskText = screen.getByText('1 task left');
    expect(taskText).toBeInTheDocument();
    // expect(taskText).toBeVisible();
});
