const REQUIRED_FIELD = 'Required to fill';
const REQUIRED_FIELD_RU = 'Обязательно к заполнению';

export const nameValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.match(/[0-9]/)) {
      return "Name shouldn't contain digits";
    } else if (value.length < 2) {
      return 'Name should contain 2 or more symbols';
    }
    return true;
  },
};

export const nameValidationRu = {
  required: REQUIRED_FIELD_RU,
  validate: (value: string) => {
    if (value.match(/[0-9]/)) {
      return 'Имя не должно содержать цифр';
    } else if (value.length < 2) {
      return 'Имя не может состоять из 1 символа';
    }
    return true;
  },
};

export const loginValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.match(/[а-яА-Я]/)) {
      return 'Login should contain only latin letters';
    } else if (value.length < 3) {
      return 'Login should contain 3 or more symbols';
    }
    return true;
  },
};

export const loginValidationRu = {
  required: REQUIRED_FIELD_RU,
  validate: (value: string) => {
    if (value.match(/[а-яА-Я]/)) {
      return 'Логин может содержать только латинские буквы';
    } else if (value.length < 3) {
      return 'Логин должен содержать 3 или более символов';
    }
    return true;
  },
};

export const passwordValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.length < 6) {
      return 'Password should contain 6 or more symbols';
    }
    if (!value.match(/[а-яА-Яa-zA-Z]/)) {
      return 'Password must contain at least one letter';
    }
    if (!value.match(/[0-9]/)) {
      return 'Password must contain at least one digit';
    }

    return true;
  },
};

export const passwordValidationRu = {
  required: REQUIRED_FIELD_RU,
  validate: (value: string) => {
    if (value.length < 6) {
      return 'Пароль должен содержать 6 или более символов';
    }
    if (!value.match(/[а-яА-Яa-zA-Z]/)) {
      return 'Пароль должен содержать хотя бы одну букву';
    }
    if (!value.match(/[0-9]/)) {
      return 'Пароль должен содержать хотя бы одну букву';
    }

    return true;
  },
};

export const titleValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.length < 2) {
      return 'Title should contain 2 or more symbols';
    }

    return true;
  },
};

export const titleValidationRu = {
  required: REQUIRED_FIELD_RU,
  validate: (value: string) => {
    if (value.length < 2) {
      return 'Заголовок не может состоять из одного символа';
    }

    return true;
  },
};

export const descriptionValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.length > 100) {
      return 'Description should be less than 100 symbols';
    }

    return true;
  },
};

export const descriptionValidationRu = {
  required: REQUIRED_FIELD_RU,
  validate: (value: string) => {
    if (value.length > 100) {
      return 'Описание должно содержать менее 100 символов';
    }

    return true;
  },
};
