import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { Seo } from '@/components/ui/Seo';
import { Reveal } from '@/components/ui/Reveal';
import { agents } from '@/data/agents';
import { siteConfig } from '@/config/siteConfig';
import { toPersianDigits } from '@/utils/formatPrice';

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'صداقت',
      desc: 'شفافیت کامل در اطلاعات ملک و قیمت. آنچه می‌بینید، آنچه دریافت می‌کنید.',
    },
    {
      icon: Shield,
      title: 'اعتماد',
      desc: 'سال‌ها تجربه و هزاران معامله‌ی موفق، اعتمادی ساخته که قابل لمس است.',
    },
    {
      icon: Sparkles,
      title: 'کیفیت',
      desc: 'هر ملک قبل از انتشار توسط کارشناسان ما بررسی می‌شود.',
    },
    {
      icon: Users,
      title: 'همراهی',
      desc: 'از جست‌وجو تا تحویل کلید، در هر مرحله کنار شما هستیم.',
    },
  ];

  const process = [
    { step: '۱', title: 'کشف', desc: 'ملک‌ها را با فیلترهای هوشمند جست‌وجو کنید.' },
    { step: '۲', title: 'بررسی', desc: 'تصاویر، ویدئو و مشخصات کامل را مطالعه کنید.' },
    { step: '۳', title: 'بازدید', desc: 'درخواست بازدید بدهید و ملک را از نزدیک ببینید.' },
    { step: '۴', title: 'تصمیم', desc: 'با مشاوره‌ی کارشناسان، بهترین انتخاب را داشته باشید.' },
    { step: '۵', title: 'درخواست', desc: 'درخواست خرید یا اجاره خود را ثبت کنید.' },
  ];

  return (
    <>
      <Seo
        title={`درباره ما — ${siteConfig.brand}`}
        description={`داستان، فلسفه و تیم ${siteConfig.brand}؛ پلتفرم هوشمند املاک.`}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-950 py-20 lg:py-28">
        <div className="absolute inset-0">
            <img
            src="https://images.pexels.com/photos/17007765/pexels-photo-17007765.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920"
            alt=""
            className="h-full w-full object-cover opacity-30"
            loading="eager"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.fallback) {
                img.dataset.fallback = '1';
                img.src = 'https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 to-neutral-950" />
        </div>
        <div className="container-xl relative z-10">
          <Reveal>
            <span className="text-sm font-medium text-primary-400">درباره ملکستان</span>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              ما فقط ملک فروخته نمی‌کنیم.
              <br />
              <span className="bg-gradient-to-l from-primary-400 to-accent-400 bg-clip-text text-transparent">
                خانه می‌سازیم.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
              ملکستان با هدف تغییر تجربه‌ی خرید، فروش و اجاره‌ی ملک در ایران متولد شد.
              ما باور داریم که پیدا کردن خانه باید ساده، شفاف و لذت‌بخش باشد.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="text-sm font-medium text-primary-600">داستان ما</span>
              <h2 className="mt-2 section-title">از یک ایده تا یک پلتفرم</h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600">
                <p>
                  ملکستان در سال {toPersianDigits(2011)} با یک سؤال ساده شروع شد: چرا
                  پیدا کردن خانه باید این‌قدر سخت باشد؟
                </p>
                <p>
                  ما تیمی از علاقه‌مندان به فناوری و املاک جمع شدیم تا پلتفرمی بسازیم که
                  تجربه‌ی دیدن خانه را به دنیای دیجیتال بیاورد. امروز، با بیش از{' '}
                  {toPersianDigits(siteConfig.demo.activeListings)} ملک فعال و{' '}
                  {toPersianDigits(siteConfig.demo.completedTransactions)} معامله‌ی موفق،
                  یکی از معتبرترین پلتفرم‌های املاک ایران هستیم.
                </p>
                <p>
                  اما برای ما، اعداد فقط بخشی از داستان است. آنچه مهم است، لبخند
                  خانواده‌هایی است که خانه‌ی رویایی خود را با ما پیدا کرده‌اند.
                </p>
              </div>
            </Reveal>

            <Reveal variant="scale" delay={200}>
              <img
                src="https://images.pexels.com/photos/8082328/pexels-photo-8082328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="ملکستان"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (!img.dataset.fallback) {
                    img.dataset.fallback = '1';
                    img.src = 'https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
                  }
                }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy / Values */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="container-xl">
          <Reveal className="text-center">
            <span className="text-sm font-medium text-primary-600">ارزش‌های ما</span>
            <h2 className="mt-2 section-title">آنچه به آن باور داریم</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 100}>
                  <div className="h-full rounded-2xl border border-neutral-100 bg-white p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-neutral-900">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-xl">
          <Reveal className="text-center">
            <span className="text-sm font-medium text-primary-600">فرآیند ما</span>
            <h2 className="mt-2 section-title">چگونه کار می‌کنیم</h2>
            <p className="section-subtitle mx-auto max-w-xl">
              ۵ گام ساده از کشف تا درخواست
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 100}>
                <div className="relative rounded-2xl border border-neutral-100 bg-white p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-700 text-lg font-bold text-white">
                    {p.step}
                  </div>
                  <h3 className="mt-4 font-bold text-neutral-900">{p.title}</h3>
                  <p className="mt-2 text-sm text-neutral-500">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="container-xl">
          <Reveal className="text-center">
            <span className="text-sm font-medium text-primary-600">تیم ما</span>
            <h2 className="mt-2 section-title">کارشناسان ملکستان</h2>
            <p className="section-subtitle mx-auto max-w-xl">
              تیمی متخصص و متعهد که در هر مرحله کنار شماست
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent, i) => (
              <Reveal key={agent.id} delay={i * 100} variant="scale">
                <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.dataset.fallback) {
                          img.dataset.fallback = '1';
                          img.src = 'https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
                        }
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-neutral-900">{agent.name}</h3>
                    <p className="mt-1 text-sm text-primary-600">{agent.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-3">
                      {agent.bio}
                    </p>
                    <div className="mt-4 flex gap-6 text-sm">
                      <div>
                        <p className="font-bold text-neutral-900">
                          {toPersianDigits(agent.experience)}+
                        </p>
                        <p className="text-xs text-neutral-400">سال تجربه</p>
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900">
                          {toPersianDigits(agent.deals)}+
                        </p>
                        <p className="text-xs text-neutral-400">معامله</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-950 py-16">
        <div className="container-xl text-center">
          <Reveal>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              بیایید با هم شروع کنیم
            </h2>
            <p className="mt-3 text-neutral-400">
              چه خریدار باشید، چه فروشنده، چه مستأجر — ما اینجا هستیم.
            </p>
            <Link to="/properties" className="inline-block mt-6">
              <button className="btn btn-lg bg-white text-primary-700 hover:bg-neutral-100">
                مشاهده ملک‌ها
                <ArrowLeft size={20} />
              </button>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
