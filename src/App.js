
import './App.css';
import React, { useState } from 'react'
import Giphy from './Component/images/via-Giphy.png'
import axios from 'axios';

function App() {

  const [giphy, setGiphy] = useState('');
  const [images, setImages] = useState([]);
  const [loader , setLoader] = useState(false);
  const [offsetData, setOffsetData] = useState({
    count: 10,
    offset: 0,
    total_count: 0,

  });

  const onInputChange = (e) => {
    setGiphy(e.target.value);
    setImages([]);
  }

  const fetchGifImages = (offset = offsetData.offset) => {
    setLoader(true)
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=caomxaYfI2a8JpKIqT5rLvnymjRYEvOd&q=${giphy}&limit=${offsetData.count}&offset=${offset}`)
      .then(res => {
        console.log(res);
        setImages(images.concat(res.data.data));
        setLoader(false);
        setOffsetData(res.data.pagination)
      })
      .catch(err => {

      })
  }

  const handleSearch = (e) => {
    e.preventDefault();

    fetchGifImages();
  }

  return (
    <div className="App">
      <div className="main-wrapper">
        <div className="inner-wrapper">
          <div className="logo">
            <img src={Giphy} alt="logo" />
          </div>
          <div className="custom_container">
            <form method="post" onSubmit={(e)=>handleSearch(e)}>
              <input type="text" placeholder="Enter Giphy" onChange={(e) => onInputChange(e)} />
              <button type="submit"><i className="fas fa-search"></i></button>
            </form>
          </div>

          <div className="tranding-container">
            <h4>Trending GIFs</h4>

            <div className="tranding-item-box">
              <ul>
                {
                  images.length > 0 ?
                    images.map((image, index) => {
                      return (
                      <li key={index}><img src={image.images?.fixed_height?.url} alt="gif-img"/></li>
                      )
                    })
                    : <div className="messages" > Not data found</div>
                }

                {loader? <div className="loader">
                          <div className="bullet"></div>
                          <div className="bullet"></div>
                          <div className="bullet"></div>
                          <div className="bullet"></div>
                        </div>:'' }

              </ul>

              {
                images.length > 0 ?
                  offsetData.offset < offsetData.total_count
                    ? <button onClick={() => fetchGifImages(offsetData.count+offsetData.offset)} >Load More</button>
                  : ''
                : ''
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
