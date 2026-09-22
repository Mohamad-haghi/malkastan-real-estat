import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  Home,
  TrendingUp,
  Users,
  Building2,
  Ruler,
  Sun,
  Trees,
  Car,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { properties as allProperties } from '@/data/properties';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { toPersianDigits } from '@/utils/formatPrice';
import type { Property } from '@/types';

interface Question {
  id: string;
  question: string;
  icon: typeof Home;
  options: { label: string; value: string }[];
  field: string;
}

const questions: Question[] = [
  {
    id: 'transaction',
    question: 'خرید یا اجاره؟',
    icon: Home,
    field: 'transactionType',
    options: [
      { label: 'خرید', value: 'sale' },
      { label: 'اجاره', value: 'rent' },
    ],
  },
  {
    id: 'purpose',
    question: 'زندگی یا سرمایه‌گذاری؟',
    icon: TrendingUp,
    field: 'purpose',
    options: [
      { label: 'زندگی', value: 'live' },
      { label: 'سرمایه‌گذاری', value: 'invest' },
    ],
  },
  {
    id: 'people',
    question: 'چند نفر؟',
    icon: Users,
    field: 'bedrooms',
    options: [
      { label: '۱ نفر', value: '1' },
      { label: '۲ نفر', value: '2' },
      { label: '۳ نفر', value: '3' },
      { label: '۴ نفر یا بیشتر', value: '4' },
    ],
  },
  {
    id: 'type',
    question: 'آپارتمان یا ویلا؟',
    icon: Building2,
    field: 'propertyType',
    options: [
      { label: 'آپارتمان', value: 'apartment' },
      { label: 'ویلا', value: 'villa' },
      { label: 'پنت‌هاوس', value: 'penthouse' },
    ],
  },
  {
    id: 'area',
    question: 'متراژ چقدر اهمیت دارد؟',
    icon: Ruler,
    field: 'areaImportance',
    options: [
      { label: 'مهم نیست', value: 'low' },
      { label: 'متوسط', value: 'medium' },
      { label: 'بسیار مهم', value: 'high' },
    ],
  },
  {
    id: 'light',
    question: 'نورگیری چقدر مهم است؟',
    icon: Sun,
    field: 'lightImportance',
    options: [
      { label: 'مهم نیست', value: 'low' },
      { label: 'متوسط', value: 'medium' },
      { label: 'بسیار مهم', value: 'high' },
    ],
  },
  {
    id: 'calm',
    question: 'آرامش محله چقدر مهم است؟',
    icon: Trees,
    field: 'calmImportance',
    options: [
      { label: 'مهم نیست', value: 'low' },
      { label: 'متوسط', value: 'medium' },
      { label: 'بسیار مهم', value: 'high' },
    ],
  },
  {
    id: 'access',
    question: 'دسترسی شهری چقدر مهم است؟',
    icon: Car,
    field: 'accessImportance',
    options: [
      { label: 'مهم نیست', value: 'low' },
      { label: 'متوسط', value: 'medium' },
      { label: 'بسیار مهم', value: 'high' },
    ],
  },
  {
    id: 'amenities',
    question: 'امکانات چقدر مهم است؟',
    icon: Wrench,
    field: 'amenitiesImportance',
    options: [
      { label: 'مهم نیست', value: 'low' },
      { label: 'متوسط', value: 'medium' },
      { label: 'بسیار مهم', value: 'high' },
    ],
  },
];

const calmNeighborhoods = ['الهیه', 'فرشته', 'سعادت‌آباد'];
const accessibleNeighborhoods = ['ونک', 'چیتگر'];

