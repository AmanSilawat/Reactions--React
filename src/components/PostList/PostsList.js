import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton'

import { fetchUserContentReactions } from '../../redux/actions';
import Reactions from '../reactions/Reactions/Reactions';

import './style.css';

const PostsList = () => {
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch()
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchUserContentReactions());
    }, [dispatch]);

    return (
        <div className="cardWrapper">
            {posts.map(({ id: contentId, content, img, title }) => (
                <div className="card" key={contentId}>
                    <h3>{title}</h3>
                    {isImageLoaded === false && <Skeleton height={200} />}
                    <img className="cardImg" onLoad={() => setIsImageLoaded(true)} src={img} alt="no_profile" />
                    <Reactions contentId={contentId} />
                </div>
            ))}
        </div>
    )
}

export default PostsList;
