import { NavLink, Outlet, useNavigate } from 'react-router';
import { LayoutDashboard, List, Cpu, FileText, LogOut, Factory } from 'lucide-react';
import { useProduction } from '../context/ProductionContext';

const navItems = [
  { to: '/operator/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/operator/queue',     label: 'Queue',     Icon: List },
  { to: '/operator/machines',  label: 'Machines',  Icon: Cpu },
  { to: '/operator/logs',      label: 'Logs',      Icon: FileText },
];

export function OperatorLayout() {
  const { logout } = useProduction();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/operator');
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-screen-2xl mx-auto px-6 flex items-center gap-8 h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-4 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600">
              <Factory size={16} color="white" strokeWidth={2} />
            </div>
            <span className="font-semibold tracking-tight text-white">
              CPS<span className="text-blue-400">Builder</span>
              <span className="ml-1.5 text-xs text-zinc-500 font-normal">Operator</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="flex gap-1">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-150 ` +
                  (isActive
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800')
                }
              >
                <Icon size={15} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="ml-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
