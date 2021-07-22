const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const ImageSetting = {
  DESCRIPTION: 'Фото',
  SRC: 'img/muffin-grey.svg',
};

const adForm = document.querySelector('.ad-form');
const avatarForm = adForm.querySelector('.ad-form-header__input');
const avatarPreviewForm = adForm.querySelector('.ad-form-header__preview img');
const photoForm = adForm.querySelector('.ad-form__input');
const photoPreviewForm = adForm.querySelector('.ad-form__photo-preview img');

const renderPhoto = (fileChoose, previewElement) => {
  fileChoose.addEventListener('change', () => {
    const file = fileChoose.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        previewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

renderPhoto(avatarForm, avatarPreviewForm);
renderPhoto(photoForm, photoPreviewForm);

const resetPictures = () => {
  avatarPreviewForm.src = ImageSetting.SRC;
  photoPreviewForm.src = ImageSetting.SRC;
};

export {
  resetPictures
};
