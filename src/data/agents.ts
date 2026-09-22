import type { Agent } from '@/types';

export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'سارا محمدی',
    title: 'کارشناس ارشد املاک لوکس',
    phone: '۰۹۱۲-۳۴۵-۶۷۸۹',
    email: 'sara.mohammadi@malkastan.ir',
    photo:
      'https://images.pexels.com/photos/30781748/pexels-photo-30781748.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bio: 'بیش از یک دهه تجربه در بازار املاک لوکس تهران. تخصص در مناطق شمالی و ویلاهای اختصاصی.',
    experience: 12,
    deals: 340,
    languages: ['فارسی', 'انگلیسی'],
  },
  {
    id: 'agent-2',
    name: 'رضا کریمی',
    title: 'مشاور املاک و سرمایه‌گذاری',
    phone: '۰۹۱۲-۸۹۰-۱۲۳۴',
    email: 'reza.karimi@malkastan.ir',
    photo:
      'https://images.pexels.com/photos/34299170/pexels-photo-34299170.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bio: 'متخصص سرمایه‌گذاری املاک و تحلیل بازار. مشاور پروژه‌های بزرگ مسکونی و تجاری.',
    experience: 10,
    deals: 280,
    languages: ['فارسی', 'انگلیسی', 'ترکی'],
  },
  {
    id: 'agent-3',
    name: 'مریم احمدی',
    title: 'کارشناس املاک خانوادگی',
    phone: '۰۹۱۲-۵۶۷-۸۹۰۱',
    email: 'maryam.ahmadi@malkastan.ir',
    photo:
      'https://images.pexels.com/photos/7414901/pexels-photo-7414901.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bio: 'تخصص در ملک‌های خانوادگی و آپارتمان‌های اقتصادی. همراه شما از جست‌وجو تا تحویل کلید.',
    experience: 8,
    deals: 195,
    languages: ['فارسی', 'عربی'],
  },
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}
