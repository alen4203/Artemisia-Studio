import type { FC } from 'react';
import { useTranslation } from 'next-export-i18n';

const BrandIntro: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-6">{t('home.coreValues')}</h2>
      <p className="text-xl mb-4">{t('home.intro1')}</p>
      <p className="text-xl mb-4">{t('home.intro2')}</p>
      <p className="text-xl mb-4">{t('home.intro3')}</p>
      <p className="text-xl">{t('home.intro4')}</p>
    </div>
  );
};

export default BrandIntro;
