import React, { useEffect, useState } from "react";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CountDown from "../components/CountDown";

// 태그 스타일 정의
const tagStyle = {
  display: "inline-block",
  borderRadius: "999px",
  padding: "2px 8px",
  marginRight: "5px",
  fontSize: "0.7rem",
  fontWeight: "bold",
  color: "black",
  backgroundColor: "lightgrey",
  border: "1px solid grey",
};

export default function AdminItemList() {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState([]);
  const [stock, setStock] = useState([]); // 재고 상태 추가
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('/ft/item/list')
      .then(res => {
        setList(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    // 각 항목에 대한 iid 가져오기
    const itemIds = list.map(item => item.iid);
    // iid 배열을 사용하여 재고를 가져옵니다.
    itemIds.forEach((iid, idx) => {
      axios.get(`/ft/item/detail/${iid}`)
        .then(response => {
          const { options, tags } = response.data;
          const formattedOptions = options ? options.map(option => ({
            ioid: option.ioid,
            option: option.option,
            stock: option.count, // 재고갯수
            count: 0, // 수량
            price: option.price, // 가격
          })) : [];
          // 인덱스 값 사용하여 올바른 위치에 재고 정보를 설정합니다.
          setStock(prevStock => {
            const newStock = [...prevStock];
            newStock[idx] = formattedOptions;
            return newStock;
          });
          // 태그 설정
          const formattedTags = tags ? tags.map(tag => ({
            itid: tag.itid,
            tag: tag.tag,
          })) : [];
          // 각 항목에 대한 태그를 설정합니다.
          setTags(prevTags => {
            const newTags = [...prevTags];
            newTags[idx] = formattedTags;
            return newTags;
          });
        })
        .catch(err => console.log(err))
    });
  }, [list]);
  
  return (
    <>
      <Button onClick={() => { navigate(`/admin/item/insert`) }}>아이템 추가</Button>
      <Grid container spacing={2}>
        {list.map((item, index) => (
          <Grid item xs={6} sm={6} md={6} lg={6} key={index}>
            <Paper style={{ padding: 20 }}>
              <table style={{ width: '100%', height: 180 }}>
                <tbody>
                  <tr>
                    <td style={{ width: '30%', paddingRight: 20 }}>
                      <img src={item.img1} alt={'img'} style={{ width: '100%', height: 160, cursor: 'pointer' }} onClick={() => { navigate(`/item/detail/${item.iid}`) }}/>
                    </td>
                    <td style={{ verticalAlign: 'top' }}>
                      <Typography variant="h6">{item.name || '\u00A0'}</Typography>
                      <Typography variant="body2">정가: {item.price || '\u00A0'}원</Typography>
                      <Typography variant="body2">할인금액:
                        {item.salePrice !== 0 && item.salePrice && new Date(item.saleDate) > new Date() && (
                          <>{item.salePrice}원</>
                        )}
                      </Typography>
                      <Typography variant="body2">할인율:
                        {item.salePrice !== 0 && item.salePrice && new Date(item.saleDate) > new Date() && (
                          <>{((item.price - item.salePrice) / item.price * 100).toFixed()}%</>
                        )}
                      </Typography>
                      <Typography variant="body2">할인기간: {new Date(item.saleDate) > new Date() ? <CountDown saleDate={item.saleDate} /> : ''}</Typography>
                      <Typography variant="body2">평점: {item.totalSta / 10 || '\u00A0'}</Typography>
                      <Button variant="contained" color="primary" size="small" style={{ marginRight: 10 }} onClick={() => { navigate(`/admin/item/update/${item.iid}`) }}>수정</Button>
                      <Button variant="contained" color="primary" size="small" style={{ marginRight: 10 }}>세일</Button>
                      <Button variant="contained" color="secondary" size="small">삭제</Button>
                    </td>
                    <td style={{ verticalAlign: 'top' }}>
                      <Typography variant="h6">&nbsp;</Typography>
                      {stock[index]?.map((opt, idx) => (
                        <Typography key={idx} variant="body2">{opt.option}: {(opt.stock === 0) ? '품절' : opt.stock+'개'}</Typography>
                      ))}
                     {tags[index]?.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        style={{ 
                          display: "inline-block",
                          borderRadius: "999px",
                          padding: "2px 8px",
                          marginRight: "5px",
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                          color: "black",
                          backgroundColor: "lightgrey",
                          border: "1px solid grey",
                        }}
                        onClick={() => {/* 클릭 이벤트 처리 */}}
                      >
                        #{tag.tag}
                      </span>
                    ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
