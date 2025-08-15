import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SolidarityForm from '@/components/forms/SolidarityForm';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SolidarityForm />
      </main>
      <Footer />
    </div>
  );
}
