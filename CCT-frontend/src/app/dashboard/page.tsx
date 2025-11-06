'use client';

import DaraComponent from '../../components/common/Navbar';
import ProtectedRoute from '../../components/common/ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <DaraComponent />
        <div className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
            {user && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900">User Information</h3>
                    <p className="text-blue-700">Username: {user.username}</p>
                    <p className="text-blue-700">Email: {user.email}</p>
                    <p className="text-blue-700">Company: {user.companyName}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900">Account Status</h3>
                    <p className="text-green-700">Status: Active</p>
                    <p className="text-green-700">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Quick Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      Start New Registration
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                      View Compliance Status
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
