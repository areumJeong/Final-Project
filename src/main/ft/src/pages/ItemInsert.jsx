import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function ItemInsert(){
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get('/ft/item/list')
      .then(res => {
        setData(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch(err => {console.log(err);});
  }, []);
  
  return(
    <>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data.map(item => (
              <li key={item.iid}>
                <p>Name: {item.name}</p>
                <p>Category: {item.category}</p>
                {/* Add other fields as needed */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}