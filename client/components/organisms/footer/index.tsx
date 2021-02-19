import { IconFacebook, IconInstagram, IconTanjungBunga } from '../../../assets';
import { Button } from '../../atoms';

const Footer = () => {
  return (
    <footer className="bg-blue-light pt-20 pb-14">
      <div className="container px-10 mx-auto grid grid-cols-2">
        <div>
          <IconTanjungBunga className="mb-9" width={280} height={95.6} viewBox="0 0 174 64" />
          <h4 className="font-medium text-h4 text-purple-light mb-1">Alamat</h4>
          <p className="text-body text-purple-light">
            Desa Tanjung Bunga, Kecamatan Pangururan, <br />
            Kabupaten Samosir, Provinsi Sumatra Utara, <br />
            Indonesia, Kode Pos 22392.
          </p>
        </div>
        <div>
          <h3 className="text-h3 text-purple-light font-medium mb-1.5">Hubungi Kami</h3>
          <h3 className="text-h3 text-purple-light font-medium mb-2.5">0626 - 01020304</h3>
          <Button variant="outlined" color="red">
            Lihat Lengkap
          </Button>
          <p className="text-body-sm text-purple-light mt-6 mb-2">Follow us:</p>
          <div className="flex items-center">
            <a
              href="http://facebook.com"
              className="mr-3 w-8 h-8 flex items-center justify-center rounded-lg border-2 border-red"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconFacebook />
            </a>
            <a
              href="http://instagram.com"
              className="w-8 h-8 flex items-center justify-center rounded-lg border-2 border-red"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
