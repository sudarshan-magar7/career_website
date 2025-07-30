// import React, { useState } from 'react';
// import { 
//   User, 
//   BookOpen, 
//   Code, 
//   FileText, 
//   Briefcase, 
//   Users, 
//   Trophy, 
//   Calendar,
//   Github,
//   Target,
//   TrendingUp,
//   Clock,
//   Star,
//   ChevronRight,
//   Bell,
//   Search,
//   Filter,
//   Play,
//   CheckCircle,
//   Award,
//   MessageSquare,
//   ExternalLink,
//   Menu,
//   X
// } from 'lucide-react';

// export default function CareerDashboard() {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [user] = useState({
//     name: 'Pranav Pawar',
//     email: 'pranavpawar@gmail.com',
//     careerTrack: 'Web Development',
//     resumeCompletion: 75,
//     githubUsername: 'pranavpawar',
//     currentLevel: 'Intermediate',
//     totalPoints: 1250
//   });

//   const [notifications] = useState([
//     { id: 1, message: 'New hackathon: Google Summer of Code applications open!', time: '2 hours ago', type: 'hackathon' },
//     { id: 2, message: 'Your resume has been viewed by 3 recruiters', time: '5 hours ago', type: 'resume' },
//     { id: 3, message: 'New mentor available: Senior SDE at Microsoft', time: '1 day ago', type: 'mentor' }
//   ]);

//   const [careerProgress] = useState({
//     webDev: { completed: 7, total: 10, progress: 70 },
//     dsa: { completed: 45, total: 100, progress: 45 },
//     projects: { completed: 3, total: 5, progress: 60 }
//   });

//   const [recentActivities] = useState([
//     { id: 1, action: 'Completed React Hooks challenge', time: '2 hours ago', points: 50 },
//     { id: 2, action: 'Updated portfolio project', time: '1 day ago', points: 30 },
//     { id: 3, action: 'Attended mock interview session', time: '2 days ago', points: 100 }
//   ]);

//   const [upcomingEvents] = useState([
//     { id: 1, title: 'Google I/O Extended', date: '2024-05-15', type: 'conference' },
//     { id: 2, title: 'React Workshop by Meta', date: '2024-05-20', type: 'workshop' },
//     { id: 3, title: 'AI/ML Bootcamp', date: '2024-05-25', type: 'bootcamp' }
//   ]);

//   const [suggestedJobs] = useState([
//     { id: 1, title: 'Frontend Developer Intern', company: 'Google', location: 'Remote', match: 95 },
//     { id: 2, title: 'Full Stack Developer', company: 'Microsoft', location: 'Bangalore', match: 88 },
//     { id: 3, title: 'React Developer', company: 'Flipkart', location: 'Hyderabad', match: 82 }
//   ]);

//   const sidebarItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: User },
//     { id: 'career-path', label: 'Career Path', icon: Target },
//     { id: 'projects', label: 'Projects', icon: Code },
//     { id: 'resume', label: 'Resume Builder', icon: FileText },
//     { id: 'jobs', label: 'Job Board', icon: Briefcase },
//     { id: 'practice', label: 'Practice Arena', icon: Trophy },
//     { id: 'mentorship', label: 'Mentorship', icon: Users },
//     { id: 'blog', label: 'Tech Blog', icon: BookOpen }
//   ];

//   const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
//     <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//       <div className="flex items-center justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">{title}</p>
//           <p className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold ${color} mt-1`}>{value}</p>
//           {subtitle && <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">{subtitle}</p>}
//         </div>
//         <div className={`p-2 sm:p-3 lg:p-4 rounded-lg flex-shrink-0 ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
//           <Icon size={16} className={`${color} sm:w-5 sm:h-5 lg:w-6 lg:h-6`} />
//         </div>
//       </div>
//       {trend && (
//         <div className="mt-2 sm:mt-3 lg:mt-4 flex items-center">
//           <TrendingUp size={12} className="text-green-500 sm:w-4 sm:h-4" />
//           <span className="text-green-500 text-xs sm:text-sm ml-1">{trend}</span>
//         </div>
//       )}
//     </div>
//   );

