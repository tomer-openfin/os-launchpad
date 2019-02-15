export const loadFile = (file, onLoadCb: (fileReaderResult) => void) => {
  const fileReader = new FileReader();

  fileReader.onloadend = () => onLoadCb(fileReader.result);

  fileReader.readAsDataURL(file);
};
