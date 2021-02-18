import Head from 'next/head';
import Image from 'next/image';
import { DummyWisata } from '../assets';
import { Button, CardImage, Header } from '../components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Desa Tanjung Bunga</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="container mx-auto mt-36">
        <div className="grid grid-cols-2 items-center px-10 py-8">
          <div>
            <h1 className="text-purple-light text-h4 font-medium">Selamat Datang</h1>
            <h2 className="text-purple-light text-h2 font-medium">di Desa Tanjung Bunga</h2>
            <div className="flex items-center mt-8">
              <Button bold className="mr-6 h-12 w-36">
                Jelajahi
              </Button>
              <Button bold className="h-12 w-36" variant="outlined" color="red">
                Artikel
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              alt="Visit Desa Tanjung Bunga"
              src="/assets/images/hero-1.png"
              layout="responsive"
              width={510}
              height={327}
              quality={100}
            />
          </div>
        </div>
      </section>
      <section className="bg-blue-light py-16">
        <div className="container px-10 mx-auto items-center grid grid-cols-2 gap-16">
          <CardImage
            src="/assets/images/home-2.png"
            width={571}
            height={320}
            layout="responsive"
            text="Visit Tanjung Bunga"
            textColor="red"
            italic
            alt="Visit Desa Tanjung Bunga"
            textPosition="end"
          />
          <div className="text-black">
            <h3 className="text-h3 font-medium mb-8">Wisata di Desa Tanjung Bunga</h3>
            <p className="text-body text-justify">
              Terdapat banyak potensi wisata yang belum terkuak oleh khalayak umum dari Desa Tanjung
              Bunga, Kabupaten Samosir. Menikmati indahnya tepian danau, berpetualang di kawasan
              pegunungan, merasakan salah satu kultur asli dari Sumatera Utara, hingga merasakan
              kuliner khas, dan membawa cinderamata sebagai buah tangan dapat dilakukan di sini.
              Sehingga, mengunjungi Desa Tanjung Bunga akan menjadi suatu agenda wisata yang tidak
              pernah dirasakan sebelumnya!
            </p>
          </div>
        </div>
      </section>
      <section className="container px-10 mx-auto py-20">
        <div className="flex items-center mb-5">
          <h2 className="text-h2 text-black font-medium mr-14">Wisata</h2>
          <Button variant="outlined" color="red">
            Lihat lebih lengkap
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-16 mb-10">
          <Image layout="responsive" width={1200} height={900} src={DummyWisata} />
          <div className="text-black">
            <h4 className="text-h4 font-medium mb-10">Pendakian Pusuk Buhit</h4>
            <p className="text-body text-justify mb-5">
              Phasellus varius volutpat tellus ac sollicitudin. Suspendisse tempor ligula vitae dui
              tempor egestas. Nulla pharetra felis a pretium vulputate. Nunc gravida lectus sapien,
              quis eleifend sem volutpat ut. In hac habitasse platea dictumst. Etiam sed pretium
              urna, sit amet faucibus tortor.
            </p>
            <Button>Lihat Detail</Button>
          </div>
        </div>
        <div
          style={{ gridTemplateColumns: 'repeat(4, minmax(258px, 1fr))' }}
          className="grid gap-4 overflow-auto"
        >
          <CardImage
            src={DummyWisata}
            width={1200}
            height={900}
            layout="responsive"
            text="Visit Tanjung Bunga"
            hover
          />
          <CardImage
            src="/assets/images/home-2.png"
            width={1200}
            height={900}
            layout="responsive"
            text="Visit Tanjung Bunga"
            hover
          />
          <CardImage
            src="/assets/images/home-2.png"
            width={1200}
            height={900}
            layout="responsive"
            text="Visit Tanjung Bunga"
            hover
          />
          <CardImage
            src="/assets/images/home-2.png"
            width={1200}
            height={900}
            layout="responsive"
            text="Visit Tanjung Bunga"
            hover
          />
        </div>
      </section>
    </>
  );
}
