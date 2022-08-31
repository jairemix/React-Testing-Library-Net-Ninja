import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {

    it('renders same text passed into title prop', () => {
        const title = 'Make Michael think he\'s the one in the bad place';
        render(<Header title={title} />);
        const h1 = screen.getByText(title)
        expect(h1).toBeInTheDocument();
    });
    
    it('renders an element with heading role', () => {
        const title = 'Make Michael think he\'s the one in the bad place';
        render(<Header title={title} />);
        // we specify the title so that if there are multiple headings,
        // we only grab the one with the right title instead of throwing an error
        const heading = screen.getByRole('heading', { name: title });
        expect(heading).toBeInTheDocument();
    });
    
    // this should only be used as last resort
    it('renders an element with the right test id', () => {
        const title = 'Make Michael think he\'s the one in the bad place';
        render(<Header title={title} />);
        const heading = screen.getByTestId('header-1')
        expect(heading).toBeInTheDocument();
    });
    
    // Find By
    it('should render same text passed into title prop', async () => {
        const title = 'Make Michael think he\'s the one in the bad place';
        render(<Header title={title} />);
        const heading = await screen.findByText(title)
        expect(heading).toBeInTheDocument();
    });
    
    // Query By
    it('should not render dogs', () => {
        const title = 'Make Michael think he\'s the one in the bad place';
        render(<Header title={title} />);
        const heading = screen.queryByText(/dogs/i)
        expect(heading).not.toBeInTheDocument();
    });
    
    // Get All By
    it('should render only one heading', async () => {
        const title = 'Make Michael think he\'s the one in the bad place';
        render(<Header title={title} />);
        const headingElements = screen.getAllByRole('heading')
        expect(headingElements.length).toBe(1);
    });
});
