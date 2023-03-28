// export const getBase64Img = (file) => {
//   getBase64(file).then((base64) => {
//     // localStorage["fileBase64"] = base64;
//     // setprofileImage(base64)
//     console.log("%cgetBase64Img.js line:5 base64", "color: #007acc;", base64);
//     return base64;
//   });
// };

export const getBase64Img = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
