import {
  Users,
  Eye,
  TrendingUp,
  MessageSquare,
  Calendar,
  Layers,
  BarChart3,
  PieChart as PieChartIcon,
  LayoutDashboard,
  LogOut,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import './App.css';

// Mock Data for Visualization
const growthData = [
  { name: 'Jan', views: 4000, reach: 2400 },
  { name: 'Feb', views: 3000, reach: 1398 },
  { name: 'Mar', views: 2000, reach: 9800 },
  { name: 'Apr', views: 2780, reach: 3908 },
  { name: 'May', views: 1890, reach: 4800 },
  { name: 'Jun', views: 2390, reach: 3800 },
  { name: 'Jul', views: 3490, reach: 4300 },
];

const demographicData = [
  { name: 'IT', value: 30, color: '#9d50bb' },
  { name: 'Marketing', value: 20, color: '#6e7aff' },
  { name: 'Sales', value: 15, color: '#00f2fe' },
  { name: 'Finance', value: 10, color: '#ff0080' },
  { name: 'HR', value: 25, color: '#4facfe' },
];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="glass-container metric-card">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 8px 0' }}>{title}</p>
        <h2 style={{ fontSize: '32px', margin: 0 }}>{value}</h2>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px', gap: '4px' }}>
          <TrendingUp size={16} color="#4ade80" />
          <span style={{ color: '#4ade80', fontSize: '14px', fontWeight: 600 }}>{change}</span>
        </div>
      </div>
      <div style={{
        padding: '12px',
        borderRadius: '16px',
        background: `rgba(${color}, 0.1)`,
        color: `rgb(${color})`
      }}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar glass-container">
        <div className="logo-section">
          <div className="logo-icon">in</div>
          <h1 className="logo-text">LINKYIELD</h1>
        </div>

        <nav className="nav-menu">
          <a href="#" className="nav-item active"><LayoutDashboard size={20} /> Dashboard</a>
          <a href="#" className="nav-item"><Users size={20} /> Network</a>
          <a href="#" className="nav-item"><Layers size={20} /> Content</a>
          <a href="#" className="nav-item"><PieChartIcon size={20} /> Audience</a>
          <a href="#" className="nav-item"><BarChart3 size={20} /> Engagement</a>
          <a href="#" className="nav-item"><Calendar size={20} /> Reports</a>
        </nav>

        <div className="user-profile">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" />
          <div className="user-info">
            <span className="user-name">Alex Chen</span>
            <span className="user-role">Marketing Manager</span>
          </div>
          <ChevronDown size={16} color="var(--text-secondary)" />
        </div>

        <button className="logout-btn"><LogOut size={20} /> Logout</button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="search-bar glass-container">
            <Search size={20} color="var(--text-secondary)" />
            <input type="text" placeholder="Search analytics..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn"><Bell size={20} /></button>
            <button className="btn-primary">Export Report</button>
          </div>
        </header>

        <section className="stats-grid">
          <StatCard title="Profile Views" value="48.3k" change="+15%" icon={Eye} color="157, 80, 187" />
          <StatCard title="Impressions" value="1.2M" change="+21%" icon={TrendingUp} color="110, 122, 255" />
          <StatCard title="Followers" value="18,450" change="+8.1%" icon={Users} color="0, 242, 254" />
          <StatCard title="Engagement Rate" value="5.7%" change="+2.4%" icon={MessageSquare} color="255, 0, 128" />
        </section>

        <section className="charts-grid">
          <div className="glass-container chart-card">
            <div className="chart-header">
              <h3>Growth & Engagement Trends</h3>
              <select className="period-select">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
              </select>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-purple)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent-purple)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} />
                  <Tooltip
                    contentStyle={{ background: '#1c1f2e', border: '1px solid var(--border-card)', borderRadius: '12px' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="var(--accent-purple)" fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="reach" stroke="var(--accent-blue)" fillOpacity={1} fill="url(#colorReach)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-container chart-card">
            <h3>Audience Activity by Time</h3>
            <div className="heatmap-mock">
              {/* Simplified Heatmap visualization */}
              <div className="heatmap-grid">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="heatmap-cell" style={{ opacity: Math.random() }}></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="glass-container chart-card demographic-card">
            <h3>Follower Demographics</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={demographicData}>
                  <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ background: '#1c1f2e', border: '1px solid var(--border-card)', borderRadius: '12px' }} />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-container chart-card pie-card">
            <h3>Content Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={demographicData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1c1f2e', border: '1px solid var(--border-card)', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
