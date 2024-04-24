import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { Typography } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import styled from 'styled-components';

const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StarIcon = styled.svg`
  width: 22px;
  height: 20px;
`;

const Star = ({ idx, height }) => (
  <div className='star_icon' key={idx}>
    <StarIcon xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 13' fill='#cacaca'>
      <clipPath id={`${idx}StarClip`}>
        <rect width={height} height='39' />
      </clipPath>
      <path
        id={`${idx}Star`}
        d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
        transform='translate(-2 -2)'
      />
      <use clipPath={`url(#${idx}StarClip)`} href={`#${idx}Star`} fill='#FFB300' />
    </StarIcon>
  </div>
);


export default function ItemDetail() {
  const { iid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState({});
  const [options, setOptions] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]); // 선택된 옵션 배열을 관리합니다.
  const [timeRemaining, setTimeRemaining] = useState(''); // 남은 시간을 보여줄 상태값 추가
  const [totalPrice, setTotalPrice] = useState(0); // 총 가격을 저장할 상태값 추가

  useEffect(() => {
    axios.get(`/ft/item/detail/${iid}`)
      .then(response => {
        const { item, options, tags } = response.data;

        const formattedItem = {
          iid: item.iid,
          name: item.name,
          category: item.category,
          img1: item.img1,
          img2: item.img2,
          img3: item.img3,
          price: item.price,
          saleDate: item.saleDate,
          salePrice: item.salePrice,
          totalSta: item.totalSta,
        };
        setItem(formattedItem);

        const formattedOptions = options ? options.map(option => ({
          option: option.option,
          stock: option.count, // 재고갯수
          count: 0, // 수량
          price: option.price, // 가격
        })) : [];
        setOptions(formattedOptions);

        const formattedTags = tags ? tags.map(tag => ({
          itid: tag.itid,
          tag: tag.tag,
        })) : [];
        setTags(formattedTags);

        setIsLoading(false);
      })
      .catch(err => console.log(err))
  }, [iid]);

  // 수량 증가 함수
  const increaseQuantity = (index) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index].count += 1;
    setSelectedOptions(updatedSelectedOptions);
  };

  // 수량 감소 함수
  const decreaseQuantity = (index) => {
    const updatedSelectedOptions = [...selectedOptions];
    if (updatedSelectedOptions[index].count > 1) {
      updatedSelectedOptions[index].count -= 1;
      setSelectedOptions(updatedSelectedOptions);
    }
  };

  // 옵션 선택 시 처리 함수
  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    const optionIndex = options.findIndex(option => option.option === selectedOption);
    if (optionIndex !== -1) {
      // 선택된 옵션이 배열에 있을 경우, 해당 옵션의 수량을 초기화합니다.
      const updatedOptions = [...options];
      updatedOptions[optionIndex].count = 1;
      if (isOptionAlreadySelected(selectedOption)) {
        // 이미 선택된 옵션인 경우 알림창을 띄우고 함수를 종료합니다.
        alert('이미 옵션이 선택되어 있습니다.');
        return;
      }
      setSelectedOptions([...selectedOptions, updatedOptions[optionIndex]]);
    }
  };

  // 이미 선택된 옵션인지 확인하는 함수
  const isOptionAlreadySelected = (selectedOption) => {
    return selectedOptions.some(option => option.option === selectedOption);
  };

  // 옵션 삭제 함수
  const removeOption = (index) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions.splice(index, 1);
    setSelectedOptions(updatedSelectedOptions);
  };

  // 타이머 함수
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      if (item.saleDate) {
        const targetDateTime_ = item.saleDate.replace("T", " ");
        const targetDateTime = targetDateTime_.replace("-", "/");
        const endTime = new Date(targetDateTime);
        const timeDifference = endTime.getTime() - now.getTime();

        if (timeDifference > 0) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          if (days === 0) {
            setTimeRemaining(`${twoDigit(hours)}:${twoDigit(minutes)}:${twoDigit(seconds)}`);
          } else {
            setTimeRemaining(`${days}일${twoDigit(hours)}:${twoDigit(minutes)}:${twoDigit(seconds)}`);
          }
        } else {
          clearInterval(intervalId); // 타이머 종료
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [item.saleDate]);
  
  // 두 자리 숫자로 변환하는 함수
  function twoDigit(num) {
    return (num < 10) ? '0' + num : String(num);
  }

  // 총 가격 계산 함수
  useEffect(() => {
    let totalPrice = 0;
    selectedOptions.forEach(option => {
      totalPrice += option.count * Number(document.getElementById('currentPrice').innerText); // 옵션의 수량과 현재 가격을 곱하여 총 가격에 더합니다.
    });
    setTotalPrice(totalPrice);
  }, [selectedOptions]);

  //
  const [popularity, setPopularity] = useState();

  useEffect(() => {
    if (item && item.totalSta) {
      setPopularity(item.totalSta / 10);
    }
  }, [item]);

  const STAR_IDX_ARR = ['1', '2', '3', '4', '5'];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);

  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (popularity * 70) / 5;

    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;

    return tempStarRatesArr;
  };

  useEffect(() => {
    setRatesResArr(calcStarRates());
  }, [popularity]);

  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7} style={{ padding:50, textAlign: 'center' }}>
        <img src={item.img1} alt={item.img1} style={{ width: '80%', height: 400 }} />
        <StarWrapper>
          {STAR_IDX_ARR.map((item, idx) => (
            <Star idx={idx} height={ratesResArr[idx]} />
          ))}
          <span>{popularity}</span>
        </StarWrapper>
      </Grid>
      <Grid item xs={12} md={5} style={{padding:50}}>
        <Typography variant="h5" gutterBottom>
          {item.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {timeRemaining}
        </Typography>
        <div style={{ marginBottom: '10px' }}>
          <span style={item.salePrice && new Date(item.saleDate) > new Date() ? { textDecoration: 'line-through', lineHeight: '1.5', fontSize: 'small' } : {}}>
            {item.saleDate && new Date(item.saleDate) > new Date() ? `${item.price}원` : ''}
          </span><br/>
          <span id="currentPrice">{item.saleDate && new Date(item.saleDate) > new Date() ? item.salePrice : item.price}</span><span>원</span>
        </div>
        <div style={{ marginBottom: '10px' }}>
        <Select
          value=''
          onChange={handleOptionChange}
          displayEmpty
          title="옵션 선택"
          fullWidth
          style={{ width: '80%' }}
          MenuProps={{ PaperProps: { style: { width: 'max-content' } } }} // 옵션 메뉴 너비를 내용에 맞게 조정
        >
          <MenuItem value='' disabled>옵션 선택</MenuItem>
          {options.map(option => (
            <MenuItem key={option.option} value={option.option} style={{ justifyContent: 'space-between' }}>
              <span>{option.option}</span>
              <span>{option.stock}개</span>
            </MenuItem>
          ))}
        </Select>
        {selectedOptions.map((option, index) => (
          <Box 
            key={index} 
            display="flex" 
            alignItems="center" 
            marginBottom={1} 
            p={1} // padding 추가
            borderRadius={1} // 라운드 처리
            boxShadow={2} // 그림자 효과
            bgcolor="#f5f5f5" // 배경색 지정
            border="1px solid #ccc" // 테두리 스타일 지정
            style={{width:'65%', marginTop:5}}
          >
            <Typography variant="body1">
              {option.option}
            </Typography>
            <Button onClick={() => decreaseQuantity(index)}>-</Button>
            <Input
              value={option.count}
              readOnly
              style={{ width: `${(option.count.toString().length) * 10}px`}}
              disableUnderline 
            />
            <Button onClick={() => increaseQuantity(index)}>+</Button>
            <Button onClick={() => removeOption(index)}>X</Button>
          </Box>
        ))}
        </div>
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          총 가격: {totalPrice}원
        </Typography>
        <Button variant="contained" color="primary" style={{ marginBottom: '10px' }}>구매하기</Button>
        <Button variant="contained" color="primary" style={{ marginBottom: '10px', marginLeft:5 }}>장바구니</Button>
        <Button variant="contained" color="primary" style={{ marginBottom: '10px', marginLeft:5 }}>찜</Button>
      </Grid>
      <Grid item xs={12} md={12} style={{ padding:50, textAlign: 'center' }}>
        <img src={item.img2} alt={item.img2} style={{ width: '90%' }} />
        <img src={item.img2} alt={item.img2} style={{ width: '90%' }} />
      </Grid>
    </Grid>
  )
}