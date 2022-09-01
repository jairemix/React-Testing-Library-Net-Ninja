import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FollowersList from '../FollowersList';
import { mockFollowerResponse } from './mock-follower-response';
import axios from "axios";

jest.mock('axios');

const MockFollowersList = () => {
    return (
        <BrowserRouter>
            <FollowersList />
        </BrowserRouter>
    );
};

describe('FollowersList', () => {

    // hook that is run at the beginning of each test in the describe block
    beforeEach(() => {
        // axios.get.mockResolvedValueOnce(mockFollowerResponse);
        axios.get.mockImplementationOnce(async (url) => {
            if (url === 'https://randomuser.me/api/?results=5') {
                return mockFollowerResponse;
            }
        });
    });

    it('should render follower item', async () => {

        render(<MockFollowersList />);
        const followerDivElement = await screen.findByTestId('follower-item-0');

        expect(axios.get).toHaveBeenCalledWith('https://randomuser.me/api/?results=5');
        expect(followerDivElement).toBeInTheDocument();
    });

    it('should render multiple follower items', async () => {
        render(<MockFollowersList />);
        const followerDivElement = await screen.findAllByTestId(/follower-item/);
        expect(followerDivElement.length).toBe(5);
    });

});
