import { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";

interface Professional {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  email: string;
  verified: boolean;
  available: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: "active" | "suspended" | "pending";
}

interface Report {
  id: string;
  type: "testimony" | "message" | "user";
  contentId: string;
  reportedBy: string;
  reason: string;
  status: "pending" | "resolved" | "dismissed";
  date: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"professionals" | "users" | "reports">("professionals");
  const [professionals, setProfessionals] = useState<Professional[]>([
    {
      id: "1",
      name: "Dr. Maya Johnson",
      specialty: "Anxiety & Depression",
      bio: "Licensed therapist with 10 years of experience in CBT.",
      email: "maya.johnson@example.com",
      verified: true,
      available: true,
    },
    {
      id: "2",
      name: "Dr. Robert Chen",
      specialty: "Trauma Recovery",
      bio: "Specializing in trauma-informed therapy approaches.",
      email: "robert.chen@example.com",
      verified: true,
      available: false,
    },
  ]);
  
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      joinDate: "2023-04-15",
      status: "active",
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      email: "m.rodriguez@example.com",
      joinDate: "2023-05-22",
      status: "active",
    },
  ]);
  
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      type: "testimony",
      contentId: "2",
      reportedBy: "user123",
      reason: "Inappropriate content",
      status: "pending",
      date: "2023-06-10",
    },
  ]);
  
  const [newProfessional, setNewProfessional] = useState<Omit<Professional, "id" | "verified" | "available">>({
    name: "",
    specialty: "",
    bio: "",
    email: "",
  });

  const handleAddProfessional = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProfessional.name || !newProfessional.specialty || !newProfessional.email) {
      alert("Please fill in all required fields");
      return;
    }
    
    const professional: Professional = {
      id: Date.now().toString(),
      name: newProfessional.name,
      specialty: newProfessional.specialty,
      bio: newProfessional.bio,
      email: newProfessional.email,
      verified: false,
      available: true,
    };
    
    setProfessionals([...professionals, professional]);
    setNewProfessional({
      name: "",
      specialty: "",
      bio: "",
      email: "",
    });
  };

  const toggleProfessionalStatus = (id: string, field: "verified" | "available") => {
    setProfessionals(professionals.map(prof => 
      prof.id === id ? { ...prof, [field]: !prof[field] } : prof
    ));
  };

  const updateUserStatus = (id: string, status: User["status"]) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status } : user
    ));
  };

  const updateReportStatus = (id: string, status: Report["status"]) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status } : report
    ));
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-20">
      <Title text="Admin Dashboard" />
      <p className="text-center text-black mb-8">
        Manage professionals, users, and content
      </p>

      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex mb-6 rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-3 px-4 ${
              activeTab === "professionals" 
                ? "bg-primary text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("professionals")}
          >
            Professionals
          </button>
          <button
            className={`flex-1 py-3 px-4 ${
              activeTab === "users" 
                ? "bg-primary text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`flex-1 py-3 px-4 ${
              activeTab === "reports" 
                ? "bg-primary text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </button>
        </div>

        {/* Professionals Tab */}
        {activeTab === "professionals" && (
          <div className="space-y-6">
            <div className="rounded-lg shadow-md p-6" style={{
              background: "linear-gradient(to right, var(--color-primary), var(--color-vivid-purple))",
            }}>
              <h2 className="text-2xl font-medium mb-4 text-white">Add New Professional</h2>
              <form onSubmit={handleAddProfessional} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-white">Full Name</label>
                    <input 
                      type="text"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white"
                      placeholder="Full Name"
                      value={newProfessional.name}
                      onChange={(e) => setNewProfessional({...newProfessional, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-white">Specialty</label>
                    <input 
                      type="text"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white"
                      placeholder="e.g., Anxiety, Depression"
                      value={newProfessional.specialty}
                      onChange={(e) => setNewProfessional({...newProfessional, specialty: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-white">Email</label>
                  <input 
                    type="email"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white"
                    placeholder="Email Address"
                    value={newProfessional.email}
                    onChange={(e) => setNewProfessional({...newProfessional, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-white">Professional Bio</label>
                  <textarea 
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white"
                    rows={4}
                    placeholder="Brief professional biography"
                    value={newProfessional.bio}
                    onChange={(e) => setNewProfessional({...newProfessional, bio: e.target.value})}
                  />
                </div>
                <div className="flex justify-end">
                  <div className="w-36">
                    <Button value="Add Professional" small type="submit" />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <h2 className="text-xl font-medium p-4 border-b text-primary">Manage Professionals</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {professionals.map((prof) => (
                      <tr key={prof.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prof.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prof.specialty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prof.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            prof.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {prof.verified ? 'Verified' : 'Pending Verification'}
                          </span>
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            prof.available ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {prof.available ? 'Available' : 'Not Available'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => toggleProfessionalStatus(prof.id, "verified")}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            {prof.verified ? 'Remove Verification' : 'Verify'}
                          </button>
                          <button 
                            onClick={() => toggleProfessionalStatus(prof.id, "available")}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            {prof.available ? 'Set Unavailable' : 'Set Available'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-medium p-4 border-b text-primary">Manage Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 
                          user.status === 'suspended' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {user.status !== 'active' && (
                          <button 
                            onClick={() => updateUserStatus(user.id, "active")}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            Activate
                          </button>
                        )}
                        {user.status !== 'suspended' && (
                          <button 
                            onClick={() => updateUserStatus(user.id, "suspended")}
                            className="text-red-600 hover:text-red-900"
                          >
                            Suspend
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-medium p-4 border-b text-primary">Content Reports</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">{report.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.reportedBy}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{report.reason}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          report.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                          report.status === 'dismissed' ? 'bg-gray-100 text-gray-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {report.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => updateReportStatus(report.id, "resolved")}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Resolve
                            </button>
                            <button 
                              onClick={() => updateReportStatus(report.id, "dismissed")}
                              className="text-red-600 hover:text-red-900"
                            >
                              Dismiss
                            </button>
                          </>
                        )}
                        <button className="text-blue-600 hover:text-blue-900 ml-3">
                          View Content
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 