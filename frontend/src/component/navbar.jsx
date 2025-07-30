import React, { useState, useEffect } from 'react';
import { Bell, Menu, X } from 'lucide-react';

export default function CareerLaunchNavbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for token on mount
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    // User data (can be fetched from backend too)
    const [user] = useState({
        name: 'Pranav Pawar',
        email: 'pranavpawar@gmail.com',
        careerTrack: 'Web Development',
        resumeCompletion: 75,
        githubUsername: 'pranavpawar',
        currentLevel: 'Intermediate',
        totalPoints: 1250
    });

    const [notifications] = useState([
        { id: 1, message: 'New hackathon: Google Summer of Code applications open!', time: '2 hours ago', type: 'hackathon' },
        { id: 2, message: 'Your resume has been viewed by 3 recruiters', time: '5 hours ago', type: 'resume' },
        { id: 3, message: 'New mentor available: Senior SDE at Microsoft', time: '1 day ago', type: 'mentor' }
    ]);

    if (!isAuthenticated) return null; // 🚫 Don't render navbar

    return (
        <div className="bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200 px-0 sm:px-2 lg:px-4 py-3 sm:py-4 lg:py-5 sticky top-0 z-50 w-full">
                <div className="flex items-center justify-between px-2 sm:px-4 lg:px-6">
                    <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="xl:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">CareerLaunch</h1>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Bell size={20} className="lg:w-6 lg:h-6" />
                            <span className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                {notifications.length}
                            </span>
                        </button>

                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm lg:text-base font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs lg:text-sm text-gray-500">{user.currentLevel}</p>
                            </div>
                            <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base">
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
