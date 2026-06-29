import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Copy, Check, ExternalLink, Settings } from 'lucide-react';

interface EmailJSHelperProps {
  language: 'ru' | 'ky' | 'en';
}

export const EmailJSHelper: React.FC<EmailJSHelperProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const variables = [
    { name: 'name', desc: language === 'ru' ? 'Имя клиента' : language === 'ky' ? 'Кардардын аты' : 'Customer Name' },
    { name: 'phone', desc: language === 'ru' ? 'Номер телефона' : language === 'ky' ? 'Телефон номери' : 'Phone Number' },
    { name: 'email', desc: language === 'ru' ? 'Email адрес' : language === 'ky' ? 'Электрондук почта' : 'Email Address' },
    { name: 'address', desc: language === 'ru' ? 'Адрес доставки' : language === 'ky' ? 'Жеткирүү дареги' : 'Delivery Address' },
    { name: 'payment_method', desc: language === 'ru' ? 'Способ оплаты' : language === 'ky' ? 'Төлөө ыкмасы' : 'Payment Method' },
    { name: 'notes', desc: language === 'ru' ? 'Комментарий к заказу' : language === 'ky' ? 'Буйрутмага эскертүү' : 'Order Notes' },
    { name: 'order', desc: language === 'ru' ? 'Список блюд заказа' : language === 'ky' ? 'Заказ кылынган тамактардын тизмеси' : 'Ordered Dishes List' },
    { name: 'total', desc: language === 'ru' ? 'Общая сумма заказа' : language === 'ky' ? 'Заказдын жалпы суммасы' : 'Total Order Amount' },
    { name: 'message', desc: language === 'ru' ? 'Полная информация о заказе (для Contact Us)' : language === 'ky' ? 'Заказдын толук маалыматы' : 'Full Invoice/Order Summary' }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(`{{${text}}}`);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const isConfigured = !!(
    import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_pctbrr9'
  ) && !!(
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_g58boo2'
  ) && !!(
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '-OdzE6a0h1M_hh3Tz'
  );

  return (
    <div className="mt-4 bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden text-xs">
      {/* Header/Toggler */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center space-x-2">
          <HelpCircle className={`w-4 h-4 ${isConfigured ? 'text-green-500' : 'text-amber-500'}`} />
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {language === 'ru' ? 'Инструкция по EmailJS' : language === 'ky' ? 'EmailJS Нускамасы' : 'EmailJS Setup Guide'}
            </p>
            <p className="text-[10px] text-gray-500">
              {isConfigured
                ? (language === 'ru' ? '✓ Подключено и настроено' : '✓ Connected and configured')
                : (language === 'ru' ? '⚠ Требуется настройка ключей' : '⚠ Configuration required')}
            </p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {/* Expandable Instructions Content */}
      {isOpen && (
        <div className="p-4 border-t border-gray-100 dark:border-white/5 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed max-h-[400px] overflow-y-auto">
          {/* Step 1 */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-white flex items-center space-x-1.5 mb-1 text-[11px] uppercase tracking-wider">
              <span className="w-4 h-4 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-sans font-extrabold">1</span>
              <span>{language === 'ru' ? 'Регистрация' : 'Registration'}</span>
            </h4>
            <p>
              {language === 'ru'
                ? 'Создайте бесплатный аккаунт на сайте '
                : 'Create a free account on '}
              <a
                href="https://www.emailjs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold font-semibold hover:underline inline-flex items-center space-x-0.5"
              >
                <span>emailjs.com</span>
                <ExternalLink className="w-3 h-3 inline" />
              </a>.
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-white flex items-center space-x-1.5 mb-1 text-[11px] uppercase tracking-wider">
              <span className="w-4 h-4 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-sans font-extrabold">2</span>
              <span>Service ID</span>
            </h4>
            <p>
              {language === 'ru'
                ? 'В панели управления во вкладке '
                : 'In your EmailJS dashboard, navigate to '}
              <strong>Email Services</strong>
              {language === 'ru'
                ? ' нажмите кнопку '
                : ' and click '}
              <strong>Add Service</strong>
              {language === 'ru'
                ? ' и выберите вашего провайдера (например, Gmail). Созданный ID сервиса — это ваш '
                : ' and connect Gmail/Outlook. The generated service ID is your '}
              <code className="px-1.5 py-0.5 bg-gray-150 dark:bg-white/10 rounded font-mono text-gold font-semibold">Service ID</code>.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-white flex items-center space-x-1.5 mb-1 text-[11px] uppercase tracking-wider">
              <span className="w-4 h-4 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-sans font-extrabold">3</span>
              <span>Template ID</span>
            </h4>
            <p className="mb-2">
              {language === 'ru'
                ? 'Перейдите во вкладку '
                : 'Navigate to '}
              <strong>Email Templates</strong>
              {language === 'ru'
                ? ', нажмите '
                : ' and click '}
              <strong>Create New Template</strong>.
              {language === 'ru'
                ? ' Настройте внешний вид письма и вставьте следующие переменные (нажмите на переменную для копирования):'
                : ' Design your email. Click variables below to copy them into your email template fields:'}
            </p>
            
            {/* Click-to-copy variable helpers */}
            <div className="grid grid-cols-2 gap-1.5 mt-2 bg-gray-100 dark:bg-black/40 p-2.5 rounded-lg border border-gray-200 dark:border-white/5">
              {variables.map((v) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => handleCopy(v.name)}
                  className="flex items-center justify-between p-1.5 bg-white dark:bg-[#151515] hover:bg-gold/10 dark:hover:bg-gold/10 border border-gray-100 dark:border-white/5 rounded transition-all text-left font-mono text-[10px] cursor-pointer group"
                  title={language === 'ru' ? 'Кликните чтобы скопировать' : 'Click to copy'}
                >
                  <div className="truncate pr-1">
                    <span className="text-gold font-semibold">{`{{${v.name}}}`}</span>
                    <span className="block text-[8px] text-gray-400 font-sans truncate">{v.desc}</span>
                  </div>
                  {copiedText === v.name ? (
                    <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                  ) : (
                    <Copy className="w-3 h-3 text-gray-400 group-hover:text-gold flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
            
            <p className="mt-2">
              {language === 'ru'
                ? 'После сохранения скопируйте ID созданного шаблона — это ваш '
                : 'Once saved, copy the template ID — this is your '}
              <code className="px-1.5 py-0.5 bg-gray-150 dark:bg-white/10 rounded font-mono text-gold font-semibold">Template ID</code>.
            </p>
          </div>

          {/* Step 4 */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-white flex items-center space-x-1.5 mb-1 text-[11px] uppercase tracking-wider">
              <span className="w-4 h-4 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-sans font-extrabold">4</span>
              <span>Public Key</span>
            </h4>
            <p>
              {language === 'ru'
                ? 'Откройте вкладку '
                : 'Navigate to '}
              <strong>Account</strong>
              {language === 'ru'
                ? ' и перейдите в раздел '
                : ' and open '}
              <strong>API Keys</strong>.
              {language === 'ru'
                ? ' Скопируйте значение '
                : ' Copy the value of '}
              <strong>Public Key</strong>.
            </p>
          </div>

          {/* Step 5 */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-white flex items-center space-x-1.5 mb-1 text-[11px] uppercase tracking-wider">
              <span className="w-4 h-4 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-sans font-extrabold">5</span>
              <span>{language === 'ru' ? 'Подключение ключей' : 'Apply Keys'}</span>
            </h4>
            <p className="mb-2">
              {language === 'ru'
                ? 'Добавьте скопированные значения в переменные окружения. Откройте панель настроек AI Studio (Settings) справа вверху экрана или создайте файл '
                : 'Inject the keys into the environment variables. Open the AI Studio settings (secrets panel) or update your '}
              <code className="px-1.5 py-0.5 bg-gray-150 dark:bg-white/10 rounded font-mono text-gold font-semibold">.env</code>
              {language === 'ru'
                ? ' в корневой папке проекта:'
                : ' file:'}
            </p>
            <pre className="p-2.5 bg-[#0f0f0f] text-gray-300 font-mono text-[10px] rounded-lg overflow-x-auto border border-white/5 space-y-1">
              <div>VITE_EMAILJS_SERVICE_ID=<span className="text-green-400">"your_service_id"</span></div>
              <div>VITE_EMAILJS_TEMPLATE_ID=<span className="text-green-400">"your_template_id"</span></div>
              <div>VITE_EMAILJS_PUBLIC_KEY=<span className="text-green-400">"your_public_key"</span></div>
            </pre>
            <p className="mt-2 text-amber-500 font-medium">
              {language === 'ru'
                ? 'После сохранения переменных в AI Studio Secrets перезапустите Dev-сервер кнопкой в углу, чтобы изменения вступили в силу.'
                : 'After modifying environment variables, restart the development server to reload the credentials.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
