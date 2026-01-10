import type { FC } from 'react';
import Image from 'next/image';

import ProductImage from '@/images/productImage.svg';

const BrandIntro: FC = () => {
  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-6">關於我們</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis
        egestas tellus, vel fermentum sem. Nam at ultricies tellus. Sed sed
        imperdiet ipsum. Integer commodo dolor et placerat dignissim. In a justo
        vitae elit vestibulum iaculis varius in mauris. Proin placerat quis
        tellus et vestibulum. Aliquam congue dignissim laoreet. Vestibulum
        eleifend non elit vitae semper. Quisque maximus nulla vitae enim
        vestibulum, in tempor justo consectetur. Donec cursus, tortor id
        bibendum accumsan, mauris libero sollicitudin orci, vel tincidunt arcu
        enim et orci. Nullam pulvinar pellentesque mauris, a elementum est
        tristique eget. Nulla fermentum sollicitudin massa ac varius.
      </p>

      <p>
        Integer fringilla ipsum erat, placerat laoreet eros tincidunt vel. Etiam
        tincidunt velit ut sem feugiat pulvinar. Pellentesque risus quam,
        pretium sit amet ex vel, dignissim dictum justo. Aenean augue odio,
        volutpat pulvinar neque eget, pulvinar pellentesque magna. Curabitur
        ultrices ipsum nulla. Nam varius, nisi et posuere elementum, quam sapien
        sodales ipsum, eget suscipit ipsum felis vel mi. Sed vel leo egestas,
        placerat magna sit amet, aliquam magna. Nulla facilisi. Suspendisse
        tristique, nisi pulvinar efficitur tristique, mi sem tristique lacus, et
        viverra nisl mi eu justo. Aenean mollis elit diam, non hendrerit dolor
        maximus vitae. Cras orci libero, mattis laoreet sapien sit amet, luctus
        volutpat est. Maecenas blandit non odio a dignissim. Mauris vitae congue
        sapien, nec laoreet magna. Fusce urna lorem, ullamcorper at placerat sit
        amet, posuere at nisl.
      </p>
    </div>
  );
};

export default BrandIntro;
