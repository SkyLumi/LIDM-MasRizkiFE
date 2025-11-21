import React from 'react';

interface Activity {
  id: string;
  studentName: string;
  activity: string;
  time: string;
  score?: string;
  status?: string;
  statusColor?: string;
  avatarColor: string;
  avatarInitials: string;
}

interface RecentActivityCardProps {
  activities: Activity[];
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activities }) => {
  return (
    <div className="bg-white shadow-md overflow-hidden sm:rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Aktivitas Terbaru</h3>
            <p className="mt-1 text-sm text-gray-500">
              Aktivitas siswa terbaru di platform
            </p>
          </div>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <li key={activity.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activity.avatarColor}`}>
                    <span className="text-sm font-bold text-white">{activity.avatarInitials}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.studentName}
                  </p>
                  <p className="text-sm text-gray-500">{activity.activity}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                {activity.score && (
                  <span className="text-sm font-bold text-green-600">
                    {activity.score}
                  </span>
                )}
                {activity.status && (
                  <span className={`text-xs font-medium ${
                    activity.statusColor || 'text-blue-600'
                  }`}>
                    {activity.status}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {activities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Belum ada aktivitas</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityCard;

