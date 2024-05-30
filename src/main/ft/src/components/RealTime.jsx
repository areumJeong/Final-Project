import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem, Box, Typography } from '@mui/material'; // Button과 Menu를 추가해줍니다.

const queryClient = new QueryClient();

export default function RealTime() {
  return (
    <QueryClientProvider client={queryClient}>
      <RealTimeContent />
    </QueryClientProvider>
  );
}

function RealTimeContent() {
  const { data: listData, error, refetch } = useQuery('realTimeList', async () => {
    const response = await axios.get('/ft/realTime/list');
    return response.data;
  }, {
    refetchInterval: 5000, 
  });

  const [rank, setRank] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null); // 메뉴를 열기 위한 상태 추가
  const navigate = useNavigate();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRank(prevRank => (prevRank === 9 ? 0 : prevRank + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const styles = {
    term: {
      fontSize: '15px',
    },
    rank: {
      color: 'orange',
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
      marginLeft: 20
    },
    rankName: {
      fontFamily: 'Arial, sans-serif',
      marginLeft: 15,
      cursor: 'pointer',
    }
  };

  // 순위 보기 버튼 클릭 시 드롭다운 메뉴 열기
  const handleListOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // 드롭다운 메뉴 닫기
  const handleListClose = () => {
    setAnchorEl(null);
  };

  // 드롭다운 메뉴에서 아이템 선택 시 해당 아이템 페이지로 이동
  const handleMenuItemClick = (query) => {
    navigate(`/itemlist/${query}`);
    handleListClose(); // 메뉴를 닫습니다.
  };

  if (error) return <div>Error fetching data</div>;
  if (!listData) return <div>Loading...</div>;

  return (
    <Box>
      <div style={styles.term}>
        <span style={styles.rank}>{(rank + 1).toString().padStart(2, '0')}</span>
        <span style={styles.rankName} onClick={handleListOpen}>
          {listData[rank]?.query}
        </span>
        {/* 순위 보기 메뉴 */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleListClose}
          PaperProps={{
            style: {
              width: '300px', // 메뉴 너비 조정
              transform: 'translate(-100px, 10px)', // 메뉴를 왼쪽으로 이동 및 아래로 이동
            },
          }}
          disableScrollLock 
        >
          <Box sx={{ px: 2, pb: 2, mt: 2 }}>
            <Typography variant="subtitle2" color="textSecondary" align="center" gutterBottom>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} {/* 현재 날짜 표시 */}
            </Typography>
            <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
              실시간 쇼핑 검색어
            </Typography>
          </Box>
          {listData.map((item, index) => (
            <MenuItem key={index} onClick={() => handleMenuItemClick(item.query)}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: 'orange', marginRight: 1 }}>
                  {(index + 1).toString().padStart(2, '0')}
                </Typography>
                <Typography variant="body1" sx={{ color: 'black' }}>
                  {item.query}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Box>
  );
}

