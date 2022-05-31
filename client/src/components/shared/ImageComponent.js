import React from 'react'

const ImageComponent = ({src, alt}) => {
  return (
    <img
    src={src}
    alt={alt}
    className="rounded-md object-cover h-full w-full object-cover"
  />
  )
}

export default ImageComponent