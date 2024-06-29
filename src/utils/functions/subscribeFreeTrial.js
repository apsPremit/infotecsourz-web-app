const { baseUrl } = require('./baseUrl');

const subscribeFreeTrial = async (orderData) => {
  try {
    const res = await fetch(`${baseUrl}/subscription/free-trial`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export default subscribeFreeTrial;