//   const ProgressCard = ({ title, progress, completed, total, color }) => (
//     <div className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
//       <div className="flex justify-between items-center mb-3 lg:mb-4">
//         <h3 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg truncate pr-2">{title}</h3>
//         <span className="text-xs sm:text-sm lg:text-base text-gray-600 flex-shrink-0">{completed}/{total}</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3 mb-2 lg:mb-3">
//         <div 
//           className={`h-2 lg:h-3 rounded-full ${color} transition-all duration-500`} 
//           style={{ width: `${progress}%` }}
//         ></div>
//       </div>
//       <p className="text-xs sm:text-sm lg:text-base text-gray-600">{progress}% Complete</p>
//     </div>
//   );

//   const JobCard = ({ job }) => (
//     <div className="bg-white rounded-lg p-4 lg:p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
//       <div className="flex justify-between items-start mb-2 lg:mb-3 gap-2">
//         <h4 className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg flex-1 min-w-0">{job.title}</h4>
//         <span className="text-xs lg:text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full flex-shrink-0">
//           {job.match}% match
//         </span>
//       </div>
//       <p className="text-gray-600 text-xs sm:text-sm lg:text-base truncate">{job.company} • {job.location}</p>
//       <button className="mt-3 lg:mt-4 text-blue-600 text-xs sm:text-sm lg:text-base font-medium hover:text-blue-800 flex items-center transition-colors">
//         View Details <ChevronRight size={14} className="ml-1 lg:w-5 lg:h-5" />
//       </button>
//     </div>
//   );

//   const handleSidebarItemClick = (itemId) => {
//     setActiveTab(itemId);
//     setSidebarOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 m-0 p-0">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200 px-0 sm:px-2 lg:px-4 py-3 sm:py-4 lg:py-5 sticky top-0 z-50 w-full">
//         <div className="flex items-center justify-between px-2 sm:px-4 lg:px-6">
//           <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
//             {/* Mobile menu button */}
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="xl:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
//             >
//               {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
            
//             <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">CareerLaunch</h1>
            
//             {/* Search - Responsive sizing */}
//             <div className="hidden md:block relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search jobs, mentors, projects..."
//                 className="pl-10 pr-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 lg:w-64 xl:w-96 text-sm lg:text-base"
//               />
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
//             {/* Mobile search button */}
//             <button className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors">
//               <Search size={20} />
//             </button>
            
//             <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
//               <Bell size={20} className="lg:w-6 lg:h-6" />
//               <span className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                 3
//               </span>
//             </button>
            
//             <div className="flex items-center space-x-2 sm:space-x-3">
//               <div className="hidden sm:block text-right">
//                 <p className="text-sm lg:text-base font-medium text-gray-900">{user.name}</p>
//                 <p className="text-xs lg:text-sm text-gray-500">{user.currentLevel}</p>
//               </div>
//               <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base">
//                 {user.name.split(' ').map(n => n[0]).join('')}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex relative w-full">
//         {/* Sidebar */}
//         <aside className={`
//           w-64 lg:w-72 xl:w-80 bg-white shadow-lg h-screen sticky top-16 lg:top-20 z-40 transition-transform duration-300 ease-in-out
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//           xl:translate-x-0 xl:static xl:z-auto
//           fixed xl:sticky
//         `}>
//           <nav className="p-4 sm:p-6 lg:p-8">
//             {sidebarItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => handleSidebarItemClick(item.id)}
//                   className={`w-full flex items-center space-x-3 lg:space-x-4 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 rounded-lg mb-2 lg:mb-3 transition-all duration-200 text-sm sm:text-base lg:text-lg ${
//                     activeTab === item.id
//                       ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 shadow-sm'
//                       : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
//                   }`}
//                 >
//                   <Icon size={18} className="flex-shrink-0 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
//                   <span className="font-medium truncate">{item.label}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </aside>

//         {/* Mobile sidebar overlay */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden transition-opacity duration-300"
//             onClick={() => setSidebarOpen(false)}
//           ></div>
//         )}

