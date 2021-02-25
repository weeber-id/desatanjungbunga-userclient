import Image from 'next/image';
import { IconWhatsapp } from '../../assets';
import { Button, Footer, Header } from '../../components';

const ContactPage = () => {
  return (
    <>
      <Header />
      <h3 className="text-center text-purple md:text-h3 text-h5 mt-48 font-medium mb-11">
        Hubungi Kami
      </h3>
      <section className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div className="">
            <h3 className="text-purple lg:text-h3 md:text-h4 text-h5 font-medium mb-5">Map</h3>
            <Image
              src="/assets/images/map-tanjung-bunga.png"
              width={486}
              height={354}
              layout="responsive"
            />
          </div>
          <div className="row-start-1 lg:row-start-auto">
            <h3 className="text-purple lg:text-h3 md:text-h4 text-h5 font-medium mb-5">
              Alamat Desa
            </h3>
            <h5 className="md:text-h5 text-body font-medium text-black md:mb-12 mb-6">
              Desa Tanjung Bunga, Kecamatan Pangururan, Kabupaten Samosir, Provinsi Sumatra
              Utara,Indonesia, Kode Pos 22392.
            </h5>
            <h3 className="text-purple lg:text-h3 md:text-h4 text-h5 font-medium md:mb-6 mb-3">
              Kontak
            </h3>
            <h3 className="text-black lg:text-h3 md:text-h4 text-h5 font-medium">
              0626 - 01020304
            </h3>
            <p className="md:text-body text-body-sm text-purple mb-5">
              Hubungan Masyarakat (Humas)
            </p>
            <h3 className="text-black lg:text-h3 md:text-h4 text-h5 font-medium">
              0626 - 20025004
            </h3>
            <p className="md:text-body text-body-sm text-purple">
              Kantor Sekretariatan Desa Tanjung Bunga, Kec. Pangururan, Kab. Samosir.
            </p>
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center justify-center border border-purple px-4 py-8 rounded-2xl mb-20 w-3/4 mx-auto">
          <div style={{ borderRadius: 56 }} className="bg-blue p-9 mb-3 md:mb-0 mr-0 md:mr-16">
            <IconWhatsapp />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-purple lg:text-h3 md:text-h4 text-h5 font-medium mb-3">Whatsapp</h3>
            <Button className="mb-5">0626 - 01020304</Button>
            <p className="md:text-body text-body-sm text-center text-purple">
              Hubungan Masyarakat (Humas)
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactPage;
