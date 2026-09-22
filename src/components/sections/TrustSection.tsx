import { Award, Handshake, Users, ThumbsUp } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { toPersianDigits } from '@/utils/formatPrice';
import { Reveal } from '@/components/ui/Reveal';

export function TrustSection() {
  const metrics = [
    {
      icon: Award,
      value: siteConfig.demo.yearsExperience,
      label: 'سال تجربه',
      suffix: '+',
    },
    {
      icon: Handshake,
      value: siteConfig.demo.completedTransactions,
      label: 'معامله موفق',
      suffix: '+',
    },
    {
      icon: Users,
      value: siteConfig.demo.consultants,
      label: 'کارشناس متخصص',
      suffix: '',
    },
    {
      icon: ThumbsUp,
      value: siteConfig.demo.satisfaction,
      label: 'رضایت مشتری',
      suffix: '٪',
    },
  ];

  return (
    <section className="bg-primary-950 py-16 lg:py-24">
      <div className="container-xl">
        <Reveal className="text-center">
          <span className="text-sm font-medium text-primary-400">چرا ملکستان؟</span>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            اعتمادی که ساخته‌ایم
          </h2>
          <p className="mt-3 text-neutral-400 max-w-xl mx-auto">
            سال‌ها تجربه در بازار املاک تهران، همراه با تیمی حرفه‌ای و متعهد
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.label} delay={i * 100}>
                <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-colors hover:bg-white/10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-800/50 text-primary-400">
                    <Icon size={28} />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-white lg:text-4xl">
                    {toPersianDigits(m.value)}{m.suffix}
                  </p>
                  <p className="mt-1 text-sm text-neutral-400">{m.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={400} className="mt-10 text-center">
          <p className="text-xs text-neutral-500">
            * این مقادیر محتوای نمایشی هستند و به‌راحتی قابل جایگزینی هستند.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
