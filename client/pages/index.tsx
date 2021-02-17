import Head from 'next/head';
import { BreadCrumbItem, Button, TextField } from '../components';
import Breadcrumb from '../components/mollecules/breadcrumb';

export default function Home() {
  return (
    <>
      <Head>
        <title>Desa Tanjung Bunga</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button variant="outlined">Halo</Button>
      <TextField />
      <Breadcrumb>
        <BreadCrumbItem>Halo</BreadCrumbItem>
        <BreadCrumbItem isActive>Halo</BreadCrumbItem>
      </Breadcrumb>
    </>
  );
}
