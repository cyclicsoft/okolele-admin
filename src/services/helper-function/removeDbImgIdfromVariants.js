export const removeDbImgIdfromVariants = (prodDetails) => {
  let details = prodDetails;

  prodDetails.variants.map((variant, varIndex) => {
    let imgArray = [];
    variant.images.map((img, imgIndex) => {
      console.log(" img ", img);
      if (typeof img != "string") {
        imgArray = [...imgArray, img];
      }
    });

    details.variants[varIndex].images = imgArray;
  });

  return details;
};
