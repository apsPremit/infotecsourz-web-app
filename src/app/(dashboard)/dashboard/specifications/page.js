import SpecificationsLeftSide from "@/components/dashboard/specifications/SpecificationsLeftSide/SpecificationsLeftSide";
import SpecificationsRightSide from "@/components/dashboard/specifications/SpecificationsRightSide/SpecificationsRightSide";



const Specifications = () => {





    return (
        <div className='lg:px-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 bg-white p-5 rounded gap-7'>
                {/* left side  */}
                <SpecificationsLeftSide />

                {/* right side  */}
                <SpecificationsRightSide />

            </div>
        </div>
    );
};

export default Specifications;