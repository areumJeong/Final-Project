import React, { useState } from 'react';
import axios from 'axios';

export default function ItemInsert() {
  const [form, setForm] = useState({ name: '', category: '', img1: '', img2: '', img3: '', content: '', price: '', option: [], count: [], tag: [] });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  const handleOptionChange = (index, event) => {
    const newOptions = [...form.option];
    newOptions[index] = event.target.value;
    setForm({ ...form, option: newOptions });
  }

  const handleCountChange = (index, event) => {
    const newCounts = [...form.count];
    newCounts[index] = event.target.value;
    setForm({ ...form, count: newCounts });
  }

  const handleTagChange = (index, event) => {
    const newTag = [...form.tag];
    newTag[index] = event.target.value;
    setForm({ ...form, tag: newTag });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.option.every(opt => opt.trim() !== '') && form.count.every(cnt => cnt.trim() !== '')) {
      const requestData = {
        name: form.name,
        category: form.category,
        img1: form.img1,
        img2: form.img2,
        img3: form.img3,
        content: form.content,
        price: form.price,
        option: form.option,
        count: form.count,
        tag: form.tag
      };

      axios
        .post('/ft/item/insert', requestData)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {

    }
  }

  const handleAddOption = () => {
    setForm({ ...form, option: [...form.option, ''] });
  }

  const handleAddCount = () => {
    setForm({ ...form, count: [...form.count, ''] });
  }

  const handleAddTag = () => {
    setForm({ ...form, tag: [...form.tag, ''] });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>상품명:</label>
        <input type='text' name='name' value={form.name} onChange={handleChange} /><br />
        <label htmlFor='category'>가구종류:</label>
        <input type='text' name='category' value={form.category} onChange={handleChange} /><br />
        <label htmlFor='img1'>대표이미지:</label>
        <input type='text' name='img1' value={form.img1} onChange={handleChange} /><br />
        <label htmlFor='img2'>상세이미지:</label>
        <input type='text' name='img2' value={form.img2} onChange={handleChange} /><br />
        <label htmlFor='img3'>상세이미지:</label>
        <input type='text' name='img3' value={form.img3} onChange={handleChange} /><br />
        <label htmlFor='content'>내용:</label>
        <input type='text' name='content' value={form.content} onChange={handleChange} /><br />
        <label htmlFor='price'>가격:</label>
        <input type='text' name='price' value={form.price} onChange={handleChange} /><br />
        <label>옵션:</label><br />
        {form.option.map((opt, index) => (
          <input key={index} type='text' value={opt} onChange={(e) => handleOptionChange(index, e)} />
        ))}
        <button type='button' onClick={handleAddOption}>옵션 추가</button><br />
        <label>갯수:</label><br />
        {form.count.map((cnt, index) => (
          <input key={index} type='text' value={cnt} onChange={(e) => handleCountChange(index, e)} />
        ))}
        <button type='button' onClick={handleAddCount}>갯수 추가</button><br />
        <label>태그:</label><br />
        {form.tag.map((tag, index) => (
          <input key={index} type='text' value={tag} onChange={(e) => handleTagChange(index, e)} />
        ))}
        <button type='button' onClick={handleAddTag}>태그 추가</button><br />
        <button type='submit'>확인</button>
      </form>
    </div>
  );
}