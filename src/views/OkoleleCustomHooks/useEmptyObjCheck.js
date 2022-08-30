import { useState, useEffect } from "react";

const useEmptyObjCheck = (obj) => {
  const [isEmptyObj, setIsEmptyObj] = useState(false);

  useEffect(() => {
    if (Object.keys(obj).length === 0) {
      // if empty return false
      setIsEmptyObj(false);
    }
    // if not empty return true
    else {
      setIsEmptyObj(true);
    }
  }, [obj]);

  return isEmptyObj;
};

export default useEmptyObjCheck;