//         {/* Main Content */}
//         <main className="flex-1 p-2 sm:p-4 lg:p-6 xl:p-8 min-w-0">
//           {activeTab === 'dashboard' && (
//             <div className="space-y-4 sm:space-y-6 lg:space-y-8 xl:space-y-10">
//               {/* Welcome Section */}
//               <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6 sm:p-8 lg:p-10 xl:p-12 text-white">
//                 <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 lg:mb-4">Welcome back, {user.name}! 👋</h2>
//                 <p className="text-blue-100 mb-4 lg:mb-6 text-sm sm:text-base lg:text-lg">Ready to advance your {user.careerTrack} journey?</p>
//                 <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
//                   <button className="bg-white text-blue-600 px-4 sm:px-6 lg:px-8 py-2 lg:py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm sm:text-base lg:text-lg">
//                     Continue Learning
//                   </button>
//                   <button className="border border-white text-white px-4 sm:px-6 lg:px-8 py-2 lg:py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm sm:text-base lg:text-lg">
//                     Find Jobs
//                   </button>
//                 </div>
//               </div>

//               {/* Stats Cards */}
//               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
//                 <StatCard
//                   title="Resume Score"
//                   value={`${user.resumeCompletion}%`}
//                   subtitle="ATS Optimized"
//                   icon={FileText}
//                   color="text-green-600"
//                   trend="+12% this week"
//                 />
//                 <StatCard
//                   title="Coding Points"
//                   value={user.totalPoints}
//                   subtitle="Global Rank: #127"
//                   icon={Trophy}
//                   color="text-yellow-600"
//                   trend="+85 today"
//                 />
//                 <StatCard
//                   title="Projects"
//                   value="3/5"
//                   subtitle="Portfolio Complete"
//                   icon={Code}
//                   color="text-purple-600"
//                 />
//                 <StatCard
//                   title="Interviews"
//                   value="2"
//                   subtitle="This month"
//                   icon={Users}
//                   color="text-blue-600"
//                 />
//               </div>

//               {/* Progress Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                 <ProgressCard
//                   title="Web Development Track"
//                   progress={careerProgress.webDev.progress}
//                   completed={careerProgress.webDev.completed}
//                   total={careerProgress.webDev.total}
//                   color="bg-blue-500"
//                 />
//                 <ProgressCard
//                   title="DSA Practice"
//                   progress={careerProgress.dsa.progress}
//                   completed={careerProgress.dsa.completed}
//                   total={careerProgress.dsa.total}
//                   color="bg-green-500"
//                 />
//                 <ProgressCard
//                   title="Project Portfolio"
//                   progress={careerProgress.projects.progress}
//                   completed={careerProgress.projects.completed}
//                   total={careerProgress.projects.total}
//                   color="bg-purple-500"
//                 />
//               </div>

