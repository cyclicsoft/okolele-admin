export const removeDbImgIdfromVariants = (prodDetails) => {
  let details = prodDetails;
  prodDetails.variants.map((variant, varIndex) => {
    console.log(" variant ", variant);
    let imgArray = [];
    variant.images.map((img, imgIndex) => {
      console.log(" img ", img);
      if (typeof img != "string") {
        imgArray = [...imgArray, img];
      }
    });

    details.variants[varIndex].images = imgArray;
    // console.log(
    //   "%cremoveDbImgIdfromVariants.js line:15 details",
    //   "color: #007acc;",
    //   details
    // );
  });

  return details;
};
