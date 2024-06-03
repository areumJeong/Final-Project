import axios from 'axios';

// order
export const orderHistoryList = async (email) => {
  try {
    const response = await axios.post(`/ft/order/historyList`, { email }); // 데이터 가져오기
    return response.data; // 가져온 데이터 반환
  } catch (error) {
    console.log('데이터를 불러오는 중 에러:', error);
    throw error;
  }
};

export const orderInsert = async (orderData) => {
  try {
    const response = await axios.post('/ft/order/insert', orderData); // 데이터 가져오기
    return response.data; // 가져온 데이터 반환
  } catch (error) {
    console.log('데이터를 불러오는 중 에러:', error);
    throw error;
  }
};

export const confirmPayment = async (requestData) => {
  try {
    const response = await fetch('ft/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  } catch (error) {
    console.log('Error confirming payment:', error);
    throw error;
  }
};