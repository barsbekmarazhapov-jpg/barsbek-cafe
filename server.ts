import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI Client lazily & safely
let aiClient: GoogleGenAI | null = null;
function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('WARNING: GEMINI_API_KEY environment variable is not set. Chatbot will run in simulation mode.');
      return null;
    }
    aiClient = new GoogleGenAI({ 
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// System instructions for the restaurant's premium AI concierge
const RESTAURANT_SYSTEM_INSTRUCTIONS = `
You are the elite AI Concierge for "ALTYN", a premium five-star restaurant located in Bishkek, Kyrgyzstan.
Your style is extremely polite, welcoming, helpful, and sophisticated. You speak with high hospitality standards.

You can speak fluently in Russian, Kyrgyz, and English. Always detect the user's language and respond in the same language.

Here are the precise details about ALTYN Restaurant:
- Location: 128A Chuy Avenue, Bishkek (intersects Razzakov St) / г. Бишкек, проспект Чуй, 128А (пересекает ул. Раззакова).
- Working Hours: Every day from 10:00 AM to 11:00 PM (с 10:00 до 23:00 без выходных).
- Delivery: We deliver across Bishkek. Free delivery for orders above 1500 KGS, otherwise delivery costs 150 KGS. Average delivery time is 35-45 minutes.
- Theme/Atmosphere: Exquisite design with a Black, White, and Gold premium aesthetic. Live jazz music every Friday and Saturday evening.
- Popular/Signature Dishes:
  1. "ALTYN Premium Breakfast" (380 KGS) - Benedict with organic poached eggs, cured salmon, and fresh hollandaise.
  2. "Royal Khan Plov 'Altyn'" (750 KGS) - Legendary Fergana plov with premium laser rice, tender sous-vide marbled beef, quail eggs, and kazy horsemeat.
  3. "Juicy Ribeye Steak" (980 KGS) - Prime dry-aged grain-fed marbled beef, fire-roasted vegetables, demi-glace.
  4. "Truffle Liquid Lava Fondant" (360 KGS) - Warm chocolate fondant with melting truffle core, vanilla bean ice cream, and gold flakes.
  5. "Signature Gold Halva Raf Coffee" (250 KGS) - Creamy espresso with organic sesame halva and edible 24K gold.
- Active Promotions (Акции):
  1. "Birthday Gift": 15% discount on the entire check for birthdays (please present ID to the waiter or write it in the order notes).
  2. "Golden Hours": Monday to Thursday, from 15:00 to 18:00, order any dessert and get our Signature Gold Raf coffee at 50% discount.
- How to Order: Guests can add any dish to their shopping cart on the website, click on the gold shopping cart icon in the top right, fill in their delivery info, choose Cash or Card, and click "Confirm Order".

If you are asked questions outside restaurant topics, politely guide the guest back to ALTYN's menu, reservations, and luxury services.
Keep answers concise, beautifully formatted with markdown, and highly helpful.
`;

// API Route for AI Chatbot
app.post('/api/chat', async (req, res) => {
  const { message, history, language } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const ai = getAiClient();
  if (!ai) {
    // Elegant fallback simulation if API key is not yet set
    setTimeout(() => {
      let responseText = '';
      const query = message.toLowerCase();
      const currentLang = (language || 'ru') as 'ru' | 'ky' | 'en';

      if (query.includes('где') || query.includes('адрес') || query.includes('дарек') || query.includes('where') || query.includes('location') || query.includes('карта') || query.includes('map') || query.includes('ул') || query.includes('проспект')) {
        responseText = currentLang === 'ru'
          ? '📍 Ресторан ALTYN расположен в самом центре Бишкека по адресу: **проспект Чуй, 128А (пересекает улицу Раззакова)**.\n\n🚗 Для вашего удобства у нас есть бесплатный охраняемый паркинг и VIP Valet Parking прямо у парадного входа. Будем рады видеть вас!'
          : currentLang === 'ky'
          ? '📍 ALTYN рестораны Бишкек шаарынын чок ортосунда жайгашкан: **Чүй проспектиси, 128А (Раззаков көчөсү менен кесилишет)**.\n\n🚗 Сиздин ыңгайлуулугуңуз үчүн бизде акысыз кайтарылган паркинг жана кире бериште VIP Valet Parking кызматы бар!'
          : '📍 ALTYN Restaurant is situated in the premium center of Bishkek at **128A Chuy Avenue (crosses Razzakov Street)**.\n\n🚗 For our guests\' comfort, we offer complimentary secure parking and executive VIP Valet Parking directly at the grand entrance.';
      }
      else if (query.includes('плов') || query.includes('plov') || query.includes('полв') || query.includes('ханск')) {
        responseText = currentLang === 'ru'
          ? '👑 **Ханский Плов «Алтын»** (750 KGS) — это наша гордость!\n\nМы готовим его по старинному рецепту с использованием премиального риса лазер, нежнейшей мраморной говядины су-вид, перепелиных яиц, специй и традиционного деликатеса казы. Обязательно попробуйте!'
          : currentLang === 'ky'
          ? '👑 **Хан Плови «Алтын»** (750 KGS) — биздин сыймыгыбыз!\n\nБиз аны эң жогорку сапаттагы лазер күрүчү, су-вид технологиясы менен даярдалган назик мрамор уй эти, бөдөнө жумурткалары жана казы менен байыркы рецепт боюнча даярдайбыз.'
          : '👑 **Royal Khan Plov "Altyn"** (750 KGS) — our masterpiece!\n\nPrepared using historical techniques with premium laser rice, tender sous-vide marbled beef, quail eggs, fine spices, and traditional kazy horsemeat. Highly recommended!';
      }
      else if (query.includes('стейк') || query.includes('steak') || query.includes('рибай') || query.includes('мясо') || query.includes('meat')) {
        responseText = currentLang === 'ru'
          ? '🥩 **Рибай Стейк** (980 KGS) — сочное премиальное блюдо.\n\nИспользуется отборная мраморная говядина зернового откорма сухого вызревания. Подается с сочными запеченными овощами на гриле и изысканным соусом демиглас.'
          : currentLang === 'ky'
          ? '🥩 **Рибай Стейк** (980 KGS) — абдан ширелүү жана даамдуу эт!\n\nЭң жогорку сапаттагы кургак бышырылган мрамор уй этинен жасалат. Грильде бышырылган жашылчалар жана демиглас соусу менен берилет.'
          : '🥩 **Juicy Ribeye Steak** (980 KGS) — premium aged cut.\n\nPrime dry-aged grain-fed marbled beef, perfectly seared on open fire. Served with fire-roasted premium vegetables and rich demi-glace sauce.';
      }
      else if (query.includes('завтрак') || query.includes('breakfast') || query.includes('эртең менен') || query.includes('яйц') || query.includes('бенедикт')) {
        responseText = currentLang === 'ru'
          ? '🍳 **Премиум завтрак ALTYN** (380 KGS) — идеальное начало вашего дня!\n\nНежнейшие яйца пашот Бенедикт с органическим голландским соусом, слабосоленый лосось собственного посола и теплая свежая булочка бриошь.'
          : currentLang === 'ky'
          ? '🍳 **ALTYN Премиум Эртең мененки тамагы** (380 KGS) — күнүңүздү сонун баштоого жардам берет!\n\nНазик органикалык пашот жумурткалары, Бенедикт голланд соусу, аз туздалган лосось балыгы жана жаңы бышкан жылуу бриошь наны.'
          : '🍳 **ALTYN Premium Breakfast** (380 KGS) — the ultimate morning experience!\n\nOrganic poached eggs Benedict, house-cured premium salmon, rich velvety hollandaise, and warm freshly baked brioche.';
      }
      else if (query.includes('десерт') || query.includes('сладк') || query.includes('сладост') || query.includes('фондан') || query.includes('dessert') || query.includes('таттуу')) {
        responseText = currentLang === 'ru'
          ? '🍰 **Трюфельный шоколадный фондан** (360 KGS) — шедевр кондитерского искусства!\n\nТеплый шоколадный фондан с жидким трюфельным центром, шариком натурального ванильного мороженого и декором из пищевого 24-каратного золота.'
          : currentLang === 'ky'
          ? '🍰 **Трюфель Шоколад Фонданы** (360 KGS) — кондитердик керемет!\n\nЫсык шоколад фонданы, ичинде суюк трюфель толтурулган, ваниль балмуздагы жана 24 караттык жегенге жарактуу алтын менен кооздолгон.'
          : '🍰 **Truffle Liquid Lava Fondant** (360 KGS) — a dessert masterpiece!\n\nWarm premium chocolate cake with a melting rich truffle core, natural vanilla bean ice cream, and authentic 24K gold flakes.';
      }
      else if (query.includes('кофе') || query.includes('раф') || query.includes('coffee') || query.includes('напит') || query.includes('чай') || query.includes('drink')) {
        responseText = currentLang === 'ru'
          ? '☕ **Фирменный Золотой Раф с халвой** (250 KGS) — наш легендарный напиток!\n\nНежный сливочный эспрессо с добавлением натуральной кунжутной халвы и украшенный пищевым сусальным золотом 24K.'
          : currentLang === 'ky'
          ? '☕ **Алтын Халва Раф Кофеси** (250 KGS) — биздин өзгөчө легендарлуу суусундугубуз!\n\nКаймак кошулган жумшак эспрессо, табигый кунжут халвасы жана жегенге жарактуу 24K сусаль алтыны менен кооздолгон.'
          : '☕ **Signature Gold Halva Raf Coffee** (250 KGS) — our legendary hot beverage!\n\nCreamy, velvety double-shot espresso infused with organic sesame halva and finished with exquisite 24K edible gold.';
      }
      else if (query.includes('доставк') || query.includes('жеткир') || query.includes('deliver')) {
        responseText = currentLang === 'ru'
          ? '🚗 **Быстрая доставка ALTYN по Бишкеку**:\n\n• Бесплатная доставка при заказе на сумму от **1500 KGS**.\n• При заказе до 1500 KGS стоимость доставки — всего **150 KGS**.\n• Среднее время доставки: **35-45 минут** (привезем всё горячим в специальных термосумках!).'
          : currentLang === 'ky'
          ? '🚗 **Бишкек боюнча ALTYN тез жеткирүүсү**:\n\n• Баасы **1500 сомдон** жогору болгон заказдарга жеткирүү акысыз.\n• 1500 сомго чейин — жеткирүү баасы болгону **150 сом**.\n• Орточо жеткирүү убактысы: **35-45 мүнөт**.'
          : '🚗 **Express Delivery in Bishkek**:\n\n• Complimentary free delivery for all orders above **1500 KGS**.\n• For orders under 1500 KGS, delivery fee is flat **150 KGS**.\n• Average transit time is **35-45 minutes** (delivered in custom insulated thermal packs to preserve heat!).';
      }
      else if (query.includes('акци') || query.includes('скидк') || query.includes('арзандатуу') || query.includes('день рожд') || query.includes('туулган күн') || query.includes('promo') || query.includes('discount') || query.includes('birthday')) {
        responseText = currentLang === 'ru'
          ? '🎉 **Роскошные предложения ресторана ALTYN**:\n\n1. 🎂 **День Рождения**: Скидка **15% на весь чек**! Действует в день рождения и 3 дня после. Просто упомяните это в комментарии к заказу или покажите паспорт официанту.\n2. 🌟 **Золотые Часы** (Пн-Чт, 15:00-18:00): При заказе любого десерта вы получаете наш легендарный фирменный Золотой Раф со скидкой **50%**!'
          : currentLang === 'ky'
          ? '🎉 **ALTYN ресторанынын сонун акциялары**:\n\n1. 🎂 **Туулган Күн**: Бардык менюга **15% арзандатуу**! Туулган күнүндө жана андан кийинки 3 күн иштейт. Заказга комментарий калтырыңыз же официантка паспортуңузду көрсөтүңүз.\n2. 🌟 **Алтын Сааттар** (Дш-Бш саат 15:00дөн 18:00гө чейин): Каалаган таттууну тандасаңыз, алтын кофеге **50% арзандатуу** берилет.'
          : '🎉 **Exclusive Promotions & Offers**:\n\n1. 🎂 **Birthday Privilege**: A celebratory **15% discount on your entire bill**! Valid on your birthday and for 3 days following. Kindly note this in your online order comment or show your ID to our waiter.\n2. 🌟 **Golden Hours** (Mon-Thu, 15:00 - 18:00): Indulge in any artisan dessert and receive our legendary Signature Gold Raf coffee at **50% discount**!';
      }
      else if (query.includes('заказ') || query.includes('купить') || query.includes('заказать') || query.includes('order') || query.includes('как') || query.includes('how')) {
        responseText = currentLang === 'ru'
          ? '🛒 **Как сделать заказ на сайте**:\n\n1. Перейдите в раздел меню.\n2. Нажмите золотую кнопку **"Добавить в заказ"** напротив понравившихся блюд.\n3. Нажмите на золотую иконку корзины в верхнем правом углу экрана.\n4. Укажите ваше имя, телефон и адрес доставки, выберите способ оплаты (карта или наличные).\n5. Нажмите **"Оформить заказ"**! Мы сразу свяжемся с вами для подтверждения.'
          : currentLang === 'ky'
          ? '🛒 **Заказды кантип берсе болот**:\n\n1. Меню бөлүмүнө өтүңүз.\n2. Жаккан тамактын жанындагы **"Заказга кошуу"** алтын баскычын басыңыз.\n3. Оң жактагы жогорудагы корзина сүрөтүн басыңыз.\n4. Атыңызды, телефонуңузду жана дарегиңизди жазып, төлөм ыкмасын тандаңыз.\n5. **"Заказды тариздөө"** баскычын басыңыз! Биз сизге дароо чалабыз.'
          : '🛒 **How to Place Your Order Online**:\n\n1. Navigate to our Menu section.\n2. Click the gold **"Add to Order"** button on your preferred choices.\n3. Click the gold shopping cart icon in the top right corner.\n4. Enter your details (name, contact, delivery address) and choose Cash or Card payment.\n5. Click **"Confirm Order"**! Our operator will contact you immediately for confirmation.';
      }
      else if (query.includes('бронь') || query.includes('забронировать') || query.includes('столик') || query.includes('резерв') || query.includes('book') || query.includes('reserve') || query.includes('table')) {
        responseText = currentLang === 'ru'
          ? '📞 **Бронирование столов**:\n\nВы можете забронировать лучший столик для вашего вечера по телефону: **+996 (555) 12-34-56**.\n\n🎵 По пятницам и субботам у нас играет живая джазовая музыка, поэтому рекомендуем бронировать столы заранее!'
          : currentLang === 'ky'
          ? '📞 **Үстөлдөрдү ээлөө (Бронь)**:\n\nКөрүнүктүү кечиңиз үчүн эң жакшы үстөлдү телефон аркылуу ээлей аласыз: **+996 (555) 12-34-56**.\n\n🎵 Жума жана ишемби күндөрү бизде жандуу джаз музыкасы ойнолот, андыктан алдын ала ээлөөнү сунуштайбыз!'
          : '📞 **Table Reservations**:\n\nYou can secure the finest table for your evening by calling us directly at **+996 (555) 12-34-56**.\n\n🎵 We feature live jazz music every Friday and Saturday evening, and highly recommend reserving in advance!';
      }
      else if (query.includes('музык') || query.includes('джаз') || query.includes('певец') || query.includes('music') || query.includes('jazz')) {
        responseText = currentLang === 'ru'
          ? '🎵 **Живая джазовая музыка в ALTYN**:\n\nКаждую пятницу и субботу с **19:30** до **22:00** у нас проходят вечера живого джаза в исполнении лучших музыкантов столицы. Прекрасная атмосфера для вашего вечера!'
          : currentLang === 'ky'
          ? '🎵 **ALTYN ресторанында жандуу джаз музыкасы**:\n\nАр жума жана ишемби күндөрү саат **19:30дан** **22:00гө** чейин мыкты музыканттардын аткаруусунда жандуу джаз кечелери өтөт. Сонун атмосфера кепилденет!'
          : '🎵 **Live Jazz Performances**:\n\nEvery Friday and Saturday from **7:30 PM** to **10:00 PM**, we host premium live jazz nights featuring top vocalists and instrumentalists. It is the perfect backdrop for an elegant evening!';
      }
      else if (query.includes('халяль') || query.includes('халал') || query.includes('halal') || query.includes('чисто')) {
        responseText = currentLang === 'ru'
          ? '🕌 **Стандарт Халяль**:\n\nДа, абсолютно весь наш ассортимент мясных изделий и ингредиентов полностью соответствует стандартам Халяль. Мы закупаем только отборное фермерское мясо наивысшего качества!'
          : currentLang === 'ky'
          ? '🕌 **Халал стандарты**:\n\nОоба, биз колдонгон бардык эт азыктары жана ингредиенттер толугу менен Халал стандарттарына туура келет. Биз эң жогорку сапаттагы фермердик этти гана сатып алабыз!'
          : '🕌 **Halal Standards**:\n\nYes, absolutely! 100% of our meats, poultry, and ingredients are strictly Halal certified. We source exclusively from premium local organic farms keeping the highest standards of purity.';
      }
      else if (query.includes('вегетариан') || query.includes('без мяса') || query.includes('veg')) {
        responseText = currentLang === 'ru'
          ? '🥦 **Вегетарианские опции**:\n\nМы с удовольствием адаптируем блюда под ваши предпочтения! Например, наш "Премиум завтрак ALTYN" может быть подан без лосося с дополнительными овощами гриль и авокадо. Пожалуйста, сообщите о ваших предпочтениях официанту или укажите в комментариях к заказу.'
          : currentLang === 'ky'
          ? '🥦 **Вегетариандык тамактар**:\n\nБиз сиздин каалооңузга жараша тамактарды өзгөртө алабыз! Мисалы, "ALTYN Премиум эртең мененки тамагын" лососьсуз, кошумча гриль жашылчалары жана авокадо менен берсек болот. Заказ бергенде жазып коюңуз.'
          : '🥦 **Vegetarian Options**:\n\nWe are delighted to customize dishes for your dietary preferences! For instance, our "ALTYN Premium Breakfast" can be prepared without salmon, substituted with fresh avocados and grilled mushrooms. Please leave a note in your order comment.';
      }
      else if (query.includes('меню') || query.includes('карта') || query.includes('что есть') || query.includes('выбор') || query.includes('menu') || query.includes('eat') || query.includes('food')) {
        responseText = currentLang === 'ru'
          ? '📋 **Эксклюзивное меню ALTYN**:\n\n• **ALTYN Premium Breakfast** (380 KGS) — бенедикт с яйцами пашот, слабосоленый лосось, бриошь.\n• **Плов Ханский «Алтын»** (750 KGS) — рис лазер, мраморная говядина су-вид, казы.\n• **Рибай Стейк** (980 KGS) — сочная мраморная говядина сухой выдержки с овощами гриль.\n• **Трюфельный Шоколадный Фондан** (360 KGS) — с жидким центром и 24K золотом.\n• **Фирменный Кофе Золотой Раф** (250 KGS) — с халвой и пищевым сусальным золотом.\n\nВсе блюда доступны для заказа на сайте!'
          : currentLang === 'ky'
          ? '📋 **ALTYN өзгөчө менюсу**:\n\n• **ALTYN Премиум Эртең мененки тамак** (380 KGS).\n• **Хан Плови «Алтын»** (750 KGS).\n• **Рибай Стейк** (980 KGS).\n• **Трюфель Шоколад Фонданы** (360 KGS).\n• **Фирмалык Алтын Раф Кофеси** (250 KGS).\n\nБардык тамактарды сайттан заказ кылсаңыз болот!'
          : '📋 **Artisan ALTYN Menu Highlights**:\n\n• **ALTYN Premium Breakfast** (380 KGS) — poached eggs Benedict, house-cured salmon, warm brioche.\n• **Royal Khan Plov "Altyn"** (750 KGS) — laser rice, premium sous-vide beef, quail eggs, kazy.\n• **Juicy Ribeye Steak** (980 KGS) — premium dry-aged marbled beef with fire-roasted vegetables.\n• **Truffle Liquid Lava Fondant** (360 KGS) — warm chocolate cake with 24K gold decoration.\n• **Signature Gold Halva Raf** (250 KGS) — velvety double espresso with sesame halva and 24K gold.\n\nEvery item is available for prompt delivery via our website!';
      }
      else if (query.includes('привет') || query.includes('здравствуй') || query.includes('салам') || query.includes('добрый день') || query.includes('доброе утро') || query.includes('добрый вечер') || query.includes('hello') || query.includes('hi') || query.includes('hey')) {
        responseText = currentLang === 'ru'
          ? '👋 Здравствуйте! Я ваш персональный AI Консьерж ресторана ALTYN.\n\nРад приветствовать вас! Я могу рассказать о нашем меню, времени работы, условиях доставки, акциях, живой музыке или помочь оформить заказ. О чем бы вы хотели узнать?'
          : currentLang === 'ky'
          ? '👋 Саламатсызбы! Мен ALTYN ресторанынын жеке AI жардамчысымын.\n\nБиздин меню, иштөө убактысы, жеткирүү шарттары, акциялар же жандуу музыка тууралуу сурасаңыз болот. Сизге эмне кызык болуп жатат?'
          : '👋 Warm greetings! I am your personal AI Concierge for ALTYN Restaurant.\n\nIt is my absolute pleasure to welcome you. I am here to share details regarding our premium menu, reservations, delivery terms, promotions, or help guide your checkout. What can I assist you with today?';
      }
      else if (query.includes('кто ты') || query.includes('что ты') || query.includes('о себе') || query.includes('бот') || query.includes('bot') || query.includes('who are you') || query.includes('what are you')) {
        responseText = currentLang === 'ru'
          ? '🤖 Я — интерактивный премиальный AI Консьерж ресторана ALTYN.\n\nСоздан для того, чтобы круглосуточно помогать нашим гостям во всех вопросах: от выбора блюд из меню до условий доставки по Бишкеку и бронирования лучших столиков.'
          : currentLang === 'ky'
          ? '🤖 Мен — ALTYN ресторанынын интерактивдүү премиум AI жардамчысымын.\n\nБиздин конокторго бардык суроолор боюнча жардам берүү үчүн иштелип чыкканмын: менюну тандоодон баштап Бишкек боюнча жеткирүү шарттарына чейин.'
          : '🤖 I am the interactive luxury AI Concierge for ALTYN Restaurant.\n\nI was crafted to elevate our digital guest experience by providing instant assistance with menu selections, delivery logistics, reservations, and active promotions.';
      }
      else {
        responseText = currentLang === 'ru'
          ? 'Спасибо за ваш вопрос! Рад сообщить, что в ресторане ALTYN мы всегда стремимся к совершенству.\n\nЯ могу ответить на любые вопросы о нашем **меню**, **доставке**, **акциях**, **часах работы**, **живом джазе**, **бронировании столов** по телефону **+996 (555) 12-34-56** или подсказать наш **адрес**. Что именно вас интересует?'
          : currentLang === 'ky'
          ? 'Бизге жазганыңыз үчүн рахмат! ALTYN ресторанында биз ар дайым конокторубузга сонун кызмат көрсөтүүгө даярбыз.\n\nМен биздин **меню**, **жеткирүү**, **акциялар**, **иштөө убактысы**, **жандуу джаз** же **үстөлдөрдү ээлөө** жөнүндө суроолоруңузга жооп бере алам. Сизге эмне кызык?'
          : 'Thank you for your inquiry! At ALTYN, we are committed to providing an unparalleled experience.\n\nI can assist you with details regarding our **menu**, **delivery services**, **promotions**, **live jazz nights**, **table bookings** at **+996 (555) 12-34-56**, or share our **address**. What may I explore for you?';
      }

      res.json({ text: responseText });
    }, 600);
    return;
  }

  try {
    // Prepare conversation chat content
    const contents: any[] = [];
    
    // Add history
    if (history && Array.isArray(history)) {
      history.slice(-10).forEach((h: any) => {
        contents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      });
    }

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call modern Google Gen AI SDK using gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: RESTAURANT_SYSTEM_INSTRUCTIONS,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text || 'Извините, я не смог обработать запрос.' });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: error.message || 'Ошибка генерации AI' });
  }
});

// Setup Vite Development or Production Mode
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite dev middleware mounted');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production build from /dist');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ALTYN Premium Restaurant server running on http://localhost:${PORT}`);
  });
}

startServer();
