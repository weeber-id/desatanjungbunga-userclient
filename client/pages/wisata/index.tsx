import { DummyWisata } from '../../assets';
import { Button, CardImage, Footer, Header, Pagination, TextField } from '../../components';

const WisataPage = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto px-10">
        <h2 className="text-center font-medium lg:text-h2 text-h4 mt-48 mb-7">Wisata</h2>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div className="flex items-center">
          <Button customHeight className="lg:mr-11 mr-3 h-8">
            Filter
          </Button>
          <TextField variant="search-right" className="w-full lg:w-auto" inputClassName="w-full" />
        </div>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
          className="grid gap-x-12 gap-y-10"
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
            src={DummyWisata}
            width={1200}
            height={900}
            layout="responsive"
            text="Visit Tanjung Bunga"
            hover
          />
          <CardImage
            src={DummyWisata}
            width={1200}
            height={900}
            layout="responsive"
            text="Visit Tanjung Bunga"
            hover
          />
          <CardImage
            src={DummyWisata}
            width={1200}
            height={900}
            layout="responsive"
            text="Visit Tanjung Bunga"
            hover
          />
        </div>
      </section>
      <section className="container mx-auto mb-16 px-10">
        <div className="flex justify-center">
          <Pagination />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WisataPage;
