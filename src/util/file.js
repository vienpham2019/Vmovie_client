const changeImageName = (file, newFileName) => {
  const fileExtension = file.name.split(".")[1];
  const newFileNameWithExtension = `${newFileName}.${fileExtension}`;
  return new File([file], newFileNameWithExtension, {
    type: file.type,
    originalName: file.name,
  });
};

module.exports = { changeImageName };
