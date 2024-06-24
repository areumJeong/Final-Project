# 가구 쇼핑몰 FURNiture
가구를 다루는 쇼핑몰 웹사이트입니다. 쇼핑몰의 일반적인 기능들에 직관적인 UI를 추가했습니다.
또한 관리자로 로그인 시 관리자를 위한 상품 추가, 회원 전체의 주문내역 보기, 통계 페이지 등을 제공합니다.

# FURNiture 영상
- 배포 중단 관계로 시연영상으로 대체
- [![Video Label](https://i.ytimg.com/vi/MfuXneddQo8/hqdefault.jpg?sqp=-oaymwE2CPYBEIoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgBqgeAAtAFigIMCAAQARhlIGUoZTAP&rs=AOn4CLDRDGLgA1YnJaiYybY-sKx9lgljww)](https://www.youtube.com/watch?v=MfuXneddQo8)

# 프로젝트 기간
- 2024년 4월 16일 ~ 2024년 6월 14일

# 역할 분담
- 이강성: 상품, 리뷰, 문의의 기능과 결제(toss), 택배(DeliveryTracker), Karlo, cloudinary api, 통합, 배포
- 송햇님: 택배(스마트택배) API, 주문내역캘린더, 문의, 비회원주문, 개발자페이지, 하트 토글
- 정아름: 후기, 회원 주문, footer, ERD, 통계(상품 분석), 실시간 검색어
- 박성민: 주문, Firebase를 이용한 유저, 소셜로그인 기능과 RealtimeDB, Karlo, CoolSMS api, 배포
- 홍시표: 최근 상품, 장바구니와 관리자 분석, 통계 페이지, Azure api
- 김용현: 디자인, 유저인터페이스, 페이지 데이터 출력 기능 연결

# [1] 기술 스택
![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/5b77c38a-1026-4411-a1e4-659baab2391e)

# [2] 아키텍처
![아키텍쳐 drawio](https://github.com/Ape07Park/Human-Final-Project/assets/132667775/fd9907ed-339a-4555-9032-c205fa787aca)

# [3] 주요 기능
## 유저 관련 기능
<details>
  <summary><b>1. 회원가입 및 로그인</b> (👈 Click)</summary>
  <br>
  <div markdown="1">
    <h3>로그인</h3>
    <ul>
      <li>Firebase Authentication을 사용하여 로그인 기능 구현</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/7e72acca-af8f-4a17-8a83-714c0169b56f" alt="로그인">
       <li>Firebase Authentication을 사용하여 회원가입 기능 구현</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/2eb69b62-4fea-460e-b3f2-2de062cda279" alt="로그인">
  </ul>
  </div>
</details>

 <details>
  <summary><b>2. 유저 마이페이지</b> (👈 Click)</summary>
  <br>
  <div markdown="1">
    <ul>
      <li>Firebase Realtime DB를 이용하여 유저 정보 저장 및 관리</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/254bf3b4-babf-4620-a069-2b4180276bb0" alt="로그인">
  </ul>
  </div>
</details>

  <details>
  <summary><b>3. 유저 정보 수정</b> (👈 Click)</summary>
  <br>
  <div markdown="1">
    <ul>
      <li>Firebase Authentication 및 Realtime DB를 통해 유저 정보 업데이트</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/e44fc74c-4550-4ba3-b1e8-186e4c93b88a" alt="로그인">
  </ul>
  </div>
</details>

 <details>
  <summary><b>4. 이메일로 비밀번호 변경</b> (👈 Click)</summary>
  <br>
  <div markdown="1">
    <ul>
      <li>Firebase Authentication을 이용하여 이메일로 비밀번호 변경 기능 제공</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/3bb2f4ad-d65b-4ced-a880-de6f03bfd2f3" alt="로그인">
       
  <li>이메일 변경을 위한 이메일 입력 모달</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/017a8a55-bcbe-4ba8-8d24-82eacdf46087" alt="로그인">
       
  <li>이메일 입력 시 변경됨</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/d7b9a39c-aa91-44c7-a56c-abe8669fae45" alt="로그인">

  <li>이메일</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/4069e2d1-947b-40f1-9c40-2b824bce4bdb" alt="로그인">

  <li>이메일로 비밀번호 변경</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/0e715eaa-0de6-4600-83b9-fe7a5a9e6ff1" alt="로그인">
  </ul>

   <li>이메일로 비밀번호 변경 완료</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/99f5e50b-1745-4510-8300-1284aeffaafe" alt="로그인">
  </ul>  
  </div>
</details>

 <details>
  <summary><b>5. SMS로 비밀번호 변경</b> (👈 Click)</summary>
  <br>
  <div markdown="1">
    <ul>
      <li>CoolSMS API를 활용하여 SMS 전송 기능을 통해 비밀번호 변경 기능 구현</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/5a29b2eb-af84-4af1-a1ab-d53dacc6ef0b" alt="로그인">

  <li>인증코드 확인</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/2adb478e-e284-480a-a563-c4ccc32ccabb" alt="로그인">

   <li>비밀번호 입력</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/a0f2a854-fd6d-4c00-83e0-786bb9a3ef3f" alt="로그인">   
  </ul>
  </div>
</details>

<details>
  <summary><b>6. SMS로 아이디 찾기</b> (👈 Click)</summary>
  <br>
  <div markdown="1">
    <ul>
      <li>CoolSMS API를 활용하여 SMS 전송 기능을 통해 아이디 찾기 기능 구현</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/f31d8c7f-d96c-4d3e-aba5-fadce20ac859" alt="로그인">

  <li>인증코드 확인</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/2adb478e-e284-480a-a563-c4ccc32ccabb" alt="로그인">

   <li>비밀번호 입력</li>
  <img src="https://github.com/Ape07Park/Human-Final-Project/assets/132667775/91770945-035c-4d0a-be3a-7096f9e78c78" alt="로그인">   
  </ul>
  </div>
</details>

## 상품 관련 기능
1. 상품 리스트 및 상세 페이지
 - MySQL로 데이터를 관리 상품 정보 저장 및 상품 리스트 구현
2. 리뷰 및 해시태그
 - 상품 상세 페이지에서 사용자 리뷰 및 해시태그 관리
3. 검색 기능
 - 데이터베이스 검색 기능을 구현하여 상품 검색 지원
4. 세일 및 장바구니
 - 장바구니 기능을 구현하고, 상품의 할인 정보 관리
5. 상품 저장 및 수정 삭제
 - 관리가 저장한 상품 관리 및 수정 삭제 기능 제공
6. 마음에 드는 상품 찜 기능 + AI 방 배경 그리기
 - 사용자가 찜한 상품 리스트와 Azure의 Computer Vision API를 사용하여 이미지에서 배경을 자동으로 제거, Karlo의 AI 이미지 편집 기능으로 배경 생성 기능 제공

## 주문 및 결제 관련 기능
1. 주문 및 결제
 - Toss API를 통해 결제 처리 및 결제 상태 관리
2. 송장번호 조회 및 현재 배달 상태
 - DeliveryTracker API를 사용하여 송장번호 조회 및 배송 상태 관리
3. 구매 내역 관리
 - 데이터베이스에 구매 내역 저장 및 관리
  
## 관리자 관련 기능
1. 상품 관리
 - 관리자 페이지에서 상품 등록, 수정, 삭제 기능 구현
2. 문의내역 관리
 - 관리자 페이지에서 사용자 문의 내역 관리
3. 주문 내역 관리
 - 관리자 페이지에서 주문 정보 확인 및 처리
4. 상품 통계
 - 데이터베이스에서 추출한 데이터를 기반으로 한 상품 판매 통계 제공

## api
- Firebase Authentication
- Firebase Realtime DB
- Cloudinary
- Toss
- DeliveryTracker
- Chart.js
- Karlo
- CoolSMS
- Azure

# [4] 업무 플로우
![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/56fda504-e0bf-4460-bc2c-1721d16251a0)

# [5] ERD
![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/1acb14e4-d903-44ff-9902-b30729a0a6ce)

# [6] API 명세
![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/3a5ba29d-a5d8-4643-9bef-6842265f0861)

# [7] 서비스 구성
## [1] 메인![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/cef4c586-bb21-4fd9-ac71-f3ec1e1889ee)

## [2] 로그인![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/91ddb2eb-a178-45bc-bf64-87185a219a79)

## [3] 회원가입![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/cd84c275-dca3-42fa-b113-e7758887eecc)

## [4] 회원정보![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/782563ef-7db7-495a-8111-96400f32e900)

## [5] 회원정보 수정![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/65902505-9ee6-4c7f-978f-b5806efb5235)

## [6] 아이템 검색 ![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/151fd74f-438e-454c-acf4-b25c796ca94c)

## [7] 아이템 상세![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/696c7589-d2a8-42e4-af03-e13360904132)

## [8] 아이템 리뷰![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/335d699d-c03a-43a6-8ba9-89f282658536)

## [9] 아이템 문의![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/4951ec35-07e9-4519-982c-1b932a7c39a9)

## [10] 장바구니![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/a63801af-51e0-4fa6-ae77-08238b58714b)

## [11] 주문![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/290f05a2-42b4-4367-a36a-df31e5e236dc)

## [12] 결재![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/96db6560-8e11-4ec0-8b79-729abfeccdb5)

## [12] 주문내역![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/74912a80-fb41-4922-8fa7-7ce305b7b5ee)


## [13] 아이템 정보(관리자)![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/cdf30b48-a3c6-47b0-a61f-ffa2c2f24f8f)


## [14] 문의 내역(관리자)![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/a9f3e171-849e-4229-aa28-dfce967c7ec8)


## [15] 전체 주문 내역(관리자)![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/06182462-31eb-4925-b5ac-02d84ed52a01)


## [16] 통계(관리자)![image](https://github.com/Ape07Park/Final-project-24.05-integralation/assets/132667775/7d210218-f211-41c0-907b-46da6030a680)






