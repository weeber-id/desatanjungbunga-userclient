import Image from 'next/image';
import { useRouter } from 'next/router';
import { DummyWisata } from '../../assets';
import {
  BreadCrumb,
  BreadCrumbItem,
  Footer,
  Header,
  InfoDetail,
  RekomendasiTerdekat,
} from '../../components';

const WisataDetailPage = () => {
  const { query } = useRouter();

  const { slug } = query;

  return (
    <>
      <Header />
      <section style={{ paddingTop: 38 * 4 }} className="bg-blue-light mb-16">
        <div className="container mx-auto px-10 flex justify-end pb-4">
          <BreadCrumb>
            <BreadCrumbItem href="/wisata">Wisata</BreadCrumbItem>
            <BreadCrumbItem isActive>{slug}</BreadCrumbItem>
          </BreadCrumb>
        </div>
      </section>
      <section className="container mx-auto px-6 lg:px-10 mb-16">
        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-16">
          <div>
            <div className="sticky top-24">
              <Image layout="responsive" width={1200} height={900} src={DummyWisata} />
            </div>
          </div>
          <div>
            <h3 className="md:text-h3 text-h5 font-medium text-black mb-3">
              Pendakian Pusuk Bukit
            </h3>
            <p className="text-body-sm md:text-body text-purple-light mb-3 font-bold">
              Harga Masuk:
            </p>
            <h4 className="md:text-h4 text-h5 text-black font-medium mb-1">Rp 15.000</h4>
            <p className="text-body-sm md:text-body text-black mb-8">
              Buka Senin - Jumat (08.00 - 17.00)
            </p>
            <p className="text-body-sm md:text-body text-purple-light mb-3 font-bold">
              Sekilas Tentang Pendakian Pusuk Bukit
            </p>
            <p className="text-body-sm md:text-body text-black mb-11 md:mb-16">
              Phasellus varius volutpat tellus ac sollicitudin. Suspendisse tempor ligula vitae
              tempor egestas. Nulla pharetra felis, A pretium vulputate. Nunc gravida lectus sapien.
              Dui tempor.
            </p>
            <InfoDetail />
          </div>
        </div>
      </section>
      <RekomendasiTerdekat />
      <Footer />
    </>
  );
};

export default WisataDetailPage;
