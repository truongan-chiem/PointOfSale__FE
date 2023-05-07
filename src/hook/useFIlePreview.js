import { useEffect, useState } from "react";

export default function useFilePreview(file,type = 'mul') {
  const [imgSrc, setImgSrc] = useState(null);
  useEffect(() => {

    if (file && file[0] && type === 'mul') {
      const newUrl = URL.createObjectURL(file[0]);

      if (newUrl !== imgSrc) {
        setImgSrc(newUrl);
      }
    }
    else if(file && type === 'single'){
        const newUrl = URL.createObjectURL(file);
        if (newUrl !== imgSrc) {
            setImgSrc(newUrl);
          }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return [imgSrc, setImgSrc];
}
