
import CheckUserData from "@/components/newOrder/CheckUrerData/CheckUserData";
import NewOrderTab from "@/components/newOrder/NewOrderTab/NewOrderTab";
import Slider from "@/components/newOrder/Slider/Slider";
import { redirect } from "next/navigation";


const NewOrder = () => {


    return (
        <div className="bg-white lg:p-5">
            {/* <CheckUserData /> */}
            <NewOrderTab />
            <Slider />


            {/* <TypeSelection /> */}
        </div>
    );
};

export default NewOrder;