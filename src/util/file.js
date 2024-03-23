const changeImageName = (file, newFileName) => {
  const fileExtension = file.name.split(".")[1];
  const newFileNameWithExtension = `${newFileName}.${fileExtension}`;
  return new File([file], newFileNameWithExtension, {
    type: file.type,
    originalName: file.name,
  });
};

async function hashFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result;
      crypto.subtle
        .digest("SHA-256", buffer)
        .then((hash) => {
          resolve(hash);
        })
        .catch((error) => {
          reject(error);
        });
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

async function compareFiles(file1, file2) {
  const hash1 = await hashFile(file1);
  const hash2 = await hashFile(file2);

  // Convert hash arrays to strings for comparison
  const hashStr1 = Array.from(new Uint8Array(hash1))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  const hashStr2 = Array.from(new Uint8Array(hash2))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashStr1 === hashStr2;
}

module.exports = { changeImageName, compareFiles };
