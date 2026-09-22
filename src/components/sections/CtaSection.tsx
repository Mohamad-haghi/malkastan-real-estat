import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { Reveal } from '@/components/ui/Reveal';
import { RequestModal } from '@/components/forms/RequestModal';

export function CtaSection() {
  const [showConsultation, setShowConsultation] = useState(false);

  return (
    <>
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="container-xl">
          <Reveal variant="scale">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-primary-800 to-primary-600 px-8 py-14 text-center lg:px-16 lg:py-20">
              {/* Decorative shapes */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
              <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  آماده‌اید خانه‌ی بعدی را پیدا کنید؟
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-primary-100">
                  کارشناسان ما در ملکستان آماده‌اند تا شما را در هر مرحله از این
                  مسیر همراهی کنند.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link to="/properties">
                    <button className="btn btn-lg bg-white text-primary-700 hover:bg-neutral-100 hover:shadow-xl">
                      مشاهده ملک‌ها
                      <ArrowLeft size={20} />
                    </button>
                  </Link>
                  <button
                    onClick={() => setShowConsultation(true)}
                    className="btn btn-lg border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
                  >
                    <MessageCircle size={18} />
                    درخواست مشاوره
                  </button>
                  <a href={`tel:${siteConfig.phoneRaw}`}>
                    <button className="btn btn-lg border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20">
                      <Phone size={18} />
                      {siteConfig.phone}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <RequestModal
        open={showConsultation}
        onClose={() => setShowConsultation(false)}
        type="consultation"
      />
    </>
  );
}
