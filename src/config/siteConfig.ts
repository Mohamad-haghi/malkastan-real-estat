export const siteConfig = {
  brand: 'ملکستان',
  tagline: 'جست‌وجوی هوشمند با تجربه‌ای شبیه دیدن خانه',
  description:
    'ملکستان، پلتفرم هوشمند املاک برای کشف، بررسی و درخواست خرید، اجاره و بازدید ملک.',
  phone: '۰۲۱-۹۱۰۰۲۰۳۰',
  phoneRaw: '02191002030',
  email: 'info@malkastan.ir',
  address: 'تهران، خیابان ولیعصر، برج پارسیان، طبقه ۱۲',
  workingHours: 'شنبه تا پنج‌شنبه، ۹ تا ۱۸',
  whatsapp: '+989100203000',
  social: {
    instagram: 'https://instagram.com/malkastan',
    telegram: 'https://telegram.me/malkastan',
    linkedin: 'https://linkedin.com/company/malkastan',
    twitter: 'https://twitter.com/malkastan',
  },
  heroVideo:
    'https://videos.pexels.com/video-files/7578552/7578552-uhd_3840_2160_30fps.mp4',
  requestPrefix: 'MK',
  demo: {
    yearsExperience: 15,
    completedTransactions: 3200,
    consultants: 28,
    satisfaction: 96,
    activeListings: 480,
  },
} as const;

export const navItems = [
  { label: 'خانه', path: '/' },
  { label: 'ملک‌ها', path: '/properties' },
  { label: 'مقایسه', path: '/compare' },
  { label: 'درباره ما', path: '/about' },
  { label: 'تماس', path: '/contact' },
];

export const propertyTypeLabels: Record<string, string> = {
  apartment: 'آپارتمان',
  villa: 'ویلا',
  penthouse: 'پنت‌هاوس',
  office: 'دفتر کار',
  shop: 'مغازه',
  land: 'زمین',
};

export const transactionTypeLabels: Record<string, string> = {
  sale: 'خرید',
  rent: 'اجاره',
};

export const requestTypeLabels: Record<string, string> = {
  purchase: 'درخواست خرید',
  rental: 'درخواست اجاره',
  viewing: 'درخواست بازدید',
  consultation: 'درخواست مشاوره',
};

export const needTypeLabels: Record<string, string> = {
  buy: 'خرید',
  rent: 'اجاره',
  invest: 'سرمایه‌گذاری',
  sell: 'فروش ملک',
};

export const contactMethodLabels: Record<string, string> = {
  phone: 'تماس تلفنی',
  whatsapp: 'واتساپ',
  sms: 'پیامک',
};
