import React, { useEffect, useState } from 'react'
import "./FollowersList.css"
import axios from "axios"
import { Link } from 'react-router-dom';

export default function FollowersList() {

    const [followers, setFollowers] = useState([]);
    const [fetchFollowersError, setFetchFollowersError] = useState(null);

    useEffect(() => {
        fetchFollowers()
    }, []);

    const fetchFollowers = async () => {
        try {
            const {data} = await axios.get("https://randomuser.me/api/?results=5");
            setFollowers(data.results);
            setFetchFollowersError(null);
        } catch (e) {
            // console.log('e.response', JSON.stringify(e.response));
            setFetchFollowersError(e.response || {});
        }
    }

    return (
        <div className="followerslist-container">
            {fetchFollowersError ? <p>There was an error fetching followers. Please try again later.</p> : null}
            <div>
                {followers.map((follower, index) => (
                    <div className="follower-item" key={follower.login.username} data-testid={`follower-item-${index}`}>
                        <img alt={`follower: ${follower.name.first} ${follower.name.last}`} src={follower.picture.large}/>
                        <div className="followers-details">
                            <div className="follower-item-name">
                                <h4>{follower.name.first}</h4> <h4>{follower.name.last}</h4>
                            </div>
                            <p>{follower.login.username}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="todo-footer">
                <Link to="/">Go Back</Link>
            </div>
        </div>
    )
}
