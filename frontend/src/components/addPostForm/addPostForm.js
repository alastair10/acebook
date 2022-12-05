import React, { useState } from 'react';
import './addPostForm.css';

const AddPostForm = ({callback}) => {
  const [textarea, setTextarea] = useState("");
  
  const handleTextareaChange = (event) => {
    setTextarea(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (textarea !== '') {
    let response = await fetch( '/posts', {
      method: 'post',
      headers: {
        'Authorization': "Bearer " + window.localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: window.localStorage.getItem('user_id'), message: textarea})
    })


  const data = await response.json()

    if(response.status !== 201) {
      // const data = await response.json()
      console.log(data.error)
      // console.log("error with post adding")
    } else {
      console.log("post added");
      setTextarea('');
      callback(true);
    }
  }
}

  return (
    <div >
      <form className='add-post-form'>
        <input type='text' placeholder='You message here...' value = {textarea} onChange={handleTextareaChange}></input>
        <button type='submit' onClick={handleSubmit}>Create</button>
      </form>
    </div>
  )
}

export default AddPostForm;