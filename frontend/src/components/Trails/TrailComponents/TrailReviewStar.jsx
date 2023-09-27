import React from 'react';
import reviewStar from '../../../assets/images/reviewStar.png';
import './TrailReviewStar.css';

const TrailReviewStar = ({ trail }) => {
    // Check if trail.properties exists and if trail.properties.review is an array
    const reviews = trail.properties && Array.isArray(trail.properties.reviews) ? trail.properties.reviews : [];
    
    // Filter out empty review objects and then map to extract ratings
    const ratings = reviews
        .filter(review => Object.keys(review).length !== 0 && review.rating !== undefined)
        .map(review => review.rating);

    // Calculate the average rating
    const averageRating = ratings.length > 0 ? ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length : 0;
    return (
        <div className='trail-review-star-container'>
            <img src={reviewStar} alt="review star" className="review-star"/>
            <p>{averageRating.toFixed(1)} ({reviews.length})</p>
        </div>
    );
}

export default TrailReviewStar;