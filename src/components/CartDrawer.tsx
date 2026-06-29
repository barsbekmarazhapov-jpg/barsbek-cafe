import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Minus, Trash2, CheckCircle2, ArrowLeft, Landmark, Wallet, AlertCircle } from 'lucide-react';
import { OrderDetails } from '../types';
import { sendOrderEmail } from '../lib/emailService';
import { EmailJSHelper } from './EmailJSHelper';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    t,
    language
  } = useApp();

  // Multi-step state: 'cart' | 'checkout' | 'success'
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState<OrderDetails>({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'cash',
    notes: ''
  });


  if (!isCartOpen) return null;

  const totalSum = cart.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset step back to cart unless in success
    if (step === 'success') {
      setStep('cart');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const actualTotal = totalSum + (totalSum >= 1500 ? 0 : 150);

    try {
      // Send order details via EmailJS to barsbekmarazhapov@gmail.com
      const result = await sendOrderEmail({
        orderDetails: formData,
        cartItems: cart,
        totalAmount: actualTotal,
        language
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to deliver email');
      }

      // Save order data to local history
      const orderRecord = {
        id: `ord-${Date.now()}`,
        items: cart.map((item) => ({
          dishId: item.dish.id,
          name: item.dish.name,
          price: item.dish.price,
          quantity: item.quantity
        })),
        details: formData,
        total: actualTotal,
        date: new Date().toISOString()
      };

      const ordersHistory = JSON.parse(localStorage.getItem('altyn_orders_history') || '[]');
      ordersHistory.push(orderRecord);
      localStorage.setItem('altyn_orders_history', JSON.stringify(ordersHistory));

      clearCart();
      setStep('success');
    } catch (err: any) {
      console.error('Error submitting order:', err);
      setSubmitError(
        language === 'ru' 
          ? 'Ошибка отправки через EmailJS. Пожалуйста, проверьте ключи настроек.' 
          : language === 'ky'
          ? 'EmailJS аркылуу жөнөтүүдө ката кетти. Сураныч, жөндөөлөрдү текшериңиз.'
          : 'Failed to send via EmailJS. Please verify your keys and configuration.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Drawer Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white border-l border-gray-100 dark:border-white/5 flex flex-col shadow-2xl h-full animate-fade-in">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold tracking-wide text-gray-900 dark:text-white flex items-center space-x-2">
              <span>{t('cartTitle')}</span>
              {cart.length > 0 && step === 'cart' && (
                <span className="text-xs bg-gold text-luxury-black font-sans px-2 py-0.5 rounded-full font-bold">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </h2>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-luxury-gray text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step content */}
          {step === 'cart' && (
            <>
              {/* CART STATE */}
              {cart.length === 0 ? (
                <div className="flex-1 px-8 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gold/5 text-gold/60 rounded-full flex items-center justify-center mb-6">
                    <Trash2 className="w-10 h-10" />
                  </div>
                  <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xs">
                    {t('cartEmpty')}
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-6 py-2.5 bg-luxury-black dark:bg-gold text-gold dark:text-luxury-black text-xs tracking-widest uppercase font-semibold rounded-full hover:bg-gold hover:text-luxury-black transition-colors cursor-pointer"
                  >
                    {t('backToShopping')}
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    {cart.map((item) => (
                      <div
                        key={item.dish.id}
                        className="flex space-x-4 bg-gray-50 dark:bg-[#111] p-4 rounded-xl border border-gray-100 dark:border-white/5"
                      >
                        <img
                          src={item.dish.image}
                          alt={item.dish.name[language]}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-semibold truncate text-gray-900 dark:text-white pr-2">
                                {item.dish.name[language]}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.dish.id)}
                                className="text-gray-400 hover:text-red-500 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="text-xs text-gold font-bold">
                              {item.dish.price} KGS
                            </span>
                          </div>

                          {/* Quantity adjustments */}
                          <div className="flex items-center space-x-3 mt-2">
                            <button
                              onClick={() => updateCartQuantity(item.dish.id, item.quantity - 1)}
                              className="p-1 rounded bg-gray-200 dark:bg-luxury-gray text-gray-700 dark:text-gray-300 hover:bg-gold hover:text-luxury-black transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.dish.id, item.quantity + 1)}
                              className="p-1 rounded bg-gray-200 dark:bg-luxury-gray text-gray-700 dark:text-gray-300 hover:bg-gold hover:text-luxury-black transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Box */}
                  <div className="p-6 bg-gray-50 dark:bg-[#111] border-t border-gray-100 dark:border-white/5 space-y-4">
                    <div className="flex justify-between items-center text-sm font-light text-gray-500 dark:text-gray-400">
                      <span>Доставка / Delivery</span>
                      <span className="text-green-600 dark:text-green-400 font-medium uppercase text-xs">
                        {totalSum >= 1500 ? 'Бесплатно / Free' : '150 KGS'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-200 dark:border-luxury-black/40 pt-4">
                      <span className="font-serif text-base font-bold text-gray-900 dark:text-white">
                        {t('total')}
                      </span>
                      <span className="font-serif text-lg font-bold text-gold">
                        {totalSum + (totalSum >= 1500 ? 0 : 150)} KGS
                      </span>
                    </div>

                    <button
                      onClick={() => setStep('checkout')}
                      className="w-full mt-4 py-4 bg-gradient-to-r from-gold via-yellow-400 to-gold text-luxury-black font-semibold text-sm tracking-widest uppercase rounded-full hover:scale-103 hover:shadow-lg hover:shadow-gold/20 transition-all cursor-pointer"
                    >
                      {t('checkoutBtn')}
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {step === 'checkout' && (
            <>
              {/* CHECKOUT STATE */}
              <div className="p-4 bg-gray-100 dark:bg-luxury-gray/50 flex items-center space-x-2">
                <button
                  onClick={() => setStep('cart')}
                  className="p-1 text-gray-500 hover:text-gold transition-colors flex items-center space-x-1 cursor-pointer text-xs uppercase tracking-wider font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t('cancelCheckout')}</span>
                </button>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between overflow-y-auto">
                <div className="p-6 space-y-5">
                  <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-luxury-gray/50 pb-2 mb-4">
                    {t('checkoutFormTitle')}
                  </h3>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                      {t('fieldName')} *
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={language === 'ru' ? 'Айбек' : language === 'ky' ? 'Айбек' : 'John Doe'}
                      className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-luxury-gray/30 text-gray-900 dark:text-white rounded-lg border border-gray-200 dark:border-luxury-gray focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                      {t('fieldPhone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+996 (555) 12-34-56"
                      className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-luxury-gray/30 text-gray-900 dark:text-white rounded-lg border border-gray-200 dark:border-luxury-gray focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@gmail.com"
                      className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-luxury-gray/30 text-gray-900 dark:text-white rounded-lg border border-gray-200 dark:border-luxury-gray focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                      {t('fieldAddress')} *
                    </label>
                    <input
                      type="text"
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder={language === 'ru' ? 'ул. Киевская 77, кв. 12' : language === 'ky' ? 'Киев көчөсү 77, кв. 12' : '77 Kievskaya St, apt 12'}
                      className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-luxury-gray/30 text-gray-900 dark:text-white rounded-lg border border-gray-200 dark:border-luxury-gray focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      {t('fieldPayment')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'cash' }))}
                        className={`p-3 rounded-lg border text-xs font-medium flex flex-col items-center justify-center space-y-1 cursor-pointer transition-all ${
                          formData.paymentMethod === 'cash'
                            ? 'border-gold bg-gold/5 text-gold font-semibold'
                            : 'border-gray-200 dark:border-luxury-gray text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <Wallet className="w-4 h-4" />
                        <span>{t('paymentCash')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'card' }))}
                        className={`p-3 rounded-lg border text-xs font-medium flex flex-col items-center justify-center space-y-1 cursor-pointer transition-all ${
                          formData.paymentMethod === 'card'
                            ? 'border-gold bg-gold/5 text-gold font-semibold'
                            : 'border-gray-200 dark:border-luxury-gray text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <Landmark className="w-4 h-4" />
                        <span>{t('paymentCard')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                      {t('fieldNotes')}
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder={language === 'ru' ? 'Код домофона, бесконтактная доставка и т.д.' : language === 'ky' ? 'Домофон коду, байланышсыз жеткирүү ж.б.' : 'Intercom, contactless delivery etc.'}
                      className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-luxury-gray/30 text-gray-900 dark:text-white rounded-lg border border-gray-200 dark:border-luxury-gray focus:outline-none focus:border-gold transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* EmailJS instructions help widget */}
                  <EmailJSHelper language={language} />
                </div>

                {/* Confirm order footer */}
                <div className="p-6 bg-gray-50 dark:bg-[#111] border-t border-gray-100 dark:border-white/5">
                  {submitError && (
                    <div className="mb-4 p-3.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-lg flex items-start space-x-2 text-xs animate-fade-in">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                      {language === 'ru' ? 'К оплате' : language === 'ky' ? 'Төлөөгө' : 'Grand Total'}
                    </span>
                    <span className="font-serif text-lg font-bold text-gold">
                      {totalSum + (totalSum >= 1500 ? 0 : 150)} KGS
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-luxury-black text-gold dark:bg-gold dark:text-luxury-black font-semibold text-sm tracking-widest uppercase rounded-full hover:bg-gold hover:text-luxury-black dark:hover:bg-gold-hover transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? t('submittingOrder') : t('placeOrderSubmit')}</span>
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 'success' && (
            <div className="flex-1 px-8 py-6 flex flex-col justify-between overflow-y-auto text-center animate-fade-in">
              <div className="flex-1 flex flex-col items-center justify-center my-auto">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-950/30 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {t('orderSuccessTitle')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-xs mb-8">
                  {t('orderSuccessMsg')}
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-luxury-black dark:bg-gold text-gold dark:text-luxury-black text-xs tracking-widest uppercase font-semibold rounded-full hover:bg-gold hover:text-luxury-black transition-all cursor-pointer mb-6"
                >
                  {language === 'ru' ? 'Прекрасно' : language === 'ky' ? 'Сонун' : 'Excellent'}
                </button>
              </div>

              {/* Step-by-step guidance block for EmailJS */}
              <div className="text-left w-full border-t border-gray-100 dark:border-white/5 pt-4 mt-4">
                <EmailJSHelper language={language} />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
