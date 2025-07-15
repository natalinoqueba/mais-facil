// Importa a biblioteca principal do i18next, que é usada para gerenciar internacionalização (i18n)
import i18n from 'i18next';

// Importa o plugin do i18next para integração com React, permitindo o uso de hooks como useTranslation
import { initReactI18next } from 'react-i18next';

// Importa os arquivos de tradução para português (pt) e inglês (en), que contêm as chaves de tradução
import pt from './locales/pt.json';
import en from './locales/en.json';

// Inicializa o i18next com o plugin para React e configura as opções de internacionalização
i18n.use(initReactI18next) // Conecta o i18next ao React para uso em componentes
  .init({
    // Define os recursos de tradução, organizados por idioma
    resources: {
      pt: { translation: pt }, // Associa o arquivo pt.json ao idioma 'pt' (português)
      en: { translation: en }, // Associa o arquivo en.json ao idioma 'en' (inglês)
    },
    lng: 'pt', // Define o idioma padrão como português ('pt')
    fallbackLng: 'pt', // Define o idioma de fallback como português, usado caso o idioma selecionado não esteja disponível
    interpolation: {
      escapeValue: false, // Desativa o escape automático de valores (necessário para React, que já lida com XSS)
    },
  });

// Exporta a instância configurada do i18n para ser usada em outros arquivos da aplicação
export default i18n;