import CheckUserData from '@/components/newOrder/CheckUrerData/CheckUserData';
import NewOrderTab from '@/components/newOrder/NewOrderTab/NewOrderTab';
import Slider from '@/components/newOrder/Slider/Slider';
import Head from 'next/head';
import { redirect } from 'next/navigation';
export const metadata = {
  title: 'Create New Order | Infotecsourz',
  description: 'Photo Retouching App',
};

const PreloadImages = () => {
  return (
    <Head>
      {/* Preload images in the <head> section */}
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/model/Beauty%20Makeup%20Retouching.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/model/Body%20shaping.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/model/Clipping%20path.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/model/Cloth%20&%20Shoe%20fixing.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/model/Color%20correction.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/model/Eye%20Retoching.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/model/Hair%20fixing.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/model/Masking.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/model/Noise%20remove.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/model/Original%20Photo%20Model.jpg'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/model/Pimples,%20blemishes%20remove%20from%20face%20and%20skin.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/model/Wrinkles%20remove.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/product/clipping%20path.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/product/Color%20chnaging.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/product/Color%20correction.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/product/Masking.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/product/Multiple%20clipping%20path.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/product/Natural%20shadow.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/product/Original%20photo%20Product%20(1)%20(1).jpg'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/product/Original%20photo%20Product.jpg'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/product/Product%20retouching.png'
        as='image'
      />
      <link
        rel='preload'
        href='https://d34n7qm7kfn7vw.cloudfront.net/product/Reflection%20shadow.png'
        as='image'
      />
      {/* Add more <link> elements for each image you want to preload */}
    </Head>
  );
};
const NewOrder = () => {
  return (
    <div className='bg-white lg:p-5 min-h-[calc(100vh-36px)]'>
      {/* <CheckUserData /> */}
      <NewOrderTab />
      <Slider />
      <PreloadImages />
      {/* <TypeSelection /> */}
    </div>
  );
};

export default NewOrder;
