import Image from 'next/image';
import { useRouter } from 'next/router';
import { DummyHotel, IconAirPanas } from '../../assets';
import {
  BreadCrumb,
  BreadCrumbItem,
  Button,
  FasilitasIcon,
  Footer,
  Header,
  InfoDetail,
} from '../../components';

const PenginapanDetailPage = () => {
  const { query } = useRouter();

  const { slug } = query;

  return (
    <>
      <Header />
      <section style={{ paddingTop: 38 * 4 }} className="bg-blue-light mb-16">
        <div className="container mx-auto px-6 md:px-10 flex justify-end pb-4">
          <BreadCrumb>
            <BreadCrumbItem href="/penginapan">Penginapan</BreadCrumbItem>
            <BreadCrumbItem isActive>{slug}</BreadCrumbItem>
          </BreadCrumb>
        </div>
      </section>
      <section className="container mx-auto px-6 md:px-10 mb-16">
        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-16">
          <div>
            <div className="sticky top-24">
              <Image layout="responsive" width={1200} height={900} src={DummyHotel} />
            </div>
          </div>
          <div>
            <h3 className="md:text-h3 text-h5 font-medium text-black mb-3">Hotel Amburadul</h3>
            <p className="md:text-body text-body-sm text-purple-light mb-3 font-bold">
              Harga mulai:
            </p>
            <h4 className="md:text-h4 text-h5 text-black font-medium mb-1">Rp 80.000/Malam</h4>
            <p className="md:text-body text-body-sm text-black mb-8">
              Buka Senin - Jumat (08.00 - 17.00)
            </p>
            <p className="md:text-body text-body-sm text-purple-light mb-3 font-bold">
              Sekilas Tentang Hotel Amburadul :
            </p>
            <p className="md:text-body text-body-sm text-black mb-6">
              Phasellus varius volutpat tellus ac sollicitudin. Suspendisse tempor ligula vitae
              tempor egestas. Nulla pharetra felis, A pretium vulputate. Nunc gravida lectus sapien.
              Dui tempor.
            </p>
            <p className="md:text-body text-body-sm text-purple-light mb-5 font-bold">
              Pesan Sekarang :
            </p>
            <div className="flex items-center mb-10">
              <Button className="mr-6">Traveloka</Button>
              <Button>Pegi-Pegi</Button>
            </div>
            <p className="md:text-body text-body-sm text-purple-light mb-5 font-bold">
              Fasilitas :
            </p>
            <div className="grid grid-cols-3 gap-y-10 mb-12">
              <FasilitasIcon Icon={IconAirPanas} text="Kamar Mandi" />
              <FasilitasIcon Icon={IconAirPanas} text="Kamar Mandi" />
              <FasilitasIcon Icon={IconAirPanas} text="Kamar Mandi" />
              <FasilitasIcon Icon={IconAirPanas} text="Kamar Mandi" />
              <FasilitasIcon Icon={IconAirPanas} text="Kamar Mandi" />
              <FasilitasIcon Icon={IconAirPanas} text="Kamar Mandi" />
              <FasilitasIcon Icon={IconAirPanas} text="Kamar Mandi" />
            </div>
            <InfoDetail />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PenginapanDetailPage;
