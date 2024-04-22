import React, { useEffect, useState } from "react";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function ItemList() {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('/ft/item/list')
      .then(res => {
        setList(res.data)
        setIsLoading(false);
        console.log(res.data);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        {list.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper style={{ padding: 20 }}>
              <img src={item.img1} alt={'img'} style={{width:'100%', height:250}}/>
              <Typography variant="subtitle1">{item.name}</Typography>
              
              {(item.salePrice === 0) ? <Typography variant="body2">{item.price}</Typography> :
              <Typography variant="body2">Sale Price: {item.salePrice}</Typography>}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )
}