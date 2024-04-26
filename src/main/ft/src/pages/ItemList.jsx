import React, { useEffect, useState } from "react";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button, Stack } from "@mui/material";
import CountDown from "../components/CountDown";
import { useNavigate } from "react-router-dom";

export default function ItemList() {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/ft/item/list')
      .then(res => {
        setList(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      <Button onClick={() => { navigate(`/admin/itemlist/`) }}>어드민</Button>
      <Grid container spacing={2}>
        {list.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper style={{ padding: 20, height: 320 }} onClick={() => { navigate(`/item/detail/${item.iid}`) }}>
              <img src={item.img1} alt={'img'} style={{ width: '100%', height: 200 }} />
              <table>
                <tbody>
                  <tr>
                    <td>{new Date(item.saleDate) > new Date() ? <CountDown saleDate={item.saleDate} /> : <Typography variant="h6">&nbsp;</Typography>}</td>
                  </tr>
                  <tr>
                    <td>
                      {item.name ? (
                        <Typography variant="body2" style={{ display: 'inline-block', lineHeight: '1.2', maxHeight: '2.4em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.name}
                        </Typography>
                      ) : (
                        <Typography variant="h6">&nbsp;</Typography>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                    {item.salePrice && new Date(item.saleDate) > new Date() ? (
                      <Typography variant="body2" style={{ textDecoration: 'line-through', lineHeight: '1.5', fontSize: 'small' }}>
                        {item.price.toLocaleString()}원
                      </Typography>
                    ) : (
                      <Typography variant="body2">&nbsp;</Typography>
                    )}
                    </td>
                  </tr>
                  {item.salePrice !== 0 && item.salePrice && new Date(item.saleDate) > new Date() && (
                  <tr>
                    <td>
                      <Stack direction={'row'} spacing={1} >
                        <Typography variant="body2">{((item.price - item.salePrice) / item.price * 100).toFixed(0)}%</Typography>
                        <Typography variant="body2">{item.salePrice.toLocaleString()}원</Typography>
                      </Stack>
                    </td>
                    <td></td>
                  </tr>
                )}
                {!(item.salePrice !== 0 && item.salePrice && new Date(item.saleDate) > new Date()) && (
                  <tr>
                    <td>
                      <Typography variant="body2">{item.price.toLocaleString()}원</Typography>
                    </td>
                    <td></td>
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