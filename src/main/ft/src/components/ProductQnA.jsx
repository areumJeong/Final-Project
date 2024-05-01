import React, { useState } from 'react';
import { Pagination, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImgModal from './ImgModal';

export default function ProductQnA({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("전체");
  const [expandedPost, setExpandedPost] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    setExpandedPost(null);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setCurrentPage(1);
    setExpandedPost(null);
  };

  const handlePostClick = (index) => {
    setExpandedPost(expandedPost === index ? null : index);
  };

  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const filteredPosts = selectedType === "전체" ? posts : posts.filter(post => post.typeQnA === selectedType);
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <TableContainer style={{ overflow: 'hidden' }}>
        <Table style={{ width: '100%' }}>
          <TableHead>
              <TableRow>
                  <TableCell style={{ width: isMobile ? '20%' : '10%' }}>
                      <Select
                          value={selectedType}
                          onChange={handleTypeChange}
                          style={{ border: 'none', backgroundColor: 'transparent', boxShadow: 'none', fontWeight: 'bold', width: '100%', fontSize: '80%' }}
                      >
                          <MenuItem value="전체">전체</MenuItem>
                          <MenuItem value="결제">결제</MenuItem>
                          <MenuItem value="상품">상품</MenuItem>
                          <MenuItem value="배송">배송</MenuItem>
                          <MenuItem value="환불">환불</MenuItem>
                          <MenuItem value="교환">교환</MenuItem>
                      </Select>
                  </TableCell>
                  <TableCell style={{ width: isMobile ? '20%' : '10%', fontWeight: 'bold', fontSize: '80%' }}>답변</TableCell>
                  <TableCell style={{ width: isMobile ? '60%' : '40%', fontWeight: 'bold', textAlign: 'center', fontSize: '80%' }} align="center">제목</TableCell>
                  <TableCell style={{ width: isMobile ? '20%' : '20%', fontWeight: 'bold', fontSize: '80%' }}>작성자</TableCell>
                  <TableCell style={{ width: isMobile ? '10%' : '10%', fontWeight: 'bold', fontSize: '80%' }}>작성일</TableCell>
                  <TableCell style={{ width: isMobile ? '10%' : '10%', fontWeight: 'bold', fontSize: '80%' }}></TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {currentPosts.map((post, index) => (
                  <React.Fragment key={index}>
                      <TableRow onClick={() => handlePostClick(index)} style={{ cursor: 'pointer' }}>
                          <TableCell style={{ fontSize: '80%' }}>{post.typeQnA}</TableCell>
                          <TableCell style={{ fontSize: '80%' }}> </TableCell>
                          <TableCell style={{ fontSize: '80%' }}>{post.title}</TableCell>
                          <TableCell style={{ fontSize: '80%' }}>{post.email}</TableCell>
                          <TableCell style={{ fontSize: '80%' }}>{new Date(post.regDate).toLocaleDateString().slice(0, -1)}</TableCell>
                      </TableRow>
                      {expandedPost === index && (
                          <TableRow>
                              <TableCell colSpan={5}>
                                  <Accordion expanded={expandedPost === index}>
                                      <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1bh-content"
                                          id="panel1bh-header"
                                      >
                                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                                              <Typography style={{ minHeight: '150px', marginRight: '10px', fontSize: '100%' }}>
                                                  {post.content}
                                              </Typography>
                                              {post.img && <ImgModal style={{ width: 100 }} img={post.img} />}
                                          </div>
                                      </AccordionSummary>
                                  </Accordion>
                              </TableCell>
                          </TableRow>
                      )}
                  </React.Fragment>
              ))}
          </TableBody>
      </Table>
    </TableContainer>
      <div className="pagination" style={{ marginTop: '20px', justifyContent: 'center', display: 'flex'}}>
        <Pagination
          count={Math.ceil(filteredPosts.length / postsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
   </>
  );
}