//               {/* Two Column Layout - Stack on mobile */}
//               <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
//                 {/* Recent Activities */}
//                 <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
//                   <div className="flex items-center justify-between mb-4 lg:mb-6">
//                     <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">Recent Activities</h3>
//                     <button className="text-blue-600 text-xs sm:text-sm lg:text-base font-medium hover:text-blue-800 transition-colors">View All</button>
//                   </div>
//                   <div className="space-y-3 sm:space-y-4 lg:space-y-5">
//                     {recentActivities.map((activity) => (
//                       <div key={activity.id} className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                         <div className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
//                           <CheckCircle size={12} className="text-green-600 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-800 truncate">{activity.action}</p>
//                           <p className="text-xs lg:text-sm text-gray-500">{activity.time}</p>
//                         </div>
//                         <div className="text-right flex-shrink-0">
//                           <span className="text-xs sm:text-sm lg:text-base font-semibold text-yellow-600">+{activity.points} XP</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Suggested Jobs */}
//                 <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
//                   <div className="flex items-center justify-between mb-4 lg:mb-6">
//                     <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">Recommended Jobs</h3>
//                     <button className="text-blue-600 text-xs sm:text-sm lg:text-base font-medium hover:text-blue-800 transition-colors">Browse All</button>
//                   </div>
//                   <div className="space-y-3 sm:space-y-4 lg:space-y-5">
//                     {suggestedJobs.map((job) => (
//                       <JobCard key={job.id} job={job} />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Upcoming Events */}
//               <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
//                 <div className="flex items-center justify-between mb-4 lg:mb-6">
//                   <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">Upcoming Events & Hackathons</h3>
//                   <button className="text-blue-600 text-xs sm:text-sm lg:text-base font-medium hover:text-blue-800 transition-colors">View Calendar</button>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
//                   {upcomingEvents.map((event) => (
//                     <div key={event.id} className="border border-gray-200 rounded-lg p-4 lg:p-5 hover:border-blue-300 hover:shadow-md transition-all duration-300">
//                       <div className="flex items-center space-x-2 mb-2 lg:mb-3">
//                         <Calendar size={12} className="text-blue-600 lg:w-4 lg:h-4" />
//                         <span className="text-xs sm:text-sm lg:text-base text-gray-600">{event.date}</span>
//                       </div>
//                       <h4 className="font-semibold text-gray-800 mb-1 lg:mb-2 text-sm sm:text-base lg:text-lg">{event.title}</h4>
//                       <span className={`text-xs lg:text-sm px-2 py-1 rounded-full ${
//                         event.type === 'conference' ? 'bg-blue-100 text-blue-800' :
//                         event.type === 'workshop' ? 'bg-green-100 text-green-800' :
//                         'bg-purple-100 text-purple-800'
//                       }`}>
//                         {event.type}
//                       </span>
//                       <button className="mt-3 lg:mt-4 w-full bg-blue-50 text-blue-600 py-2 lg:py-3 rounded-lg text-xs sm:text-sm lg:text-base font-medium hover:bg-blue-100 transition-colors">
//                         Register Now
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
//                 <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-4 lg:mb-6">Quick Actions</h3>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
//                   <button className="flex flex-col items-center p-3 sm:p-4 lg:p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1">
//                     <Code size={20} className="text-blue-600 mb-2 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
//                     <span className="text-xs sm:text-sm lg:text-base font-medium text-center">Daily Challenge</span>
//                   </button>
//                   <button className="flex flex-col items-center p-3 sm:p-4 lg:p-6 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-300 hover:-translate-y-1">
//                     <Users size={20} className="text-green-600 mb-2 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
//                     <span className="text-xs sm:text-sm lg:text-base font-medium text-center">Book Mentor</span>
//                   </button>
//                   <button className="flex flex-col items-center p-3 sm:p-4 lg:p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 hover:-translate-y-1">
//                     <FileText size={20} className="text-purple-600 mb-2 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
//                     <span className="text-xs sm:text-sm lg:text-base font-medium text-center">Update Resume</span>
//                   </button>
//                   <button className="flex flex-col items-center p-3 sm:p-4 lg:p-6 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-all duration-300 hover:-translate-y-1">
//                     <Trophy size={20} className="text-yellow-600 mb-2 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
//                     <span className="text-xs sm:text-sm lg:text-base font-medium text-center">Take Quiz</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Placeholder for other tabs */}
//           {activeTab !== 'dashboard' && (
//             <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-12 shadow-lg border border-gray-100 text-center">
//               <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 lg:mb-6">
//                 {sidebarItems.find(item => item.id === activeTab)?.label}
//               </h2>
//               <p className="text-gray-600 mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg">This section is under development</p>
//               <button className="bg-blue-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base lg:text-lg">
//                 Coming Soon
//               </button>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from 'react';
// import { 
//   Bell,
//   Search,
//   Menu,
//   X
// } from 'lucide-react';

// export default function CareerLaunchNavbar() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [user] = useState({
//     name: 'Pranav Pawar',
//     email: 'pranavpawar@gmail.com',
//     careerTrack: 'Web Development',
//     resumeCompletion: 75,
//     githubUsername: 'pranavpawar',
//     currentLevel: 'Intermediate',
//     totalPoints: 1250
//   });

//   const [notifications] = useState([
//     { id: 1, message: 'New hackathon: Google Summer of Code applications open!', time: '2 hours ago', type: 'hackathon' },
//     { id: 2, message: 'Your resume has been viewed by 3 recruiters', time: '5 hours ago', type: 'resume' },
//     { id: 3, message: 'New mentor available: Senior SDE at Microsoft', time: '1 day ago', type: 'mentor' }
//   ]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header/Navbar */}
//       <header className="bg-white shadow-sm border-b border-gray-200 px-0 sm:px-2 lg:px-4 py-3 sm:py-4 lg:py-5 sticky top-0 z-50 w-full">
//         <div className="flex items-center justify-between px-2 sm:px-4 lg:px-6">
//           <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
//             {/* Mobile menu button */}
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="xl:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
//             >
//               {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
            
