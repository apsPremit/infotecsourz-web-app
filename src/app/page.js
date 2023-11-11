
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { nextOption } from './api/auth/[...nextauth]/route';


const Home = async () => {
  // const session = await getServerSession(nextOption)
  // if (!session) {
  //   redirect('/login')
  // }
  // redirect('/dashboard')


  return (
    <div>
      <iframe className='h-screen w-screen' src="https://www.infotecsourz.com/" title="description"></iframe>
    </div>
  );
};

export default Home
