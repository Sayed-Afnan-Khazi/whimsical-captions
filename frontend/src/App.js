import './App.css';
import loadingGif from './loading_icon.gif'
import { useState } from "react";

const App = () => {
  const [imgFile, setImgFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    setCaption('')
    setLoading(true)
    const fileInput = e.target.querySelector('input[type="file"]');
    const file = fileInput.files[0]; 
    const form = new FormData()
    form.append('image',file)
    fetch('http://localhost:5000/genai',{
      method: 'post',
      body: form
    }).then(response=> response.json())
    .then(response => {
      console.log(response)
      if (!response.error) {
        // console.log(response.text);
        setCaption(response.text);
        setImgFile(file);
        setLoading(false);
      } else {
        setError(response.error)
        setLoading(false)
      }
    })
    .catch(error => {
      // console.log(error)
      setError("An error occurred, please try again.")
      setLoading(false)
    })
  }

  return (
    <div className="App">
      <span className='white-block'><h1 className='title'>Whimsical Captions</h1></span>
      <div className='white-block'>
        <p className='subtitle'>Upload an image to get a ✨ whimsical caption ✨ for it!</p>
        <form className="input-form" onSubmit={handleSubmit} >
          <div className='single-line-input'>
            <label htmlFor='image-upload'>Choose your image:</label>
              <input type='file' id="image-upload" accept='image/*' required/>
          </div>
          <button id='submit-btn' type='submit'>Send!</button>
        </form>
      </div>
      {error && <div className='white-block'><p>{error}</p></div>}
      {loading && (
      <div className='galleria-display'>
        <div className='galleria-box span-2-rows span-2-columns'>
          <img src={loadingGif} alt="Loading GIF" />
            <div className="galleria-data">
              <p className="galleria-img-date">Loading...</p>
              <p className="galleria-img-caption">Loading...</p>
            </div>
          </div>
        </div>
      )}
      {caption && (
        <div className='galleria-display'>
          <div className='galleria-box span-2-rows span-2-columns'>
            <img src={URL.createObjectURL(imgFile)} alt={caption} className="galleria-img"/>
            <div className="galleria-data">
                <p className="galleria-img-date">{new Date(imgFile.lastModified).toDateString() + ' ' + new Date(imgFile.lastModified).toLocaleTimeString()}</p>
                <p className="galleria-img-caption">{caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
