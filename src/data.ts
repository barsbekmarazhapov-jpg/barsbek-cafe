import { Dish, Review, TranslatedText } from './types';

export const DICTIONARY: Record<string, TranslatedText> = {
  appName: {
    ru: 'ALTYN',
    ky: 'ALTYN',
    en: 'ALTYN'
  },
  slogan: {
    ru: 'Золотой стандарт гастрономического искусства',
    ky: 'Гастрономиялык искусствонун алтын стандарты',
    en: 'The Gold Standard of Culinary Art'
  },
  heroSubtitle: {
    ru: 'Изысканный премиум-ресторан в самом сердце Бишкека. Мы объединяем вековые кулинарные традиции Востока и современную европейскую классику.',
    ky: 'Бишкектин чок ортосундагы таза премиум-ресторан. Биз Чыгыштын кылымдык кулинардык салттарын жана заманбап европалык классиканы айкалыштырабыз.',
    en: 'An exquisite premium restaurant in the heart of Bishkek. We unite age-old Eastern culinary traditions with modern European classics.'
  },
  orderNow: {
    ru: 'Заказать сейчас',
    ky: 'Азыр заказ берүү',
    en: 'Order Now'
  },
  exploreMenu: {
    ru: 'Посмотреть меню',
    ky: 'Менюну көрүү',
    en: 'Explore Menu'
  },
  breakfasts: {
    ru: 'Завтраки',
    ky: 'Эртең мененки тамактар',
    en: 'Breakfasts'
  },
  mains: {
    ru: 'Основные блюда',
    ky: 'Негизги тамактар',
    en: 'Main Dishes'
  },
  drinks: {
    ru: 'Напитки',
    ky: 'Сусундуктар',
    en: 'Drinks'
  },
  desserts: {
    ru: 'Десерты',
    ky: 'Таттуулар',
    en: 'Desserts'
  },
  galleryTitle: {
    ru: 'Галерея шедевров',
    ky: 'Шедеврлер галереясы',
    en: 'Gallery of Masterpieces'
  },
  gallerySubtitle: {
    ru: 'Каждое блюдо — это произведение искусства, созданное нашими шеф-поварами',
    ky: 'Ар бир тамак — биздин ашпозчулар тарабынан жаратылган искусство чыгармасы',
    en: 'Each dish is a masterpiece, handcrafted by our executive chefs'
  },
  cartTitle: {
    ru: 'Ваш заказ',
    ky: 'Сиздин буйрутмаңыз',
    en: 'Your Order'
  },
  cartEmpty: {
    ru: 'В вашей корзине пока пусто. Самое время добавить что-нибудь изысканное!',
    ky: 'Сиздин корзинаңыз азырынча бош. Ичине сонун бир тамак кошууга убакыт келди!',
    en: 'Your cart is currently empty. It is the perfect time to add something exquisite!'
  },
  addToOrder: {
    ru: 'Добавить в заказ',
    ky: 'Заказга кошуу',
    en: 'Add to Order'
  },
  added: {
    ru: 'Добавлено',
    ky: 'Кошулду',
    en: 'Added'
  },
  total: {
    ru: 'Итоговая сумма',
    ky: 'Жалпы сумма',
    en: 'Total Amount'
  },
  checkoutBtn: {
    ru: 'Оформить заказ',
    ky: 'Заказды тариздөө',
    en: 'Checkout Order'
  },
  submittingOrder: {
    ru: 'Оформление...',
    ky: 'Таризделүүдө...',
    en: 'Processing...'
  },
  orderSuccessTitle: {
    ru: 'Заказ успешно оформлен!',
    ky: 'Заказ ийгиликтүү кабыл алынды!',
    en: 'Order Placed Successfully!'
  },
  orderSuccessMsg: {
    ru: 'Благодарим вас за выбор ALTYN. Наш менеджер свяжется с вами в течение 5 минут для подтверждения деталей.',
    ky: 'ALTYN ресторанын тандаганыңыз үчүн рахмат. Биздин менеджер маалыматты тактоо үчүн 5 мүнөттүн ичинде сиз менен байланышат.',
    en: 'Thank you for choosing ALTYN. Our manager will contact you within 5 minutes to confirm the details.'
  },
  backToShopping: {
    ru: 'Вернуться к меню',
    ky: 'Менюга кайтуу',
    en: 'Back to Menu'
  },
  checkoutFormTitle: {
    ru: 'Детали доставки',
    ky: 'Жеткирүү маалыматтары',
    en: 'Delivery Details'
  },
  fieldName: {
    ru: 'Ваше имя',
    ky: 'Сиздин атыңыз',
    en: 'Your Name'
  },
  fieldPhone: {
    ru: 'Номер телефона',
    ky: 'Телефон номериңиз',
    en: 'Phone Number'
  },
  fieldAddress: {
    ru: 'Адрес доставки',
    ky: 'Жеткирүү дареги',
    en: 'Delivery Address'
  },
  fieldPayment: {
    ru: 'Способ оплаты',
    ky: 'Төлөм ыкмасы',
    en: 'Payment Method'
  },
  paymentCash: {
    ru: 'Наличными при получении',
    ky: 'Алганда накталай төлөө',
    en: 'Cash on delivery'
  },
  paymentCard: {
    ru: 'Картой курьеру',
    ky: 'Курьерге карта менен төлөө',
    en: 'Card to courier'
  },
  fieldNotes: {
    ru: 'Пожелания к заказу (необязательно)',
    ky: 'Буйрутмага каалоо-тилектер (милдеттүү эмес)',
    en: 'Order notes (optional)'
  },
  placeOrderSubmit: {
    ru: 'Подтвердить заказ',
    ky: 'Заказды ырастоо',
    en: 'Confirm Order'
  },
  cancelCheckout: {
    ru: 'Назад к корзине',
    ky: 'Корзинага кайтуу',
    en: 'Back to Cart'
  },
  mapTitle: {
    ru: 'Наше местоположение',
    ky: 'Биздин дарегибиз',
    en: 'Our Location'
  },
  mapSubtitle: {
    ru: 'Ждем вас в гости в самом элегантном уголке столицы',
    ky: 'Сизди борбор калаабыздын эң кооз жеринде күтөбүз',
    en: 'We await your visit in the most elegant district of the capital'
  },
  mapAddressText: {
    ru: 'г. Бишкек, проспект Чуй, 128А / пересекает ул. Раззакова',
    ky: 'Бишкек ш., Чүй проспектиси, 128А / Раззаков көч. кесилиши',
    en: '128A Chuy Avenue, Bishkek / cross Razzakov St'
  },
  buildRoute: {
    ru: 'Построить маршрут',
    ky: 'Маршрут куруу',
    en: 'Build Route'
  },
  contactsTitle: {
    ru: 'Контакты',
    ky: 'Байланыш',
    en: 'Contacts'
  },
  hoursTitle: {
    ru: 'Режим работы',
    ky: 'Иштөө убактысы',
    en: 'Working Hours'
  },
  hoursDays: {
    ru: 'Понедельник – Воскресенье',
    ky: 'Дүйшөмбү – Жекшемби',
    en: 'Monday – Sunday'
  },
  hoursTime: {
    ru: 'с 10:00 до 23:00',
    ky: 'саат 10:00дөн 23:00гө чейин',
    en: '10:00 AM – 11:00 PM'
  },
  reviewsTitle: {
    ru: 'Отзывы наших гостей',
    ky: 'Конокторубуздун пикирлери',
    en: 'Guest Reviews'
  },
  addReviewTitle: {
    ru: 'Оставить отзыв',
    ky: 'Пикир калтыруу',
    en: 'Leave a Review'
  },
  ratingLabel: {
    ru: 'Ваша оценка',
    ky: 'Сиздин бааңыз',
    en: 'Your Rating'
  },
  reviewCommentPlaceholder: {
    ru: 'Поделитесь вашими впечатлениями об атмосфере и блюдах...',
    ky: 'Атмосфера жана тамактар тууралуу таасирлериңиз менен бөлүшүңүз...',
    en: 'Share your thoughts about our atmosphere and gourmet dishes...'
  },
  submitReview: {
    ru: 'Отправить отзыв',
    ky: 'Пикирди жөнөтүү',
    en: 'Submit Review'
  },
  chatTitle: {
    ru: 'AI Консьерж',
    ky: 'AI Жардамчы',
    en: 'AI Concierge'
  },
  chatSubtitle: {
    ru: 'Онлайн поддержка ALTYN',
    ky: 'ALTYN онлайн колдоо кызматы',
    en: 'ALTYN Online Assistant'
  },
  chatPlaceholder: {
    ru: 'Спросите меня о меню, доставке или часах работы...',
    ky: 'Меню, жеткирүү же жумуш убактысы тууралуу сураңыз...',
    en: 'Ask me about menu, delivery or working hours...'
  },
  chatSuggestionsTitle: {
    ru: 'Частые вопросы:',
    ky: 'Суроолор:',
    en: 'Popular questions:'
  },
  navHome: {
    ru: 'Главная',
    ky: 'Башкы бет',
    en: 'Home'
  },
  navMenu: {
    ru: 'Меню',
    ky: 'Меню',
    en: 'Menu'
  },
  navGallery: {
    ru: 'Галерея',
    ky: 'Галерея',
    en: 'Gallery'
  },
  navReviews: {
    ru: 'Отзывы',
    ky: 'Пикирлер',
    en: 'Reviews'
  },
  navContacts: {
    ru: 'Контакты',
    ky: 'Байланыш',
    en: 'Contacts'
  },
  navMap: {
    ru: 'Карта',
    ky: 'Карта',
    en: 'Map'
  },
  themeLight: {
    ru: 'Светлая',
    ky: 'Жарык',
    en: 'Light'
  },
  themeDark: {
    ru: 'Темная',
    ky: 'Караңгы',
    en: 'Dark'
  },
  popularBadge: {
    ru: 'Хит продаж',
    ky: 'Эң популярдуу',
    en: 'Best Seller'
  },
  allCategories: {
    ru: 'Все меню',
    ky: 'Бардык меню',
    en: 'All Menu'
  }
};

