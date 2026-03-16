import { NavLink, Outlet } from 'react-router';
import { Settings2, ShoppingCart, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Layout() {
  const { hasActiveOrder } = useApp();

  const navItems = [
    { to: '/configure',     label: 'Configure',      Icon: Settings2 },
    { to: '/confirm-order', label: 'Confirm Order',   Icon: ShoppingCart },
    { to: '/order-status',  label: 'Order Status',    Icon: Truck },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface text-slate-200">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-surface-raised border-b border-line-card">
        <div className="max-w-screen-2xl mx-auto px-6 flex items-center gap-8 h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-4 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500">
              <Settings2 size={16} color="white" strokeWidth={2.2} />
            </div>
            <span className="font-semibold tracking-tight text-slate-200">
              CPS<span className="text-blue-500">Builder</span>
            </span>
          </div>

          {/* Nav tabs */}
          <nav className="flex gap-1">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-150 ` +
                  (isActive
                    ? 'bg-blue-nav text-blue-300 font-medium'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5')
                }
              >
                <Icon size={15} />
                <span>{label}</span>
                {to === '/order-status' && hasActiveOrder && (
                  <span className="w-1.5 h-1.5 rounded-full ml-0.5 bg-blue-500" />
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right-side tag */}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-border text-blue-400 border border-blue-800">
              Wireframe Prototype
            </span>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
