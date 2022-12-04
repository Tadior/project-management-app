interface IValidationProps {
  [key: string]: string;
}

export const nameValidation = (text: IValidationProps) => {
  return {
    required: text.required,
    validate: (value: string) => {
      if (value.match(/[0-9]/)) {
        return text.digit_ban;
      } else if (value.length < 2) {
        return text.length;
      }
      return true;
    },
  };
};

export const loginValidation = (text: IValidationProps) => {
  return {
    required: text.required,
    validate: (value: string) => {
      if (value.match(/[а-яА-Я]/)) {
        return text.latin;
      } else if (value.length < 3) {
        return text.length;
      }
      return true;
    },
  };
};

export const passwordValidation = (text: IValidationProps) => {
  return {
    required: text.required,
    validate: (value: string) => {
      if (value.length < 6) {
        return text.length;
      }
      if (!value.match(/[а-яА-Яa-zA-Z]/)) {
        return text.letter;
      }
      if (!value.match(/[0-9]/)) {
        return text.digit;
      }

      return true;
    },
  };
};

export const titleValidation = (text: IValidationProps) => {
  return {
    required: text.required,
    validate: (value: string) => {
      if (value.length < 2) {
        return text.length;
      }
      return true;
    },
  };
};

export const descriptionValidation = (text: IValidationProps) => {
  return {
    validate: (value: string) => {
      if (value.length > 100) {
        return text.length;
      }
      return true;
    },
  };
};
