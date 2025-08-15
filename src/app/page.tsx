import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import UploadForm from '@/components/ui/UploadForm'; // <--- THIS LINE IS THE CORRECTION

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <UploadForm />
      </main>
      <Footer />
    </div>
  );
}
