export const fetchImg = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();

    let metadata = {
      type: "image/jpeg",
    };
    let file = new File([blob], "test.jpg", metadata);
    return file;
  };