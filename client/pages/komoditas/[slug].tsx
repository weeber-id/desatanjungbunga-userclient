import Image from 'next/image';
import { useRouter } from 'next/router';
import { DummyMasakan } from '../../assets';
import {
  BreadCrumb,
  BreadCrumbItem,
  Button,
  Footer,
  Header,
  InfoDetail,
  RekomendasiTerdekat,
} from '../../components';

const KomoditasDetailPage = () => {
  const { query } = useRouter();

  const { slug } = query;

  return (
    <>
      <Header />
      <section style={{ paddingTop: 38 * 4 }} className="bg-blue-light mb-16">
        <div className="container mx-auto px-10 flex justify-end pb-4">
          <BreadCrumb>
            <BreadCrumbItem href="/komoditas">Komoditas</BreadCrumbItem>
            <BreadCrumbItem isActive>{slug}</BreadCrumbItem>
          </BreadCrumb>
        </div>
      </section>
      <section className="container mx-auto px-10 mb-16">
        <div className="grid grid-cols-2 gap-x-16">
          <div>
            <div className="sticky top-24">
              <Image layout="responsive" width={1200} height={900} src={DummyMasakan} />
            </div>
          </div>
          <div>
            <h3 className="text-h3 font-medium text-black mb-3">Gule Onta</h3>
            <p className="text-body text-purple-light mb-3 font-bold">Harga mulai:</p>
            <h4 className="text-h4 text-black font-medium mb-1">Rp 10,000 ~ 18,000/porsi</h4>
            <p className="text-body text-black mb-8">Buka Senin - Jumat (08.00 - 17.00)</p>
            <p className="text-body text-purple-light mb-3 font-bold">Sekilas Tentang Masakan A</p>
            <p className="text-body text-black mb-6">
              Phasellus varius volutpat tellus ac sollicitudin. Suspendisse tempor ligula vitae
              tempor egestas. Nulla pharetra felis, A pretium vulputate. Nunc gravida lectus sapien.
              Dui tempor.
            </p>
            <p className="text-body text-purple-light mb-5 font-bold">Pesan Sekarang :</p>
            <div className="flex items-center mb-12">
              <Button className="mr-6">Tokopedia</Button>
              <Button>Bukalapak</Button>
            </div>
            <InfoDetail />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default KomoditasDetailPage;
