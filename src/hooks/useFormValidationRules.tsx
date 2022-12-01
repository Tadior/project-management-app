import { t } from 'i18next';
import { loginValidation, nameValidation, passwordValidation } from '../helper/validation';

export const useFormValidationRules = () => {
  const nameRules = nameValidation(t('validation_name', { returnObjects: true }));
  const loginRules = loginValidation(t('validation_login', { returnObjects: true }));
  const passwordRules = passwordValidation(t('validation_password', { returnObjects: true }));

  return { nameRules, loginRules, passwordRules };
};
