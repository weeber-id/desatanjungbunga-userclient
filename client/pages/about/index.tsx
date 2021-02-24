import Image from 'next/image';
import { DummyOrang } from '../../assets';
import { Footer, Header } from '../../components';

const AboutPage = () => {
  return (
    <>
      <Header />
      <h3 className="text-center text-h3 text-black mt-48 font-medium mb-11">
        Profil Desa Tanjung Bunga
      </h3>
      <section className="container mx-auto px-10 mb-10 border-b-2 border-purple pb-20">
        <h4 className="text-h4 text-purple font-medium mb-16 text-center">Sejarah</h4>
        <div className="max-w-xl">
          <img
            className="float-left mr-4"
            src="/assets/images/home-2.png"
            alt="Desa Tanjung Bunga"
          />
        </div>
        <p className="text-body text-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia odio at sagittis
          iaculis. Nullam tortor nibh, vestibulum at aliquam in, volutpat ac erat. Sed dapibus eros
          at nisi pretium, non gravida odio porta. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Phasellus sit amet eros ipsum. Morbi malesuada auctor velit quis
          vulputate. Mauris vel eros tincidunt, tincidunt libero vitae, consequat nulla. Etiam
          porttitor auctor diam, porta congue mi rutrum tristique. Sed nec nisl sed sem dignissim
          varius. Nunc venenatis, purus vel volutpat laoreet, enim libero pharetra turpis, id
          eleifend metus quam vel libero. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Enim libero pharetra turpis. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Mauris lacinia odio at sagittis iaculis. Nullam tortor
          nibh, vestibulum at aliquam in, volutpat ac erat. Sed dapibus eros at nisi pretium, non
          gravida odio porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit
          amet eros ipsum. Morbi malesuada auctor velit quis vulputate. Mauris vel eros tincidunt,
          tincidunt libero vitae, consequat nulla. Etiam porttitor auctor diam, porta congue mi
          rutrum tristique. Sed nec nisl sed sem dignissim varius. Nunc venenatis, purus vel
          volutpat laoreet, enim libero pharetra turpis, id eleifend metus quam vel libero. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia odio at sagittis
          iaculis. Nullam tortor nibh, vestibulum at aliquam in, volutpat ac erat. Sed dapibus eros
          at nisi pretium, non gravida odio porta. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Phasellus sit amet eros ipsum. Morbi malesuada auctor velit quis
          vulputate. Mauris vel eros tincidunt, tincidunt libero vitae, consequat nulla. Etiam
          porttitor auctor diam, porta congue mi rutrum tristique. Sed nec nisl sed sem dignissim
          varius. Nunc venenatis, purus vel volutpat laoreet, enim libero pharetra turpis, id
          eleifend metus quam vel libero. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.
        </p>
      </section>
      <section className="container mx-auto px-10 pb-20 mb-10 border-b-2 border-purple">
        <h4 className="text-h4 text-purple font-medium mb-10 text-center">Sambutan</h4>
        <div className="grid grid-cols-5 w-3/4 mx-auto gap-6">
          <div className="col-span-2">
            <Image layout="responsive" src={DummyOrang} height={1200} width={900} />
          </div>
          <div className="col-span-3">
            <h5 className="text-h5 font-medium text-black mb-2">Dr. Suparman</h5>
            <h6 className="text-body text-purple mb-6">Ketua Desa Tanjung Bunga</h6>
            <p className="text-black text-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia odio at
              sagittis iaculis. Nullam tortor nibh, vestibulum at aliquam in, volutpat ac erat. Sed
              dapibus eros at nisi pretium, non gravida odio porta. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Phasellus sit amet eros ipsum. Morbi malesuada auctor
              velit quis vulputate. Mauris vel eros tincidunt, tincidunt libero vitae, consequat
              nulla. Etiam porttitor auctor diam, porta congue mi rutrum tristique. Sed nec nisl sed
              sem dignissim varius. Nunc venenatis, purus vel volutpat laoreet, enim libero pharetra
              turpis, id eleifend metus quam vel libero. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos.
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-10 pb-20 mb-10 border-b-2 border-purple">
        <h4 className="text-h4 text-purple font-medium mb-10 text-center">Dosen Peneliti</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="border border-purple rounded-lg py-6 px-3 cursor-pointer hover:border-2">
            <div className="grid grid-cols-5 gap-6">
              <div className="col-span-2">
                <Image layout="responsive" src={DummyOrang} height={1200} width={900} />
              </div>
              <div className="col-span-3">
                <h5 className="text-body font-medium text-black">Dr. Suparman</h5>
                <h6 className="text-body-sm text-purple mb-6">Ketua Desa Tanjung Bunga</h6>
                <p className="text-black text-body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia odio at
                  sagittis iaculis. Nullam tortor nibh, vestibulum at aliquam in, volutpat ac erat.
                  Sed dapibus eros at nisi pretium, non gravida odio porta. Nullam tortor nibh,
                  vestibulum at aliquam in, volutpat ac erat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-10 pb-20 mb-10">
        <h4 className="text-h4 text-purple font-medium mb-10 text-center">Tujuan Website</h4>
        <div className="grid grid-cols-3 justify-items-center gap-6">
          <div className="border border-purple rounded-lg py-28 px-4 cursor-pointer hover:border-2">
            <p className="text-h4 text-purple font-medium text-center">
              Meningkatkan Minat Wisatawan ke Desa Tanjung Desa
            </p>
          </div>
          <div className="border border-purple rounded-lg py-28 px-4 cursor-pointer hover:border-2">
            <p className="text-h4 text-purple font-medium text-center">
              Memberikan Informasi yang Mumpuni kepada Publik
            </p>
          </div>
          <div className="border border-purple rounded-lg py-28 px-4 cursor-pointer hover:border-2">
            <p className="text-h4 text-purple font-medium text-center">
              Mensejahterakan Warga Desa Tanjung Bunga dalam Menunjang Bisnis Wisatanya
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutPage;
