import { useState } from 'react';
import { CheckCircle2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  requestTypeLabels,
} from '@/config/siteConfig';
import type { PropertyRequest, RequestType } from '@/types';
import { toPersianDigits } from '@/utils/formatPrice';

interface ConfirmationProps {
  request: PropertyRequest;
  requestId: string;
  onClose: () => void;
}

export function Confirmation({ request, requestId, onClose }: ConfirmationProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(requestId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 animate-scale-in">
        <CheckCircle2 size={44} className="text-primary-600" />
      </div>

      <h3 className="mt-5 text-xl font-bold text-neutral-900">
        درخواست شما با موفقیت ثبت شد
      </h3>
      <p className="mt-2 text-sm text-neutral-500">
        کارشناس ملکستان در اولین فرصت با شما تماس خواهد گرفت.
      </p>

      {/* Request ID */}
      <div className="mt-5 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-4">
        <p className="text-xs text-neutral-400">شماره درخواست</p>
        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="text-lg font-bold tracking-wider text-neutral-900" dir="ltr">
            {requestId}
          </span>
          <button
            onClick={handleCopy}
            className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700"
            aria-label="کپی شماره درخواست"
          >
            {copied ? <CheckCircle2 size={16} className="text-primary-600" /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 w-full space-y-2 text-right">
        <div className="flex items-center justify-between rounded-lg bg-white px-4 py-2.5 border border-neutral-100">
          <span className="text-sm text-neutral-400">نوع درخواست</span>
          <span className="text-sm font-medium text-neutral-900">
            {requestTypeLabels[request.type]}
          </span>
        </div>
        {request.propertyTitle && (
          <div className="flex items-center justify-between rounded-lg bg-white px-4 py-2.5 border border-neutral-100">
            <span className="text-sm text-neutral-400">ملک</span>
            <span className="text-sm font-medium text-neutral-900 line-clamp-1 max-w-[60%]">
              {request.propertyTitle}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between rounded-lg bg-white px-4 py-2.5 border border-neutral-100">
          <span className="text-sm text-neutral-400">نام</span>
          <span className="text-sm font-medium text-neutral-900">{request.name}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white px-4 py-2.5 border border-neutral-100">
          <span className="text-sm text-neutral-400">شماره تماس</span>
          <span className="text-sm font-medium text-neutral-900" dir="ltr">
            {request.phone}
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs text-neutral-400">
        این یک درخواست نمایشی است و هیچ پرداخت واقعی انجام نشده است.
      </p>

      <Button onClick={onClose} className="mt-6 w-full">
        متوجه شدم
      </Button>
    </div>
  );
}

export function generateRequestId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `MK-${year}-${toPersianDigits(random)}`;
}

