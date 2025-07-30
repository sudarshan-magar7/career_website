import React from 'react';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">Welcome to CareerLaunch</h2>

      {/* Cards Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Feature Card {i}</h3>
            <p className="text-gray-600">This card highlights a key feature or update of the platform.</p>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h3 className="text-2xl font-bold mb-2">About CareerLaunch</h3>
        <p className="text-gray-700">
          CareerLaunch is your personalized career growth platform. Whether you're an aspiring web developer,
          a data scientist, or preparing for competitive coding, we provide tools and mentorship to help you succeed.
        </p>
      </div>
    </div>
  );
}
