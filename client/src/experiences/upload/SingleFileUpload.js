import axios from "axios";
import React, { useEffect, useState } from "react";
import FilePreview from "./FilePreview";
import { useSelector } from "react-redux";
import { getCloudinarySignature } from "../../actions/experience";

const source = axios.CancelToken.source();

const SingleFileUpload = ({ file, url, onDelete, onUpload }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    uploadFile();
    return () => {
      source.cancel();
    };
  }, [file]);

  const cloudinarySignature = async () => {
    try {
      let res = await getCloudinarySignature(token);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async () => {
    const { signature, timestamp } = await cloudinarySignature();
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const key = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const api = process.env.REACT_APP_CLOUDINARY_API;

    //const percent = Math.round((progress.loaded / progress.total) * 100)
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("upload_preset", key);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("api_key", api);

    return await axios
      .post(url, formData, source.token, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
      .then((res) => {
        const data = res.data;
        const fileUrl = data.secure_url;
        onUpload(file, fileUrl);
        return fileUrl;
      });
  };

  return <FilePreview file={file} url={url} onDelete={onDelete} />;
};

export default SingleFileUpload;
