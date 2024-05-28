import React, { useEffect } from 'react';
import { Cloudinary, CloudConfig } from '@cloudinary/url-gen';

const ImgUpload = () => {
  useEffect(() => {
    const run = async () => {
      try {
        // Cloudinary 설정
        const cloudConfig = new CloudConfig({
          cloudName: process.env.REACT_APP_CLOUDINARY_API_KEY,
          apiKey: process.env.REACT_APP_CLOUDINARY_API_NUMBER_KEY,
          apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET_KEY
        });

        const cloudinary = new Cloudinary({ cloud: cloudConfig });

        // 이미지 변환
        const url = cloudinary.image('j9m0sxiqcmz7f2xv4vgy', {
          transformation: [
            { effect: 'j9m0sxiqcmz7f2xv4vgy' },
            { width: 300, height: 300, crop: 'fill' }, // 예시로 넣은 변환 지침
            // 기타 변환 지침들 추가
          ]
        });
        

        console.log(`\nThis is the fully transformed generated URL:\n\n${url}\n`);
      } catch (error) {
        console.log('Something went wrong! Error:', error);
      }
    };

    run();
  }, []);

  return (
    <div className="App-body">
      <h1>React Quick Start</h1>
      {/* 이미지를 표시하는 컴포넌트 추가 */}
    </div>
  );
};

export default ImgUpload;
