import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Invoice from '@/components/dashboard/invoice/Invoice/Invoice';
import config from '@/config';
import axios from 'axios';
import { getServerSession } from 'next-auth';
export const metadata = {
  title: 'Invoice | Infotecsourz',
  description: 'Photo Retouching App',
};

const fetchInvoice = async (orderId, accessToken) => {
  try {
    const response = await axios.get(
      `${config.api_base_url}/invoices/${orderId}`
    );
    const result = response.data.data;
    console.log({ result });
    return result;
  } catch (error) {}
};

const page = async ({ params }) => {
  const orderId = params.id;
  const session = await getServerSession(authOptions);
  const invoice = await fetchInvoice(orderId, session?.user?.accessToken);

  return (
    <>
      <Invoice invoice={invoice} />
    </>
  );
};

export default page;
