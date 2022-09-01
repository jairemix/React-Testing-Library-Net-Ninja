import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FollowersList from '../FollowersList';
import { mockFollowerResponse } from './mock-follower-response';
import mockAxios from "jest-mock-axios";

const MockFollowersList = () => {
    return (
        <BrowserRouter>
            <FollowersList />
        </BrowserRouter>
    );
};

describe('FollowersList', () => {

    afterEach(() => {
        mockAxios.reset();
    });

    it('should render follower item', async () => {

        render(<MockFollowersList />);

        mockAxios.mockResponseFor({ url: 'https://randomuser.me/api/?results=5' }, mockFollowerResponse);

        const followerDivElement = await screen.findByTestId('follower-item-0');

        expect(mockAxios.get).toHaveBeenCalledWith('https://randomuser.me/api/?results=5');
        expect(followerDivElement).toBeInTheDocument();
    });

    it('should render multiple follower items', async () => {
        render(<MockFollowersList />);

        mockAxios.mockResponseFor({ url: 'https://randomuser.me/api/?results=5' }, mockFollowerResponse);

        const followerDivElement = await screen.findAllByTestId(/follower-item/);
        expect(followerDivElement.length).toBe(5);
    });

});
