import { useState } from "react";
import axios from "axios";

export default function AITest() {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImage] = useState("");

  const createImg = async () => {
    const response = await axios.post("http://localhost:8080/create", {
      prompt,
    });
    setImage(response.data);
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
      <div className="container-fluid">
        <div className="form">
          <h1>당신의 예술 작품을 만드세요!</h1>
          {imageURL && <img src={imageURL} alt="prompt" />}
          <div>
            <input
                type="text"
                onChange={handleChange}
                placeholder="이미지 설명을 입력하세요"
            />
            <button type="submit" className="btn btn-primary" onClick={createImg}>
              Submit
            </button>
          </div>
        </div>
      </div>
  );
}
