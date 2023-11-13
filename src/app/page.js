
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { nextOption } from './api/auth/[...nextauth]/route';
export const metadata = {
  title: "Home | Infotecsourz",
  description: "Photo Retouching App"
}

const Home = async () => {
  const session = await getServerSession(nextOption)
  if (!session) {
    redirect('/login')
  }
  redirect('/dashboard')


  return (
    <div>

    </div>
  );
};

export default Home