//             <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">CareerLaunch</h1>
            
//             {/* Search - Responsive sizing */}
//             {/* <div className="hidden md:block relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search jobs, mentors, projects..."
//                 className="pl-10 pr-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 lg:w-64 xl:w-96 text-sm lg:text-base"
//               />
//             </div> */}
//           </div>
          
//           <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
//             {/* Mobile search button */}
//             {/* <button className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors">
//               <Search size={20} />
//             </button> */}
            
//             <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
//               <Bell size={20} className="lg:w-6 lg:h-6" />
//               <span className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                 {notifications.length}
//               </span>
//             </button>
            
//             <div className="flex items-center space-x-2 sm:space-x-3">
//               <div className="hidden sm:block text-right">
//                 <p className="text-sm lg:text-base font-medium text-gray-900">{user.name}</p>
//                 <p className="text-xs lg:text-sm text-gray-500">{user.currentLevel}</p>
//               </div>
//               <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base">
//                 {user.name.split(' ').map(n => n[0]).join('')}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Demo Content to show navbar in context */}
//     </div>
//   );
// }






import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Home, PlusCircle, DollarSign, List, Grid, LogOut } from 'lucide-react';
// import Alert from './Alert';
// import ExpenseContext from '../context/expenseContext';
import '../css/test.css'


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(ExpenseContext);
  const { showAlert } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate("/login");
    }
  }, [navigate]);

  // const logout = (e) => {
  //   e.preventDefault();
  //   const authToken = localStorage.getItem('authToken');
  //   if (authToken) {
  //     localStorage.removeItem('authToken');
  //     showAlert("You Logged out Successfully", 'danger');
  //     navigate('/login');
  //   } else {
  //     showAlert("No user is currently logged in", 'warning');
  //   }
  // };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <NavLink className="navbar-brand" to="/">
            CashFlow
          </NavLink>
          {localStorage.getItem('authToken') && (
            <div className="nav-elements">
              <ul className="nav-list">
                <li><NavLink to="/" onClick={toggleMenu}><Home size={18} /><span>Home</span></NavLink></li>
                <li><NavLink to="/addexpense" onClick={toggleMenu}><PlusCircle size={18} /><span>Add Expense</span></NavLink></li>
                <li><NavLink to="/addincome" onClick={toggleMenu}><DollarSign size={18} /><span>Add Income</span></NavLink></li>
                <li><NavLink to="/alltransactions" onClick={toggleMenu}><List size={18} /><span>All Transactions</span></NavLink></li>
                <li><NavLink to="/categories" onClick={toggleMenu}><Grid size={18} /><span>Categories</span></NavLink></li>
              </ul>
            </div>
          )}

          {localStorage.getItem('authToken') && (
            <div className="navbar-right">
              <button className="logout-btn" onClick={logout}>
                <LogOut size={18} />
                <span className="logout-text">Logout</span>
              </button>

              <button className="menu-toggle" onClick={toggleMenu}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

            </div>
          )}
        </div>
      </nav>
      {isOpen && (
        <div className="mobile-nav-overlay">
          <div className="mobile-nav-content">
            <button className="close-menu" onClick={toggleMenu}>
              <X size={24} />
            </button>
            <ul className="mobile-nav-list">
              <li><NavLink to="/" onClick={toggleMenu}>Home</NavLink></li>
              <li><NavLink to="/addexpense" onClick={toggleMenu}>Add Expense</NavLink></li>
              <li><NavLink to="/addincome" onClick={toggleMenu}>Add Income</NavLink></li>
              <li><NavLink to="/alltransactions" onClick={toggleMenu}>All Transactions</NavLink></li>
              <li><NavLink to="/categories" onClick={toggleMenu}>Categories</NavLink></li>
            </ul>
            {/* <div className="mobile-nav-footer">
              <p>Contact</p>
              <p>info@cashflow.com</p>
              <p>+1 (555) 123-4567</p>
              <div className="social-icons">
              </div>
            </div> */}
          </div>
        </div>
      )}
      <Alert />
    </>
  );
}

export default Navbar;