function scoreProperty(p: Property, answers: Record<string, string>): number {
  let score = 0;

  if (answers.transactionType && p.transactionType === answers.transactionType) {
    score += 30;
  }

  if (answers.purpose === 'invest' && (p.type === 'land' || p.type === 'office' || p.featured)) {
    score += 15;
  }
  if (answers.purpose === 'live' && (p.type === 'apartment' || p.type === 'villa' || p.type === 'penthouse')) {
    score += 15;
  }

  if (answers.bedrooms) {
    const needed = Number(answers.bedrooms);
    if (p.bedrooms >= needed) score += 20;
  }

  if (answers.propertyType && p.type === answers.propertyType) {
    score += 25;
  }

  if (answers.areaImportance === 'high' && p.area >= 150) score += 10;
  if (answers.areaImportance === 'medium' && p.area >= 100) score += 5;

  if (answers.lightImportance === 'high') {
    if (p.floor > 0 && p.floor >= p.totalFloors - 2) score += 10;
    if (p.features.some((f) => f.includes('تراس') || f.includes('نور'))) score += 5;
  }

  if (answers.calmImportance === 'high' && calmNeighborhoods.includes(p.neighborhood)) {
    score += 15;
  }
  if (answers.calmImportance === 'medium' && calmNeighborhoods.includes(p.neighborhood)) {
    score += 7;
  }

  if (answers.accessImportance === 'high' && accessibleNeighborhoods.includes(p.neighborhood)) {
    score += 15;
  }
  if (answers.accessImportance === 'medium' && accessibleNeighborhoods.includes(p.neighborhood)) {
    score += 7;
  }

  if (answers.amenitiesImportance === 'high' && p.features.length >= 4) score += 10;
  if (answers.amenitiesImportance === 'medium' && p.features.length >= 3) score += 5;

  if (p.featured) score += 5;

  return score;
}

export function SmartFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    const current = questions[step];
    const newAnswers = { ...answers, [current.field]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const matchedProperties = (): Property[] => {
    const scored = allProperties
      .map((p) => ({ property: p, score: scoreProperty(p, answers) }))
      .sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map((s) => s.property);
  };

  if (showResults) {
    const results = matchedProperties();
    return (
      <div className="container-xl py-16 lg:py-24">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700">
            <Sparkles size={16} />
            نتایج هوشمند
          </div>
          <h2 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
            ملک‌های پیشنهادی شما
          </h2>
          <p className="mt-3 text-neutral-500">
            بر اساس پاسخ‌های شما، {toPersianDigits(results.length)} ملک مناسب پیدا شد
          </p>
        </Reveal>

        {results.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="mt-10 text-center">
            <p className="text-neutral-500">
              متأسفانه ملک مطابق با همه‌ی معیارهای شما پیدا نشد. فیلترها را تغییر دهید یا همه‌ی ملک‌ها را ببینید.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex gap-3">
            <Button onClick={handleReset} variant="outline">
              شروع دوباره
            </Button>
            <Link to="/properties">
              <Button>
                مشاهده همه ملک‌ها
                <ArrowLeft size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const Icon = current.icon;

  return (
    <div className="container-xl py-16 lg:py-24">
      <Reveal className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-2 text-sm font-medium text-accent-700">
          <Sparkles size={16} />
          پیداکننده‌ی هوشمند ملک
        </div>
        <h2 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
          ملک مناسب خود را هوشمندانه پیدا کنید
        </h2>
        <p className="mt-3 text-neutral-500 max-w-xl mx-auto">
          به چند سؤال کوتاه پاسخ دهید تا بهترین ملک‌ها برای شما پیدا شوند
        </p>
      </Reveal>

      <div className="mx-auto mt-10 max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <span>
              سؤال {toPersianDigits(step + 1)} از {toPersianDigits(questions.length)}
            </span>
            <span>{toPersianDigits(Math.round(progress))}٪</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full bg-gradient-to-l from-primary-600 to-primary-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 sm:text-xl">
              {current.question}
            </h3>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {current.options.map((opt) => {
              const selected = answers[current.field] === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className={`flex items-center justify-between rounded-xl border-2 px-5 py-4 text-base font-medium transition-all ${
                    selected
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-neutral-200 text-neutral-700 hover:border-primary-300 hover:bg-primary-50/50'
                  }`}
                >
                  {opt.label}
                  {selected && <Check size={20} className="text-primary-600" />}
                </button>
              );
            })}
          </div>

          {/* Nav */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="flex items-center gap-1 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-800 disabled:opacity-30"
            >
              <ArrowRight size={16} />
              قبلی
            </button>
            <button
              onClick={() => setShowResults(true)}
              className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-800"
            >
              مشاهده نتایج
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
