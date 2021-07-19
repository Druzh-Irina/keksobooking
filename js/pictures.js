const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const renderPhoto = (input, preview) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

export {
  renderPhoto
};
