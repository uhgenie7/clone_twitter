import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <div>
          <img
            role="presentation"
            src={images[0].src}
            alt={images[0].src}
            width="50%"
            onClick={onZoom}
          />
          <img
            role="presentation"
            src={images[1].src}
            alt={images[1].src}
            width="50%"
            onClick={onZoom}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          width="50%"
          onClick={onZoom}
        />
        <div
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
    </>
  );
};

export default PostImages;
