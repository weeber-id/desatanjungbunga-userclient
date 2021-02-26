import { DummyWisata } from '../../assets';
import { CardImage, Filter, Footer, Header, Pagination, TextField } from '../../components';

const ArtikelPage = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto px-10">
        <h2 className="text-center font-medium text-h4 lg:text-h2 mt-48 mb-7">Artikel</h2>
      </section>
      <section className="container mx-auto mb-16 px-6 lg:px-10">
        <div className="flex items-center">
          <Filter className="lg:mr-11 mr-3 ">Filter</Filter>
          <TextField inputClassName="w-full" className="w-full lg:w-auto" variant="search-right" />
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

export default ArtikelPage;
