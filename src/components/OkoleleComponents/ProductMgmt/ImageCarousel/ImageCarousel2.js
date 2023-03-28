import React, { useEffect, useRef, useState } from "react";
// import ChevronLeft from "feather-icons-react/build/IconComponents/ChevronLeft";
// import ChevronRight from "feather-icons-react/build/IconComponents/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// export type ImageType = { id: number; url: string };
// Styles
import styles from "../../../../assets/scss/ghorwali-scss/_img-carousel2.module.scss";

const ImageCarousel2 = ({ images }) => {
  console.log("%cImageCarousel2.js line:11 images", "color: #26bfa5;", images);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const carouselItemsRef = useRef([]);

  useEffect(() => {
    if (images && images[0]) {
      carouselItemsRef.current = carouselItemsRef.current.slice(
        0,
        images.length
      );

      setSelectedImageIndex(0);
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleSelectedImageChange = (newIdx) => {
    if (images && images.length > 0) {
      setSelectedImage(images[newIdx]);
      setSelectedImageIndex(newIdx);
      // if (carouselItemsRef?.current[newIdx]) {
      //   carouselItemsRef?.current[newIdx]?.scrollIntoView({
      //     inline: "center",
      //     behavior: "smooth",
      //   });
      // }
    }
  };

  const handleRightClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex + 1;
      if (newIdx >= images.length) {
        newIdx = 0;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  const handleLeftClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex - 1;
      if (newIdx < 0) {
        newIdx = images.length - 1;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  if (images && images.length <= 0) {
    return (
      <div
        className={`${styles["no-img-found"]} ${styles["text-2xl-semibold"]}`}
      >
        No image found
      </div>
    );
  }

  return (
    <div className={styles["carousel-container"]}>
      <div
        className={`${styles["product-picture-label"]} ${styles["text-lg-semibold"]}`}
      >
        Product Picture
      </div>
      <div
        className={styles["selected-image"]}
        style={{
          backgroundImage: `url(${selectedImage?.original})`,
          // height: "30vh",
        }}
      >
        <button
          className={`${styles["carousel__button"]} ${styles["carousel__button-left"]}`}
          onClick={handleLeftClick}
        >
          <KeyboardArrowLeftIcon className={styles["button-icon"]} />
        </button>
        <button
          className={`${styles["carousel__button"]} ${styles["carousel__button-right"]}`}
          onClick={handleRightClick}
        >
          <KeyboardArrowRightIcon className={styles["button-icon"]} />
        </button>
      </div>

      <div className={styles["carousel"]}>
        <div className={styles["carousel__images"]}>
          {images &&
            images.map((image, index) => (
              <div
                key={index}
                onClick={() => handleSelectedImageChange(index)}
                style={{
                  backgroundImage: `url(${image.original})`,
                }}
                className={`${styles["carousel__image"]} ${
                  selectedImageIndex === index &&
                  styles["carousel__image-selected"]
                }`}
                ref={(el) => (carouselItemsRef.current[index] = el)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel2;
