import { useState, type FormEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Confirmation, generateRequestId } from '@/components/forms/Confirmation';
import type { Property, PropertyRequest, RequestType } from '@/types';
import { getPropertyTypeLabel, getTransactionTypeLabel } from '@/utils/formatPrice';

interface RequestFormProps {
  property?: Property;
  type: RequestType;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  phone?: string;
  description?: string;
  proposedDate?: string;
}

export function RequestForm({ property, type, onClose }: RequestFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [storedRequest, setStoredRequest] = useState<PropertyRequest | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    contactMethod: 'phone',
    preferredTime: '',
    needType: 'buy',
    proposedDate: '',
    proposedTime: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = 'نام را وارد کنید';
    if (!formData.phone.trim()) {
      e.phone = 'شماره تماس را وارد کنید';
    } else if (!/^0\d{10}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      e.phone = 'شماره تماس معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)';
    }
    if (type === 'viewing' && !formData.proposedDate.trim()) {
      e.proposedDate = 'تاریخ پیشنهادی را وارد کنید';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      const request: PropertyRequest = {
        id: generateRequestId(),
        type,
        propertyId: property?.id,
        propertyTitle: property?.title,
        name: formData.name,
        phone: formData.phone,
        budget: formData.budget,
        contactMethod: formData.contactMethod,
        preferredTime: formData.preferredTime,
        needType: formData.needType,
        proposedDate: formData.proposedDate,
        proposedTime: formData.proposedTime,
        description: formData.description,
        createdAt: new Date().toISOString(),
      };

      // Store in localStorage for demo
      try {
        const existing = JSON.parse(
          localStorage.getItem('malkastan_requests') || '[]',
        );
        existing.push(request);
        localStorage.setItem('malkastan_requests', JSON.stringify(existing));
      } catch {
        // ignore
      }

      setRequestId(request.id);
      setStoredRequest(request);
      setSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  if (success && storedRequest) {
    return (
      <Confirmation
        request={storedRequest}
        requestId={requestId}
        onClose={handleClose}
      />
    );
  }

  const formTitles: Record<RequestType, string> = {
    purchase: 'درخواست خرید ملک',
    rental: 'درخواست اجاره ملک',
    viewing: 'درخواست بازدید از ملک',
    consultation: 'درخواست مشاوره',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-neutral-900">{formTitles[type]}</h3>
        {property && (
          <div className="mt-2 rounded-lg bg-primary-50 px-4 py-3">
            <p className="text-sm font-medium text-primary-800">{property.title}</p>
            <p className="mt-0.5 text-xs text-primary-600">
              {getPropertyTypeLabel(property.type)} •{' '}
              {getTransactionTypeLabel(property.transactionType)} •{' '}
              {property.neighborhood}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="نام و نام خانوادگی"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          placeholder="مثال: علی محمدی"
        />

        <Input
          label="شماره تماس"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          dir="ltr"
        />

        {/* Type-specific fields */}
        {(type === 'purchase' || type === 'rental') && (
          <>
            <Select
              label="روش تماس ترجیحی"
              value={formData.contactMethod}
              onChange={(e) => handleChange('contactMethod', e.target.value)}
            >
              <option value="phone">تماس تلفنی</option>
              <option value="whatsapp">واتساپ</option>
              <option value="sms">پیامک</option>
            </Select>

            <Input
              label="زمان مناسب تماس"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={(e) => handleChange('preferredTime', e.target.value)}
              placeholder="مثال: بعدازظهر ۱۶ تا ۱۸"
            />

            <Input
              label="بودجه تقریبی"
              name="budget"
              value={formData.budget}
              onChange={(e) => handleChange('budget', e.target.value)}
              placeholder="مثال: ۲ میلیارد تومان"
            />
          </>
        )}

        {type === 'viewing' && (
          <>
            <Input
              label="تاریخ پیشنهادی"
              name="proposedDate"
              type="date"
              value={formData.proposedDate}
              onChange={(e) => handleChange('proposedDate', e.target.value)}
              error={errors.proposedDate}
            />

            <Select
              label="زمان پیشنهادی"
              value={formData.proposedTime}
              onChange={(e) => handleChange('proposedTime', e.target.value)}
            >
              <option value="">انتخاب کنید</option>
              <option value="morning">صبح (۹ تا ۱۲)</option>
              <option value="noon">ظهر (۱۲ تا ۱۴)</option>
              <option value="afternoon">بعدازظهر (۱۴ تا ۱۸)</option>
            </Select>
          </>
        )}

        {type === 'consultation' && (
          <>
            <Select
              label="نیاز شما"
              value={formData.needType}
              onChange={(e) => handleChange('needType', e.target.value)}
            >
              <option value="buy">خرید</option>
              <option value="rent">اجاره</option>
              <option value="invest">سرمایه‌گذاری</option>
              <option value="sell">فروش ملک</option>
            </Select>

            <Input
              label="بودجه تقریبی"
              name="budget"
              value={formData.budget}
              onChange={(e) => handleChange('budget', e.target.value)}
              placeholder="مثال: ۳ میلیارد تومان"
            />
          </>
        )}
      </div>

      <Textarea
        label="توضیحات"
        name="description"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="توضیحات بیشتر درباره نیاز خود..."
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={submitting} className="flex-1">
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              در حال ارسال...
            </>
          ) : (
            <>
              <Send size={18} />
              ثبت درخواست
            </>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          انصراف
        </Button>
      </div>

      <p className="text-center text-xs text-neutral-400">
        این یک فرم نمایشی است. اطلاعات شما ذخیره می‌شود اما هیچ تماس واقعی انجام نمی‌شود.
      </p>
    </form>
  );
}
