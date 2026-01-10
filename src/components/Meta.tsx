import { FC, ReactComponentElement } from 'react';

import Head from 'next/head';

export default function Meta(): ReactComponentElement<FC, null> {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
    </Head>
  );
}
