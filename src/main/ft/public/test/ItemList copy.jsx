// 일부부만 리액트쿼리로 재동기화 시키는 코드
import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CardMedia, CardContent, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CountDown from "../components/CountDown";
import { Items, getItemDetail } from "../components/Items";
import Rating from "../components/Rating";
import '../css/itemList.css'; 

const queryClient = new QueryClient();

export default function ItemList() {
  return (
    <QueryClientProvider client={queryClient}>
      <ItemListContent />
    </QueryClientProvider>
  );
}

function ItemListContent() {
  const navigate = useNavigate();
  const { searchQuery } = useParams();

  const { isLoading, data: list, refetch } = useQuery('items', Items, {
    refetchInterval: 5000, // 5초마다 새로고침
  });  

  const lowercaseSearchQuery = searchQuery ? searchQuery.toLowerCase() : ''; 
  const filteredItems = list ? list.filter(item => {
    const itemNameIncludes = item.name && item.name.toLowerCase().includes(lowercaseSearchQuery);
    const tagsIncludes = item.tags && item.tags.some(tag => tag.tag.toLowerCase().includes(lowercaseSearchQuery));
    const optionsIncludes = item.options && item.options.some(option => option.option.toLowerCase().includes(lowercaseSearchQuery));
    return itemNameIncludes || tagsIncludes || optionsIncludes;
  }) : [];

  return (
    <>
      <Grid container spacing={2} className="itemList">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          filteredItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index} marginBottom={5}>
              <Paper className="paper-item" onClick={() => { navigate(`/item/detail/${item.iid}`) }} sx={{ maxWidth: 300, paddingBottom: 0 }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={item.img1}
                  alt={item.name}
                  sx={{ mb: 1 }} // 이미지 아래 여백 추가
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" className="item-name" noWrap style={{ height: '2em' }}>
                    {item.name}
                  </Typography>
                  <Rating key={item.iid} item={item} strSize={16} className="item-rating" />
                  {new Date(item.saleDate) > new Date() && (
                    <CountDown saleDate={item.saleDate} />
                  )}
                  <Stack direction={'row'} justifyContent="space-between">
                    {item.salePrice !== 0 && item.salePrice && new Date(item.saleDate) > new Date() ? (
                      <>
                        <Typography variant="body2">{((item.price - item.salePrice) / item.price * 100).toFixed(0)}%</Typography>
                        <Typography variant="body2"  style={{ textDecoration: 'line-through', fontSize: '0.9rem', marginTop: '0.4px' }}>{item.price.toLocaleString()}원</Typography>
                        <Typography variant="body2" className="price">{item.salePrice.toLocaleString()}원</Typography>
                      </>
                    ) : (
                      <Typography variant="body2" className="price">{item.price.toLocaleString()}원</Typography>
                    )}
                  </Stack>
                </CardContent>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
