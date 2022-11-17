import { useTranslation } from 'react-i18next';
import { EditForm } from './components/EditForm';

export const ProfilePage = () => {
  const { t } = useTranslation();
  return (
    <section className="profile">
      <h2 className="profile__title">{t('profile_title')}</h2>
      <EditForm />
    </section>
  );
};
