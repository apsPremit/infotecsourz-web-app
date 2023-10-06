
import Invoice from '@/components/dashboard/invoice/Invoice/Invoice';


const page = () => {

    const invoiceDetails = {
        orderId: '123456789',
        date: '01/01/2022',
        quantity: 1,
        billFrom: {
            companyName: 'infotecsourz',
            address: 'Dhaka, Bangladesh',
            phone: '0195000000',
            email: 'info@gmail.com',
            companyWebsite: 'www.infotecsourz.com',
        },
        billTo: {
            name: 'Sara Williams',
            address: 'Dhaka, Bangladesh',
        },
        paymentStatus: 'paid',
        item: {

            title: 'photo editing',
            price: 200,
            total: 200

        },
        subTotal: 120,
        taxRate: 5,
        grandTotal: 200,


    }


    return (
        <>
            <Invoice
                invoiceDetails={invoiceDetails}
            />

        </>


    );
};

export default page;