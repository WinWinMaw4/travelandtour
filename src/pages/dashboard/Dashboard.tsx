import BlogList from '@pages/BlogLists';
import type { RootState } from '@store/index';
import { setActiveTab } from '@store/slices/tabSlice';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BannerPage from './BannerPage';

const tabs = ['Blogs', 'Packages', 'Banners', 'Profile'];

const Dashboard = () => {
    const dispatch = useDispatch();
    const activeTab = useSelector((state: RootState) => state.tab['dashboard'] || 'Blogs');

    const handleTabClick = (tab: string) => {
        dispatch(setActiveTab({ key: 'dashboard', tab }));
    };

    return (
        <div className="p-4">
            {/* Tab Bar */}
            <div className="flex space-x-4 border-b border-gray-200 mb-4 justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 font-medium ${activeTab === tab ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-gray-600'
                            }`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4">
                {activeTab === 'Blogs' && <BlogList />}
                {activeTab === 'Packages' && <div>Packages Content</div>}
                {activeTab === 'Banners' && <div><BannerPage /></div>}
                {activeTab === 'Profile' && <div>Profile Content</div>}
            </div>
        </div>
    );
};

export default Dashboard;
