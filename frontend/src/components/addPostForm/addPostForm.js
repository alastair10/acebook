import React, { useState } from 'react';
import './addPostForm.css';

const AddPostForm = () => {
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
      body: JSON.stringify({ user_id:'6389e6036d9fbb7c56778b76', message: textarea})
    })


  const data = await response.json()

    if(response.status !== 201) {
      // const data = await response.json()
      console.log(data.error)
      // console.log("error with post adding")
    } else {
      console.log("post added");
      setTextarea('');
    }
  }
}

  return (
    <div >
      <form className='add-post-form'>
        <textarea placeholder='You message here...' value = {textarea} onChange={handleTextareaChange}></textarea>
        <button type='submit' onClick={handleSubmit}>Create post</button>
      </form>
    </div>
  )
}

export default AddPostForm;