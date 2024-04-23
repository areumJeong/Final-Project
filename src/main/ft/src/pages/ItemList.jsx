import React, { useEffect, useState } from "react";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { lineHeight } from "@mui/system";

export default function ItemList() {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState([]);

  useEffect(() => {
    axios.get('/ft/item/list')
      .then(res => {
        setList(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const updatedTimes = list.map(item => {
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
              return `${twoDigit(hours)}:${twoDigit(minutes)}:${twoDigit(seconds)}`;
            } else {
              return `${days}일${twoDigit(hours)}:${twoDigit(minutes)}:${twoDigit(seconds)}`;
            }
          } else {
            return ;  //'경매 종료';
          }
        };
      });
  
      setTimeRemaining(updatedTimes);
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [list]);

  function twoDigit(num) {
    return (num < 10) ? '0' + num : String(num);
  }

  return (
    <>
      <Grid container spacing={2}>
        {list.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper style={{ padding: 20, height: 300 }}>
              <img src={item.img1} alt={'img'} style={{ width: '100%', height: 200 }} />
              <table>
                <tbody>
                  <tr>
                    <td>{timeRemaining[index] ? <Typography variant="p">{timeRemaining[index]}</Typography> : <Typography variant="p">&nbsp;</Typography>}</td>
                  </tr>
                  <tr>
                    <td>{item.name ? <Typography variant="h6">{item.name}</Typography> : <Typography variant="h6">&nbsp;</Typography>}</td>
                  </tr>
                  <tr>
                    <td>
                      {item.price ? (
                        <Typography variant="body2" style={item.salePrice && new Date(item.saleDate) > new Date() ? { textDecoration: 'line-through', lineHeight: '1.5', fontSize: 'small' } : {}}>
                          {item.price}원
                        </Typography>
                      ) : (
                        <Typography variant="body2">&nbsp;</Typography>
                      )}
                    </td>
                  </tr>
                  {item.salePrice !== 0 && item.salePrice && new Date(item.saleDate) > new Date() && (
                    <tr>
                      <td><Typography variant="body2">{((item.price - item.salePrice) / item.price * 100).toFixed(0)}%</Typography></td>
                      <td><Typography variant="body2">{item.salePrice}원</Typography></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )
}