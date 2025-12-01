import BlogList from '@pages/BlogLists';
import type { RootState } from '@store/index';
import { setActiveTab } from '@store/slices/tabSlice';
import { useSelector, useDispatch } from 'react-redux';
import BannerPage from './BannerPage';
import Profile from './ProfilePage';
import PackagesPage from './PackagesPage';
import ContactPage from './contact/ContactPage';
import BookingPage from './booking/BookingPage';
import { useEffect } from 'react';

const tabs = ['Blogs', 'Packages', 'Banners', 'Booking', 'Profile', 'Contact'];

const Dashboard = () => {
    const dispatch = useDispatch();
    const activeTab = useSelector((state: RootState) => state.tab['dashboard'] || 'Blogs');

    const handleTabClick = (tab: string) => {
        dispatch(setActiveTab({ key: 'dashboard', tab }));
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [])

    return (
        <div className="p-4 max-w-screen overflow-hidden">
            {/* Tab Bar */}
            <div className="flex space-x-4 border-b border-gray-200 mb-4 justify-center max-w-screen  overflow-x-scroll">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 font-medium ${activeTab === tab ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-600'
                            }`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4 max-w-screen">
                {activeTab === 'Blogs' && <BlogList />}
                {activeTab === 'Packages' && <div><PackagesPage /></div>}
                {activeTab === 'Banners' && <div><BannerPage /></div>}
                {activeTab === 'Booking' && <div><BookingPage /></div>}
                {activeTab === 'Profile' && <div><Profile /></div>}
                {activeTab === 'Contact' && <div><ContactPage /></div>}

            </div>
        </div>
    );
};

export default Dashboard;
