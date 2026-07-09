import { auth } from "@/auth";

export default async function AdminDashboard() {
  const session = await auth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-light-200">
          Welcome back, <span className="text-primary">{session?.user?.name || session?.user?.email}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Stat Cards */}
        <div className="p-6 bg-dark-100 rounded-lg border border-border-dark flex flex-col gap-2">
          <h3 className="text-light-200 text-sm font-medium uppercase tracking-wider">Total Events</h3>
          <p className="text-4xl font-bold text-white">24</p>
        </div>

        <div className="p-6 bg-dark-100 rounded-lg border border-border-dark flex flex-col gap-2">
          <h3 className="text-light-200 text-sm font-medium uppercase tracking-wider">Total Bookings</h3>
          <p className="text-4xl font-bold text-white">1,204</p>
        </div>

        <div className="p-6 bg-dark-100 rounded-lg border border-border-dark flex flex-col gap-2">
          <h3 className="text-light-200 text-sm font-medium uppercase tracking-wider">Active Users</h3>
          <p className="text-4xl font-bold text-white">342</p>
        </div>
      </div>

      <div className="p-8 bg-dark-100 rounded-lg border border-border-dark mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-primary text-black rounded-md font-medium hover:bg-primary/90 transition">
            Create New Event
          </button>
          <button className="px-4 py-2 bg-dark-200 text-white rounded-md font-medium hover:bg-dark-200/80 transition border border-border-dark">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
