import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FollowersList from '../FollowersList';

const MockFollowersList = () => {
    return (
        <BrowserRouter>
            <FollowersList />
        </BrowserRouter>
    );
};

describe('FollowersList', () => {

    // beforeAll(() => {
    //     console.log('before all');
    // });

    // hook that is run at the beginning of each test in the describe block
    // beforeEach(() => {
    //     console.log('before each test');
    // });

    // afterAll(() => {
    //     console.log('after all');
    // });

    // afterEach(() => {
    //     console.log('after each test');
    // });

    it('should render follower item', async () => {
        render(<MockFollowersList />);
        const followerDivElement = await screen.findByTestId('follower-item-0');
        expect(followerDivElement).toBeInTheDocument();
    });

    it('should render multiple follower items', async () => {
        render(<MockFollowersList />);
        const followerDivElement = await screen.findAllByTestId(/follower-item/);
        expect(followerDivElement.length).toBe(5);
    });

});
