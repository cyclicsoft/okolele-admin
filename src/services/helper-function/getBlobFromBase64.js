export const getBlobFromBase64 = (base64) => {
  // Decode the base64 string into a binary string
  const binaryString = window.atob(base64);

  // Convert the binary string to a Blob object
  const blob = new Blob([binaryString], { type: "text/plain" });
  // Create a URL for the Blob object
  const url = URL.createObjectURL(blob);
  console.log("%cgetBlobFromBase64.js line:9 url", "color: #007acc;", url);
  return url;
};
