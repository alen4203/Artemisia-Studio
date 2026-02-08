import { ReactNode } from 'react';

import Meta from './Meta';
import Navbar from './organism/Navbar/Navbar';
import Footer from './organism/Footer/Footer';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Meta />
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}