export const MENU_ITEMS: Dish[] = [
  // BREAKFASTS
  {
    id: 'b1',
    category: 'breakfast',
    price: 380,
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    name: {
      ru: 'Премиум Завтрак ALTYN',
      ky: 'ALTYN Премиум Эртең мененки тамагы',
      en: 'ALTYN Premium Breakfast'
    },
    description: {
      ru: 'Бенедикт с фермерским яйцом пашот, нежнейшим малосольным лососем, спелым авокадо и хрустящим шпинатом под соусом голландез.',
      ky: 'Жумуртка бенедикт, фермердик пашот жумурткасы, назик аз туздалган лосось, бышкан авокадо жана шпинат менен голландез соусунун астында.',
      en: 'Eggs Benedict with organic poached egg, delicate cured salmon, ripe avocado, and fresh baby spinach topped with warm hollandaise.'
    }
  },
  {
    id: 'b2',
    category: 'breakfast',
    price: 320,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=800',
    name: {
      ru: 'Золотистые Сырники со Сметаной',
      ky: 'Каймак кошулган Алтын Сырниктер',
      en: 'Golden Cottage Cheese Pancakes'
    },
    description: {
      ru: 'Нежнейшие сырники из домашнего творога с добавлением натуральной ванили, подаются с фермерской сметаной и свежими лесными ягодами.',
      ky: 'Үй быштагынан жасалган назик сырниктер, табигый ваниль менен, үй каймагы жана жаңы токой мөмөлөрү менен берилет.',
      en: 'Delicate organic cottage cheese pancakes infused with real vanilla bean, served with local sour cream and fresh forest berries.'
    }
  },
  // MAINS
  {
    id: 'm1',
    category: 'main',
    price: 750,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    name: {
      ru: 'Плов Ханский «Алтын»',
      ky: 'Хан Плови «Алтын»',
      en: 'Altyn Royal Khan Plov'
    },
    description: {
      ru: 'Традиционный ферганский плов из отборного риса лазер, мраморной говядины су-вид, золотистого перепелиного яйца, чеснока и казы.',
      ky: 'Тандалган лазер күрүчүнөн, су-вид мрамор уй этинен, алтын бөдөнө жумурткасынан, сарымсак жана казыдан жасалган салттуу фергана плову.',
      en: 'Traditional Fergana-style plov with premium laser rice, tender sous-vide marbled beef, golden quail eggs, garlic, and cured kazy horsemeat sausage.'
    }
  },
  {
    id: 'm2',
    category: 'main',
    price: 980,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    name: {
      ru: 'Сочный Рибай Стейк',
      ky: 'Ширелүү Рибай Стейк',
      en: 'Juicy Ribeye Steak'
    },
    description: {
      ru: 'Премиальная мраморная говядина зернового откорма на гриле, подается с обжаренными овощами и изысканным соусом демиглас.',
      ky: 'Грилде бышырылган дан менен азыктанган премиум мрамор уй эти, куурулган жашылчалар жана демиглас соусу менен берилет.',
      en: 'Prime dry-aged marbled beef ribeye grilled to perfection, served with seasonal fire-roasted vegetables and rich homemade demi-glace sauce.'
    }
  },
  {
    id: 'm3',
    category: 'main',
    price: 520,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=800',
    name: {
      ru: 'Итальянская Паста с Трюфелем',
      ky: 'Трюфель менен Италиялык Паста',
      en: 'Handmade Italian Truffle Pasta'
    },
    description: {
      ru: 'Свежая домашняя паста тальятелле в сливочно-пармезановом соусе с добавлением пасты из черного трюфеля и свежей зелени.',
      ky: 'Каймактуу пармезан соусундагы жаңы үй тальятелле пастасы, кара трюфель жана жаңы жашылчалар кошулган.',
      en: 'Artisanal fresh tagliatelle pasta tossed in double-cream Parmigiano sauce, elevated with exquisite black truffle paste and microgreens.'
    }
  },
  {
    id: 'm4',
    category: 'main',
    price: 680,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    name: {
      ru: 'Ассорти Шашлыков на Углях',
      ky: 'Чокто бышкан Ассорти Шашлык',
      en: 'Charcoal Grilled Shashlik Assortment'
    },
    description: {
      ru: 'Ассорти из нежнейшей баранины, телятины и люля-кебаб из курицы. Подается с маринованным луком, сумахом и тонким армянским лавашем.',
      ky: 'Назик кой эти, музоо эти жана тоок люля-кебабынын ассортиси. Маринаддалган пияз, сумах жана жука армян лавашы менен берилет.',
      en: 'A luxury platter of tender local lamb loin, milk-fed veal, and spiced chicken lula kebab. Accompanied by pickled red onions and warm lavash.'
    }
  },
  // DRINKS
  {
    id: 'd1',
    category: 'drink',
    price: 250,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
    name: {
      ru: 'Фирменный Раф Кофе Халва-Золото',
      ky: 'Фирмалык Раф Кофе Халва-Алтын',
      en: 'Signature Gold Halva Raf Coffee'
    },
    description: {
      ru: 'Нежнейший сливочный раф с натуральной кунжутной халвой, украшенный пищевым сусальным золотом 24 карата.',
      ky: 'Табигый кунжут халвасы кошулган өзгөчө каймактуу раф, 24 караттык жегенге жарактуу алтын менен кооздолгон.',
      en: 'Luxurious double-cream espresso blended with organic sesame halva, elegantly topped with edible 24K gold flakes.'
    }
  },
  {
    id: 'd2',
    category: 'drink',
    price: 290,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800',
    name: {
      ru: 'Освежающий Лимонад Манго-Маракуйя',
      ky: 'Манго-Маракуйя Лимонады',
      en: 'Exotic Mango-Passionfruit Lemonade'
    },
    description: {
      ru: 'Натуральное пюре спелого манго и ароматной маракуйи с добавлением свежего сока лайма, мяты и газированной воды.',
      ky: 'Жаңы лайм ширеси, жалбыз жана газдалган суу кошулган бышкан манго жана жыпар жыттуу маракуйянын табигый пюреси.',
      en: 'Pureed ripe mango and fragrant passionfruit nectar muddled with fresh key lime juice, wild mint leaves, and sparkling spring water.'
    }
  },
  // DESSERTS
  {
    id: 'de1',
    category: 'dessert',
    price: 360,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    isPopular: true,
    name: {
      ru: 'Трюфельный Шоколадный Фондан',
      ky: 'Трюфель Шоколад Фонданы',
      en: 'Truffle Liquid Lava Fondant'
    },
    description: {
      ru: 'Горячий шоколадный десерт с жидкой трюфельной начинкой, подается с шариком домашнего ванильного мороженого и золотой крошкой.',
      ky: 'Жумшак шоколад десерти, ичинде суюк трюфель толтурулган, үй ваниль балмуздагы жана алтын күкүмдөрү менен берилет.',
      en: 'Warm chocolate cake with a velvety liquid truffle center, served with a scoop of premium Madagascar vanilla bean ice cream and gold dust.'
    }
  },
  {
    id: 'de2',
    category: 'dessert',
    price: 340,
    image: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=800',
    name: {
      ru: 'Мильфей со Свежими Ягодами',
      ky: 'Мильфей Жаңы Мөмөлөр Менен',
      en: 'Fresh Berry Mille-Feuille'
    },
    description: {
      ru: 'Хрустящие карамелизированные слои слоеного теста, прослоенные легким кремом патисьер с семенами натуральной ванили и свежей малиной.',
      ky: 'Кытырак карамелденген катталган камыр катмарлары, табигый ваниль дандары кошулган жеңил патисьер креми жана малина менен.',
      en: 'Crispy caramelized puff pastry sheets layered with light, velvety vanilla bean crème pâtissière and sweet raspberries.'
    }
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'g1',
    category: 'Бургер / Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    title: {
      ru: 'Крафтовый Бургер ALTYN',
      ky: 'ALTYN Крафт Бургери',
      en: 'ALTYN Craft Burger'
    }
  },
  {
    id: 'g2',
    category: 'Пицца / Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    title: {
      ru: 'Римская Пицца с Прошутто',
      ky: 'Прошутто кошулган Рим Пиццасы',
      en: 'Roman Prosciutto Pizza'
    }
  },
  {
    id: 'g3',
    category: 'Плов / Plov',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800',
    title: {
      ru: 'Ханский Плов на Дровах',
      ky: 'Отун менен бышкан Хан Плови',
      en: 'Fire-Wood Cooked Khan Plov'
    }
  },
  {
    id: 'g4',
    category: 'Шашлык / Shashlik',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    title: {
      ru: 'Сочные Шашлыки из Вырезки',
      ky: 'Ширелүү Баранина Шашлыгы',
      en: 'Juicy Charcoal Lamb Skewers'
    }
  },
  {
    id: 'g5',
    category: 'Стейк / Steak',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=800',
    title: {
      ru: 'Стейк Рибай сухого вызревания',
      ky: 'Кургак кармалган Рибай Стейки',
      en: 'Dry-aged Premium Ribeye Steak'
    }
  },
  {
    id: 'g6',
    category: 'Паста / Pasta',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800',
    title: {
      ru: 'Паста Тальятелле с морепродуктами',
      ky: 'Деңиз азыктары менен Тальятелле',
      en: 'Seafood Fettuccine Tagliatelle'
    }
  },
  {
    id: 'g7',
    category: 'Салаты / Salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    title: {
      ru: 'Теплый Салат с Утиной грудкой',
      ky: 'Өрдөк этинен жылуу салат',
      en: 'Warm Duck Breast & Fig Salad'
    }
  },
  {
    id: 'g8',
    category: 'Десерты / Desserts',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800',
    title: {
      ru: 'Эксклюзивные авторские десерты',
      ky: 'Эксклюзивдүү автордук десерттер',
      en: 'Signature Gourmet Dessert Platter'
    }
  }
];

export const SEEDED_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Алина Садыкова',
    rating: 5,
    comment: 'Замечательный ресторан! Плов Ханский "Алтын" — это настоящий шедевр, мясо просто тает во рту. Интерьер в черно-золотых тонах выглядит невероятно дорого и стильно. Чат-бот на сайте помог сразу узнать о наличии свободных мест. 10 из 10!',
    date: '2026-06-20'
  },
  {
    id: 'r2',
    author: 'David Harrison',
    rating: 5,
    comment: 'Undoubtedly the best dining experience in Bishkek. The Signature Gold Raf coffee with real 24k gold flakes was mindblowing. Polite staff, fluent in English, and incredibly quick delivery. Highly recommended for couples and families.',
    date: '2026-06-22'
  },
  {
    id: 'r3',
    author: 'Бексултан Амангелдиев',
    rating: 5,
    comment: 'ALTYN ресторанында үй-бүлөбүз менен абдан сонун кеч өткөрдүк. Тамактары абдан даамдуу, өзгөчө Шашлык ассортиси абдан ширелүү экен. Тейлөө жогорку деңгээлде, кыргыз тилинде дагы кызмат көрсөтүп жатканы абдан кубандырды. Рахмат сиздерге!',
    date: '2026-06-23'
  }
];
