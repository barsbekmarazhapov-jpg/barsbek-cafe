import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, MessageSquare, Quote, Check } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview, t, language } = useApp();
  
  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Calculate Average Score
  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addReview(name, rating, comment);
    setIsSubmitted(true);
    
    // Reset Form
    setName('');
    setRating(5);
    setComment('');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="reviews" className="py-24 bg-[#0a0a0a] border-b border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#d4af37] text-sm font-semibold tracking-widest uppercase mb-3">
            <MessageSquare className="w-4 h-4" />
            <span>{t('navReviews')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4 tracking-tight">
            {t('reviewsTitle')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Rating Summary & Write Review Form Column */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Bento Card 1: Average Rating (Bento style) */}
            <div className="bg-[#1a1a1a] p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-[#d4af37]/30 transition-all duration-300">
              <div>
                <div className="flex gap-1 text-[#d4af37] mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>
                <p className="text-[10px] text-white/50 italic max-w-[180px] line-clamp-2">
                  "{reviews[0]?.comment || 'Лучший сервис в городе!'}"
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-serif font-bold text-white leading-none">
                  {averageRating}
                </div>
                <div className="text-[8px] uppercase tracking-wider text-white/40 mt-1">
                  {reviews.length}+ {language === 'ru' ? 'Отзывов' : language === 'ky' ? 'Пикирлер' : 'Reviews'}
                </div>
              </div>
            </div>

            {/* Bento Card 2: Leave a Review Form */}
            <div className="bg-[#111] p-6 sm:p-8 rounded-3xl border border-white/5">
              <h3 className="font-serif text-lg font-bold text-white mb-4 border-b border-white/5 pb-3">
                {t('addReviewTitle')}
              </h3>

              {isSubmitted ? (
                <div className="py-8 text-center animate-fade-in">
                  <div className="w-12 h-12 bg-green-900/30 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-white mb-2 text-sm">
                    {language === 'ru' ? 'Отзыв отправлен!' : language === 'ky' ? 'Пикир жөнөтүлдү!' : 'Review Submitted!'}
                  </h4>
                  <p className="text-xs text-white/40 font-light">
                    {language === 'ru' ? 'Спасибо, что помогаете нам быть лучшими.' : language === 'ky' ? 'Бизди тандаганыңыз үчүн рахмат.' : 'Thank you for sharing your premium experience.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
                      {t('ratingLabel')}
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="text-white/20 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              (hoverRating !== null ? star <= hoverRating : star <= rating)
                                ? 'fill-[#d4af37] text-[#d4af37]'
                                : 'text-white/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
                      {t('fieldName')}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'ru' ? 'Александр' : language === 'ky' ? 'Адилет' : 'Your name'}
                      className="w-full px-4 py-2.5 text-xs bg-white/5 text-white rounded-xl border border-white/5 focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                  </div>

                  {/* Comment Input */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
                      {language === 'ru' ? 'Ваш отзыв' : language === 'ky' ? 'Пикириңиз' : 'Your review'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={t('reviewCommentPlaceholder')}
                      className="w-full px-4 py-2.5 text-xs bg-white/5 text-white rounded-xl border border-white/5 focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#d4af37] text-black font-bold text-[10px] tracking-widest uppercase rounded-xl hover:bg-white transition-colors cursor-pointer"
                  >
                    {t('submitReview')}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Reviews List Feed Column (Bento Cards) */}
          <div className="lg:col-span-2 space-y-4 max-h-[580px] overflow-y-auto pr-2">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#111] p-6 sm:p-7 rounded-3xl border border-white/5 relative group hover:border-[#d4af37]/10 transition-all duration-300"
              >
                {/* Quote Icon Background */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-white/[0.02] group-hover:text-[#d4af37]/[0.02] transition-colors pointer-events-none" />

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                  <div>
                    <h4 className="font-serif text-base font-bold text-white group-hover:text-[#d4af37] transition-colors">
                      {rev.author}
                    </h4>
                    <span className="text-[10px] text-white/40 font-light font-mono">
                      {rev.date}
                    </span>
                  </div>
                  
                  {/* Stars list */}
                  <div className="flex space-x-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-[#d4af37] text-[#d4af37]'
                            : 'text-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
