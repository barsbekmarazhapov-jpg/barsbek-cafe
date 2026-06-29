import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export const Chatbot: React.FC = () => {
  const { isChatOpen, setIsChatOpen, t, language } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions based on language
  const suggestions = {
    ru: [
      { text: 'Где находится ресторан?', query: 'Где находится ресторан?' },
      { text: 'Какие блюда популярные?', query: 'Какие блюда самые популярные?' },
      { text: 'Есть ли доставка?', query: 'Есть ли доставка?' },
      { text: 'Какие часы работы?', query: 'Какие часы работы?' },
      { text: 'Какие есть акции?', query: 'Какие есть акции?' }
    ],
    ky: [
      { text: 'Дарегиңиздер кайда?', query: 'Ресторан кайда жайгашкан?' },
      { text: 'Эң популярдуу тамактар?', query: 'Кандай популярдуу тамактар бар?' },
      { text: 'Жеткирүү барбы?', query: 'Жеткирүү кызматы барбы?' },
      { text: 'Иштөө убактысы кандай?', query: 'Иштөө убактысы кандай?' },
      { text: 'Кандай акциялар бар?', query: 'Кандай акциялар бар?' }
    ],
    en: [
      { text: 'Where are you located?', query: 'Where are you located?' },
      { text: 'What is popular?', query: 'What are the most popular dishes?' },
      { text: 'Do you deliver?', query: 'Do you offer delivery?' },
      { text: 'What are your hours?', query: 'What are your working hours?' },
      { text: 'What are current promos?', query: 'What are current promotions?' }
    ]
  };

  const currentSuggestions = suggestions[language] || suggestions['ru'];

  // Initialize with a warm welcome message in correct language
  useEffect(() => {
    const welcomeMessages = {
      ru: 'Здравствуйте! Я ваш персональный AI Консьерж ресторана ALTYN. Буду рад помочь вам узнать наше местоположение, самые популярные блюда, условия доставки, часы работы или актуальные акции. Чем я могу помочь вам?',
      ky: 'Саламатсызбы! Мен ALTYN ресторанынын жеке AI жардамчысымын. Сизге дарегибизди, эң популярдуу тамактарды, жеткирүү шарттарын же акцияларыбызды айтып берүүгө кубанычтамын. Сизге кантип жардам бере алам?',
      en: 'Welcome to ALTYN. I am your personal AI Concierge. I am delighted to assist you with our location, popular menu highlights, delivery details, operating hours, or current promotions. How may I elevate your experience today?'
    };

    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: welcomeMessages[language] || welcomeMessages['ru']
      }
    ]);
  }, [language]);

  // Scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          language: language
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        text: data.text || 'Извините, возникли проблемы при подключении.'
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        role: 'assistant',
        text: language === 'ru' 
          ? 'Прошу прощения, произошла ошибка подключения. Пожалуйста, попробуйте еще раз.'
          : language === 'ky'
          ? 'Кечиресиз, байланыш катасы кетти. Кайра аракет кылып көрүңүз.'
          : 'I apologize, a connectivity issue occurred. Please try again.'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      {/* Floating Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-luxury-black text-gold dark:bg-gold dark:text-luxury-black p-4 rounded-full shadow-2xl hover:scale-110 hover:rotate-6 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-gold/30 dark:border-none relative group"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-full mr-3 py-1.5 px-3 bg-luxury-black/90 text-gold text-xs rounded-lg border border-gold/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
            {t('chatTitle')}
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white dark:border-luxury-black animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white dark:border-luxury-black"></span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isChatOpen && (
        <div className="w-[92vw] sm:w-96 h-[500px] sm:h-[550px] bg-white dark:bg-luxury-black rounded-2xl border border-gray-100 dark:border-luxury-gray/80 shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          
          {/* Chat Header */}
          <div className="bg-luxury-black dark:bg-luxury-gray p-4 border-b border-gold/20 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-gold/10 rounded-full flex items-center justify-center text-gold border border-gold/20">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-white tracking-wider flex items-center space-x-1.5">
                  <span>{t('chatTitle')}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                </h3>
                <p className="text-[10px] text-gold/80 font-light uppercase tracking-wider">
                  {t('chatSubtitle')}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-luxury-black/95">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-luxury-black text-gold dark:bg-gold dark:text-luxury-black rounded-tr-none'
                      : 'bg-white dark:bg-luxury-gray text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-luxury-gray/50 rounded-tl-none'
                  }`}
                >
                  {msg.text.split('\n').map((line, idx) => (
                    <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-400 text-xs py-1">
                <Loader2 className="w-4 h-4 animate-spin text-gold" />
                <span>{language === 'ru' ? 'Консьерж думает...' : language === 'ky' ? 'Жардамчы ойлонууда...' : 'Concierge is typing...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions Box */}
          <div className="p-3 border-t border-gray-100 dark:border-luxury-gray/50 bg-white dark:bg-luxury-black/95 overflow-x-auto whitespace-nowrap scrollbar-none flex space-x-2">
            {currentSuggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(sug.query)}
                className="inline-block px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-luxury-gray border border-transparent hover:border-gold/30 rounded-lg transition-colors cursor-pointer"
              >
                {sug.text}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 bg-white dark:bg-luxury-gray border-t border-gray-100 dark:border-luxury-gray/80 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('chatPlaceholder')}
              className="flex-1 bg-gray-50 dark:bg-luxury-black text-gray-900 dark:text-white px-4 py-2.5 rounded-xl border border-gray-200 dark:border-luxury-gray focus:outline-none focus:border-gold text-sm transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 bg-luxury-black dark:bg-gold text-gold dark:text-luxury-black rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
