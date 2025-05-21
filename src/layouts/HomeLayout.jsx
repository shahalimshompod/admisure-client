import React from 'react';
import Banner from '../Sections/Banner';
import HomeClgCardContainer from '../Sections/HomeClgCardContainer';

const HomeLayout = () => {
    return (
        <div>
            <Banner/>
            <div className='container mx-auto '>
                    <HomeClgCardContainer/>
            </div>
        </div>
    );
};

export default HomeLayout;