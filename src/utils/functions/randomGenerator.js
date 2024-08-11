import crypto from 'crypto';

const randomGenerator = () => {
  const result = crypto.randomBytes(5).toString('hex');
  return result;
};

export default randomGenerator;
