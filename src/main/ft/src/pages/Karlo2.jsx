import React, { useState } from 'react';
import axios from 'axios';

const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

const Karlo2 = () => {
  const [imageURL, setImageURL] = useState('');
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const variations = async (image) => {
    try {
      const response = await axios.post(
        'https://api.kakaobrain.com/v2/inference/karlo/variations',
        {
          version: 'v2.1',
          image: image,
          prompt: '',
          height: 1024,
          width: 1024
        },
        {
          headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      console.error('No image selected.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1]; // base64 데이터만 추출
      const response = await variations(base64String);
      if (response && response.images && response.images[0] && response.images[0].image) {
        setImageURL(response.images[0].image);
      }
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div>
      <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleImageUpload}>이미지 변환</button>
      {imageURL && <img src={imageURL} alt="Generated Image" />}
    </div>
  );
};

export default Karlo2;
