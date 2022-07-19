import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FilePreview from './FilePreview'
const source = axios.CancelToken.source();

const SingleFileUpload = ({file, url, onDelete, onUpload}) => {
const [progress, setProgress] = useState(0)
  useEffect(() => {
    uploadFile()
    return () => {
      source.cancel();
    };
  }, [])
  
  
const uploadFile = async() => {
  const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
  const key = "docs_upload_example_us_preset"
  //const percent = Math.round((progress.loaded / progress.total) * 100)
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", key);
  
  return await axios.post(url, formData, source.token, { headers: {"X-Requested-With": "XMLHttpRequest"  } })
  .then(res => {
    const data = res.data;
    const fileUrl = data.secure_url;
    onUpload(file,fileUrl)
    return fileUrl;
  })
}



  return (
    
      <FilePreview file={file} url={url} onDelete={onDelete}/>
  
  )
}

export default SingleFileUpload