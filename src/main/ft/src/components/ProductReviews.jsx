import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import { Grid } from '@mui/material';
import StarRatings from './StarRating';
import axios from 'axios';
import Rating from './Rating';
import ImgModal from './ImgModal';
import ReviewEditModal from './ReviewEditModal'; // 추가: 리뷰 수정 모달
import ItemDetail from '../pages/ItemDetail';
// CSS
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Adjust height as needed
  },
  productReviews: {
    width: '80%', // Adjust width as needed
  },
  imageReviews: {
    whiteSpace: 'nowrap',
  },
  imageReview: {
    display: 'inline-block',
    marginRight: '3%', // 이미지 사이의 간격 조정
  },
  review: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1%', // 리뷰 사이의 간격 조정
  },
  thumb: {
    cursor: 'pointer',
    marginRight: '0.5%', // 따봉 아이콘과 텍스트 사이의 간격 조정
  },
  bar: {
    borderRadius: '20px', // 막대 그래프 모양을 둥글게 조정
    height: '2%', // 막대 그래프 두께 조정
  },
};

// 리뷰 작성 폼 컴포넌트
const ReviewForm = () => {
  return (
    <div className="review-form" style={{ width: '100%' }}>
      {/* 리뷰 작성 폼 UI */}
    </div>
  );
};

// 별점 평가 옵션 컴포넌트
const RatingOption = ({ option, count, maxCount, increaseCommentCount }) => {
  const barWidth = (count / maxCount) * 100; // 막대 그래프의 너비 계산

  return (
    <div style={{ marginBottom: '1%', width: '100%', marginRight: '1%'}}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div style={{ width: '20%', marginRight: '1%' }}>{option}</div>
        <div style={{ width: '100%', position: 'relative', height: '30px', backgroundColor: 'lightgray', borderRadius: '20px' }}>
          <div style={{ position: 'absolute', width: `${barWidth}%`, height: '100%', backgroundColor: 'gray', borderRadius: '20px' }}></div>
        </div>
      </div>
    </div>
  );
};

const RatingOptions = ({ commentCounts, increaseCommentCount }) => {
  const maxCount = Math.max(...Object.values(commentCounts)); // 최대 댓글 수 계산

  return (
    <div className="bar-chart" style={{ width: '100%' }}>
      {[5, 4, 3, 2, 1].map((rating, index) => (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} key={index}>
          <RatingOption
            option={`${rating}점`}
            count={commentCounts[rating]}
            maxCount={maxCount}
            increaseCommentCount={() => increaseCommentCount(rating)}
          />
          <span style={{marginBottom: '2%',}}>
            ({commentCounts[rating] !== undefined ? commentCounts[rating] : 0})
          </span>
        </div>
      ))}
    </div>
  );
};


const ProductReviews = ({reviews, item}) => {
  const [selectedRating] = useState(null);
  const [commentCounts, setCommentCounts] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  });

  useEffect(() => {
    const newCommentCounts = {};
    reviews.forEach(review => {
      const rating = review.sta / 10;
      newCommentCounts[rating] = (newCommentCounts[rating] || 0) + 1;
    });
    setCommentCounts(newCommentCounts);
  }, [reviews]);

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const [sortBy, setSortBy] = useState('latest'); // 추가: 정렬 옵션 상태

  const sortedReviews = reviews.sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.regDate) - new Date(a.regDate);
    } else if (sortBy === 'highest') { // 추가: 별점 높은 순 정렬
      return b.sta - a.sta;
    } else if (sortBy === 'lowest') { // 추가: 별점 낮은 순 정렬
      return a.sta - b.sta;
    }
  });

  const filteredReviews = selectedRating
    ? sortedReviews.filter(review => review.sta === selectedRating)
    : sortedReviews;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  const handlePageChange = (event, page) => setCurrentPage(page);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // 추가: 리뷰 수정 모달 열고 닫기를 위한 상태
  const [editModalOpen, setEditModalOpen] = useState(false);
  // 추가: 현재 수정 중인 리뷰 정보를 담을 상태
  const [editingReview, setEditingReview] = useState(null);

  // 추가: 리뷰 수정 모달 열기
  const handleEditReview = (review) => {
    setEditingReview(review);
    setEditModalOpen(true);
  };

  // 추가: 리뷰 수정 모달 닫기
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    // 수정이 완료되면 리뷰 목록을 다시 불러올 수 있도록 하거나 상태를 업데이트할 수 있습니다.
  };

  return (
    <div className="product-reviews" style={{ width: '100%' }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <div className="left-panel" style={{ width: '20%' }}>
          <h2>Review</h2>
          <Rating item={item} strSize={22} />
          <ReviewForm />
          <div className="write-review">
            {/* <button onClick={handleWriteReview} style={{marginTop: '5%'}}>상품 리뷰 작성하기</button> */}
          </div>
        </div>
        <Divider orientation="vertical" flexItem style={{marginRight: '5%'}}/>
        <div className="right-panel" style={{ width: '45%' }}>
          <h2>별점 평가</h2>
          <RatingOptions
            commentCounts={commentCounts}
          />
        </div>
      </Stack>
      <div className="bottom-panel" style={{ width: '100%' }}>
        <div className="sort-options" style={{ width: '100%' }}>
          {/* 정렬 옵션 선택 */}
          <select onChange={handleSortChange} style={{ width: 100 }}>
            <option value="latest">최신순</option>
            <option value="highest">별점 높은 순</option> {/* 추가: 별점 높은 순 */}
            <option value="lowest">별점 낮은 순</option> {/* 추가: 별점 낮은 순 */}
          </select>
        </div>
      </div>

      {/* 리뷰 목록 */}
      <div className="reviews" style={{ width: '100%' }}>
        {currentReviews.map(review => (
          <div key={review.bid} style={{ marginBottom: '2%', paddingBottom: '1%', borderBottom: '1px solid lightgray' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1%' }}>
              <p style={{ marginRight: '1%' }}>{review.email}</p>
              <p style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: '12px' }}>{new Date(review.regDate).toLocaleDateString().slice(0, -1)}</p>
              {/* 수정 버튼 */}
              <button onClick={() => handleEditReview(review, item)} style={{ marginLeft: 'auto' }}>수정</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1%' }}>
              <StarRatings rating={review.sta} />
              <span style={{ marginLeft: '0.5%' }}>{review.sta / 10 + '점'}</span>
            </div>
            <p style={{ marginBottom: '1%' }}>{review.content}</p>
            {review.img && <ImgModal img={review.img} />}
          </div>
        ))}
      </div>

      {/* 페이지네이션 UI */}
      <div className="pagination" style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={Math.ceil(filteredReviews.length / reviewsPerPage)} page={currentPage} onChange={handlePageChange} />
      </div>

      {/* 추가: 리뷰 수정 모달 */}
      {editModalOpen && (
        <ReviewEditModal
          open={editModalOpen}
          handleClose={handleCloseEditModal}
          review={editingReview}
          item={item}
        />
      )}
    </div>
  );
};

export default ProductReviews;
