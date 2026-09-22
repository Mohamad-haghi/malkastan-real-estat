import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/Home/HomePage';
import { PropertiesPage } from '@/pages/Properties/PropertiesPage';
import { PropertyDetailPage } from '@/pages/PropertyDetail/PropertyDetailPage';
import { ComparePage } from '@/pages/Compare/ComparePage';
import { AboutPage } from '@/pages/About/AboutPage';
import { ContactPage } from '@/pages/Contact/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-primary-700">۴۰۴</p>
      <h1 className="mt-4 text-2xl font-bold text-neutral-900">صفحه پیدا نشد</h1>
      <p className="mt-2 text-neutral-500">صفحه‌ای که دنبال آن بودید وجود ندارد.</p>
      <Link to="/" className="btn btn-primary mt-6">
        بازگشت به خانه
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:id" element={<PropertyDetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
