import emailjs from '@emailjs/browser';
import { CartItem, OrderDetails } from '../types';

interface SendOrderEmailParams {
  orderDetails: OrderDetails;
  cartItems: CartItem[];
  totalAmount: number;
  language: 'ru' | 'ky' | 'en';
}

/**
 * Sends order details to the owner's email using EmailJS.
 */
export const sendOrderEmail = async ({
  orderDetails,
  cartItems,
  totalAmount,
  language
}: SendOrderEmailParams): Promise<{ success: boolean; error?: string }> => {
  // Retrieve credentials from environment variables or use the provided working defaults
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_pctbrr9';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_g58boo2';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '-OdzE6a0h1M_hh3Tz';

  // Format cart items as a readable text list
  const formattedItems = cartItems
    .map((item, index) => {
      const dishName = item.dish.name[language] || item.dish.name.ru;
      const itemTotal = item.dish.price * item.quantity;
      return `${index + 1}. ${dishName} x ${item.quantity} (${item.dish.price} KGS) = ${itemTotal} KGS`;
    })
    .join('\n');

  // Format current date and time
  const orderTimeStr = new Date().toLocaleString(
    language === 'ru' ? 'ru-RU' : language === 'ky' ? 'ru-RU' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
  );

  const paymentMethodLabel = orderDetails.paymentMethod === 'card' 
    ? (language === 'ru' ? 'Карта' : language === 'ky' ? 'Карта' : 'Card')
    : (language === 'ru' ? 'Наличные' : language === 'ky' ? 'Накталай' : 'Cash');

  const notesText = orderDetails.notes || (language === 'ru' ? 'Нет примечаний' : language === 'ky' ? 'Эскертүү жок' : 'No notes');

  // Build a comprehensive, beautiful summary for {{message}} to ensure full information in Gmail
  const messageBody = `
=== НОВЫЙ ЗАКАЗ / NEW ORDER ===
👤 Имя клиента / Name: ${orderDetails.name}
📞 Номер телефона / Phone: ${orderDetails.phone}
📧 Email: ${orderDetails.email || '—'}
📍 Адрес доставки / Address: ${orderDetails.address}
💳 Способ оплаты / Payment: ${paymentMethodLabel}
📝 Комментарий / Notes: ${notesText}

📦 ЗАКАЗАННЫЕ БЛЮДА / DISHES:
${formattedItems}

💰 СУММА / TOTAL: ${totalAmount} KGS
⏰ Время заказа / Timestamp: ${orderTimeStr}
===================================
`.trim();

  // Construct template parameters to match EmailJS template placeholders exactly as requested
  const templateParams = {
    name: orderDetails.name,
    phone: orderDetails.phone,
    email: orderDetails.email,
    address: orderDetails.address,
    payment_method: paymentMethodLabel,
    notes: notesText,
    order: formattedItems,
    total: `${totalAmount} KGS`,
    message: messageBody, // Filled with full details to avoid empty "A message has been received" in generic templates

    // Legacy/extra fields for complete backward compatibility
    to_email: 'barsbekmarazhapov@gmail.com', // Target email requested by user
    customer_name: orderDetails.name,
    customer_phone: orderDetails.phone,
    customer_address: orderDetails.address,
    order_items: formattedItems,
    total_amount: `${totalAmount} KGS`,
    order_time: orderTimeStr,
  };

  // If EmailJS credentials are not configured, log a highly detailed development warning
  // and resolve to let the user see the visual success screen during development testing.
  if (!serviceId || !templateId || !publicKey) {
    console.warn(
      '%c[EmailJS Service] API keys are missing in your environment variables!',
      'color: #eab308; font-weight: bold; font-size: 14px;'
    );
    console.warn(
      'To enable real email delivery to barsbekmarazhapov@gmail.com, please define the following variables in your .env or AI Studio Secrets:\n\n' +
      `VITE_EMAILJS_SERVICE_ID="your_service_id"\n` +
      `VITE_EMAILJS_TEMPLATE_ID="your_template_id"\n` +
      `VITE_EMAILJS_PUBLIC_KEY="your_public_key"\n\n` +
      'Simulated payload that would be sent:',
      templateParams
    );
    
    // We simulate a 1-second delay for premium authentic feel during testing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  }

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );
    
    console.log('[EmailJS Service] Email sent successfully!', response.status, response.text);
    return { success: true };
  } catch (err: any) {
    console.error('[EmailJS Service] Failed to send email via EmailJS:', err);
    return {
      success: false,
      error: err?.text || err?.message || String(err)
    };
  }
};
