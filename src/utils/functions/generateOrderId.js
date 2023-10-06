const generateOrderId = () => {
    const randomNum = Math.floor(Math.random() * 100000000);
    const randomString = String(randomNum).padStart(8, '0');
    return randomString
    // todo : check this order id exist or not
}

export default generateOrderId