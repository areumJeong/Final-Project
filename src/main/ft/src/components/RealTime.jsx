import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

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

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRank(prevRank => (prevRank === 9 ? 0 : prevRank + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const styles = {
    term: {
      fontSize: '16px',
    },
    rank: {
      color: 'orange', // 숫자의 색상을 주황색으로 지정
      fontWeight: 'bold', // 굵은 글꼴로 설정
      fontFamily: 'Arial, sans-serif', // 원하는 둥근체 글꼴로 변경
      marginLeft: 20
    },
    rankName: {
      fontFamily: 'Arial, sans-serif', // 원하는 둥근체 글꼴로 변경
      marginLeft: 20
    }
  };

  if (error) return <div>Error fetching data</div>;
  if (!listData) return <div>Loading...</div>;

  return (
    <div style={styles.term}>
      <span style={styles.rank}>{(rank + 1).toString().padStart(2, '0')}</span>
      <span style={styles.rankName}>{listData[rank]?.query}</span>
    </div>
  );
}
