import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  Instagram,
  MessageCircle,
} from 'lucide-react';
import { Seo } from '@/components/ui/Seo';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/siteConfig';

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

export function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'consultation',
    message: '',
  });

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'نام را وارد کنید';
    if (!form.phone.trim()) {
      e.phone = 'شماره تماس را وارد کنید';
    } else if (!/^0\d{10}$/.test(form.phone.replace(/[\s-]/g, ''))) {
      e.phone = 'شماره تماس معتبر نیست';
    }
    if (!form.message.trim()) e.message = 'پیام خود را بنویسید';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', subject: 'consultation', message: '' });
    }, 1200);
  };

  const contactInfo = [
    { icon: MapPin, label: 'نشانی', value: siteConfig.address },
    { icon: Phone, label: 'تلفن', value: siteConfig.phone, dir: 'ltr', href: `tel:${siteConfig.phoneRaw}` },
    { icon: Mail, label: 'ایمیل', value: siteConfig.email, dir: 'ltr', href: `mailto:${siteConfig.email}` },
    { icon: Clock, label: 'ساعات کاری', value: siteConfig.workingHours },
  ];

  return (
    <>
      <Seo
        title={`تماس با ما — ${siteConfig.brand}`}
        description={`با ${siteConfig.brand} در تماس باشید. تلفن، ایمیل و نشانی ما.`}
      />

      {/* Header */}
      <div className="border-b border-neutral-100 bg-white pt-8 pb-6">
        <div className="container-xl">
          <nav className="text-sm text-neutral-400">
            <span>خانه</span> <span className="mx-1">/</span>{' '}
            <span className="text-neutral-700">تماس</span>
          </nav>
          <h1 className="mt-3 text-2xl font-bold text-neutral-900 sm:text-3xl">
            با ما در تماس باشید
          </h1>
          <p className="mt-2 text-neutral-500">
            سؤال دارید یا نیاز به مشاوره دارید؟ تیم ما آماده‌ی پاسخگویی است.
          </p>
        </div>
      </div>

      <div className="container-xl py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Contact info */}
          <Reveal>
            <h2 className="text-xl font-bold text-neutral-900">اطلاعات تماس</h2>
            <p className="mt-3 text-neutral-500">
              از راه‌های زیر با ما در ارتباط باشید. در ساعات کاری پاسخگوی شما هستیم.
            </p>

            <div className="mt-8 space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                const content = info.href ? (
                  <a
                    href={info.href}
                    className="text-sm font-medium text-neutral-900 transition-colors hover:text-primary-700"
                    dir={info.dir as 'ltr' | undefined}
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-neutral-900">{info.value}</p>
                );
                return (
                  <div
                    key={info.label}
                    className="flex items-start gap-4 rounded-xl border border-neutral-100 bg-white p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400">{info.label}</p>
                      {content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social */}
            <div className="mt-8">
              <p className="text-sm font-medium text-neutral-700">ما را دنبال کنید</p>
              <div className="mt-3 flex gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                  aria-label="اینستاگرام"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={siteConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                  aria-label="تلگرام"
                >
                  <MessageCircle size={20} />
                </a>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                  aria-label="تلفن"
                >
                  <Phone size={20} />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-100">
              <div className="flex aspect-video items-center justify-center bg-neutral-100 text-neutral-400">
                <div className="text-center">
                  <MapPin size={32} className="mx-auto" />
                  <p className="mt-2 text-sm">{siteConfig.address}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={200}>
            {success ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white p-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 animate-scale-in">
                  <CheckCircle2 size={44} className="text-primary-600" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-neutral-900">
                  پیام شما ارسال شد
                </h3>
                <p className="mt-2 text-sm text-neutral-500">
                  کارشناسان ما در اولین فرصت با شما تماس خواهند گرفت.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSuccess(false)}
                >
                  ارسال پیام جدید
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8"
              >
                <h2 className="text-xl font-bold text-neutral-900">فرم تماس</h2>
                <p className="mt-2 text-sm text-neutral-500">
                  فرم زیر را پر کنید تا با شما تماس بگیریم.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      label="نام و نام خانوادگی"
                      name="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      error={errors.name}
                      placeholder="مثال: علی محمدی"
                    />
                    <Input
                      label="شماره تماس"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      error={errors.phone}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      dir="ltr"
                    />
                  </div>

                  <Input
                    label="ایمیل (اختیاری)"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="example@email.com"
                    dir="ltr"
                  />

                  <Select
                    label="موضوع"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  >
                    <option value="consultation">مشاوره</option>
                    <option value="buy">خرید ملک</option>
                    <option value="rent">اجاره ملک</option>
                    <option value="sell">فروش ملک</option>
                    <option value="other">سایر</option>
                  </Select>

                  <Textarea
                    label="پیام شما"
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    error={errors.message}
                    placeholder="پیام خود را اینجا بنویسید..."
                    className="min-h-[140px]"
                  />

                  <Button type="submit" disabled={submitting} className="w-full" size="lg">
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        در حال ارسال...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        ارسال پیام
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-neutral-400">
                    این یک فرم نمایشی است و پیام واقعی ارسال نمی‌شود.
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </>
  );
}
