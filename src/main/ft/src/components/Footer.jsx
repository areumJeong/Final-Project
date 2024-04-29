import React from 'react';
import '../css/footer.css';
import { Grid } from '@mui/material';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-sections">
          <section className="footer-section">
            <h2>About Us</h2>
            <p>회사 소개</p>
          </section>
          <section className="footer-section">
            <h2>Members</h2>
            <p>로그인, <a href="회원가입 페이지 URL" target="_blank">회원가입</a></p>
          </section>
          <section className="footer-section">
            <h2>CS Center</h2>
            <p>1577-1577</p>
          </section>
          <section className="footer-section">
            <h2>My Page</h2>
            <p><a href="주문 조회 페이지 URL" target="_blank">주문 조회</a>찜 목록</p>
          </section>
          <section className="footer-section">
            <h2>Help</h2>
            <p><a href="공지사항 페이지 URL" target="_blank">공지사항</a>, <a href="문의사항 페이지 URL" target="_blank">문의사항</a></p>
          </section>
        </div>
      </div>
      <div className="footer-info">
        <span>상호명 : (주)FUNniture | </span> 
        <span>대표 : 정아름 | </span>
        <span>주소 : 수원시 팔달구 매산로 30 | </span>
        <span>메일 : daniel07@gmail.com | </span>
        <span>사업자 번호 : 105-55-55555 | </span><br />
        <span>copyright 2024 www.FUNniture.com All rights reserved. </span>
      </div>
    </footer>
  );
}

export default Footer;