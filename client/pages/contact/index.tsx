import Image from 'next/image';
import { IconWhatsapp } from '../../assets';
import { Button, Footer, Header } from '../../components';

const ContactPage = () => {
  return (
    <>
      <Header />
      <h3 className="text-center text-purple text-h3 mt-48 font-medium mb-11">Hubungi Kami</h3>
      <section className="container mx-auto px-10">
        <div className="grid grid-cols-2 gap-10 mb-16">
          <div>
            <h3 className="text-purple text-h3 font-medium mb-5">Map</h3>
            <Image
              src="/assets/images/map-tanjung-bunga.png"
              width={486}
              height={354}
              layout="responsive"
            />
          </div>
          <div>
            <h3 className="text-purple text-h3 font-medium mb-5">Alamat Desa</h3>
            <h5 className="text-h5 font-medium text-black mb-12">
              Desa Tanjung Bunga, Kecamatan Pangururan, Kabupaten Samosir, Provinsi Sumatra
              Utara,Indonesia, Kode Pos 22392.
            </h5>
            <h3 className="text-purple text-h3 font-medium mb-6">Kontak</h3>
            <h3 className="text-black text-h3 font-medium">0626 - 01020304</h3>
            <p className="text-body text-purple mb-5">Hubungan Masyarakat (Humas)</p>
            <h3 className="text-black text-h3 font-medium">0626 - 20025004</h3>
            <p className="text-body text-purple">
              Kantor Sekretariatan Desa Tanjung Bunga, Kec. Pangururan, Kab. Samosir.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center border border-purple py-8 rounded-2xl mb-20 w-3/4 mx-auto">
          <div style={{ borderRadius: 56 }} className="bg-blue p-9 mr-16">
            <IconWhatsapp />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-purple text-h3 font-medium mb-3">Whatsapp</h3>
            <Button className="mb-5">0626 - 01020304</Button>
            <p className="text-body text-purple">Hubungan Masyarakat (Humas)</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactPage;
