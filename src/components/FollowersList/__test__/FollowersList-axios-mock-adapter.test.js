import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import FollowersList from '../FollowersList';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockFollowerResponse } from './mock-follower-response';

const axiosMock = new MockAdapter(axios);

const MockFollowersList = () => {
    return (
        <BrowserRouter>
            <FollowersList />
        </BrowserRouter>
    );
};

describe('FollowersList', () => {
    
    afterEach(() => {
        axiosMock.reset();
    });

    it('should render follower item', async () => {
        axiosMock.onGet('https://randomuser.me/api/?results=5').reply(200, mockFollowerResponse.data);
        // axiosMock.onGet('https://randomuser.me/api/?results=5').reply((request) => [200, mockFollowerResponse.data]);

        render(<MockFollowersList />);

        const followerDivElement = await screen.findByTestId('follower-item-0');
        expect(followerDivElement).toBeInTheDocument();
    });

    it('should render multiple follower items', async () => {
        axiosMock.onGet('https://randomuser.me/api/?results=5').reply(200, mockFollowerResponse.data);

        render(<MockFollowersList />);

        const followerDivElement = await screen.findAllByTestId(/follower-item/);
        expect(followerDivElement.length).toBe(5);
    });

    it('renders no followers when request fails', async () => {
        axiosMock.onGet('https://randomuser.me/api/?results=5').reply(503, { errorCode: 'TEST_ERROR' });

        // we need to use this to wait for all async events to finish since we're not using findBy
        await act(async () => render(<MockFollowersList />)); 

        const followerDivElements = await screen.queryAllByText(/follower-item/);
        expect(followerDivElements.length).toBe(0);
    });

    it('renders an error when the request fails', async () => {
        axiosMock.onGet('https://randomuser.me/api/?results=5').reply(503, { errorCode: 'TEST_ERROR' });

        render(<MockFollowersList />);

        const errorElement = await screen.findByText('There was an error fetching followers. Please try again later.');
        expect(errorElement).toBeInTheDocument();
    });

});
