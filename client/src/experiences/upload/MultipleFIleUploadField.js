import { useField } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileValidation from "./FileValidation";
import SingleFileUpload from "./SingleFileUpload";


const MultipleFIleUploadField = ({ name  }) => {
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#e2e8f0",
    borderStyle: "dashed",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#f97316",
  };

  const acceptStyle = {
    borderColor: "#f97316",
  };

  const rejectStyle = {
    borderColor: "#dc2626",
  };

  const [files, setFiles] = useState([]);
  const [_, __, helpers] = useField(name);

  useEffect(() => {
    helpers.setValue(files);
  }, [files]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const mappedAcceptedFiles = acceptedFiles.map((file) => ({
      file,
      errors: [],
    }));
    setFiles((curr) => [...curr, ...mappedAcceptedFiles, ...rejectedFiles]);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: "image/*",
      maxSize: 1000000,
      maxFiles: 5,
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [
      isFocused,
      isDragAccept,
      isDragReject,
      acceptStyle,
      focusedStyle,
      baseStyle,
      rejectStyle,
    ]
  );

  const onDelete = (file) => {
    setFiles((curr) => curr.filter((item) => item.file !== file));
  };
  const onUpload = (file, url) => {
    setFiles((curr) =>
      curr.map((item) => (item.file === file ? { ...item, url } : item))
    );
  };

  return (
    <>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className="text-xl">
          Drag 'n' drop images here, or click to select files
        </p>
        <p>Accepted files: png and jpg with a maximum size of 1MB</p>
      </div>
      <main className="max-w-full shadow-xs bg-white rounded-md mt-2">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
          {files?.map((fileWrapper, index) =>
            fileWrapper.errors.length ? (
              <FileValidation
                key={index}
                file={fileWrapper.file}
                errors={fileWrapper.errors}
                onDelete={onDelete}
              />
            ) : (
              <SingleFileUpload
                key={index}
                onDelete={onDelete}
                onUpload={onUpload}
                file={fileWrapper.file}
                url={fileWrapper.url}
                
              />
            )
          )}
        </div>
      </main>
    </>
  );
};

export default MultipleFIleUploadField;
