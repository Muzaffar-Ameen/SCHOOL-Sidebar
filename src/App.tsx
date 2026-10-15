import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import logo from "./assets/muzafar-tech-logo-navbar.png";

// Har module: sidebar + tile dono me use hota hai
const MODULES = [
  {
    name: "Students",
    icon: "solar:users-group-rounded-bold-duotone",
    g: "from-orange-400 to-rose-500",
  },
  {
    name: "Teachers",
    icon: "solar:square-academic-cap-bold-duotone",
    g: "from-emerald-400 to-teal-600",
  },
  {
    name: "Attendance",
    icon: "solar:clipboard-check-bold-duotone",
    g: "from-fuchsia-500 to-pink-600",
  },
  {
    name: "Class List",
    icon: "solar:checklist-minimalistic-bold-duotone",
    g: "from-sky-400 to-blue-600",
  },
  {
    name: "Timetable",
    icon: "solar:calendar-mark-bold-duotone",
    g: "from-violet-500 to-purple-700",
  },
  {
    name: "Exam",
    icon: "solar:document-text-bold-duotone",
    g: "from-cyan-400 to-blue-500",
  },
  {
    name: "Exam Result",
    icon: "solar:cup-star-bold-duotone",
    g: "from-amber-400 to-orange-600",
  },
  {
    name: "Homework",
    icon: "solar:book-bookmark-bold-duotone",
    g: "from-lime-400 to-green-600",
  },
  {
    name: "Fees",
    icon: "solar:wallet-money-bold-duotone",
    g: "from-yellow-400 to-amber-600",
  },
  {
    name: "Calendar",
    icon: "solar:calendar-bold-duotone",
    g: "from-red-400 to-red-600",
  },
  {
    name: "News",
    icon: "solar:bell-bing-bold-duotone",
    g: "from-indigo-400 to-indigo-700",
  },
  {
    name: "Settings",
    icon: "solar:settings-bold-duotone",
    g: "from-slate-500 to-slate-700",
  },
];

const STATS = [
  {
    label: "Students",
    value: "1,240",
    note: "+32 this month",
    icon: "solar:users-group-rounded-bold-duotone",
    g: "from-orange-400 to-rose-500",
  },
  {
    label: "Teachers",
    value: "68",
    note: "4 on leave",
    icon: "solar:square-academic-cap-bold-duotone",
    g: "from-emerald-400 to-teal-600",
  },
  {
    label: "Attendance today",
    value: "94%",
    note: "+2% vs yesterday",
    icon: "solar:clipboard-check-bold-duotone",
    g: "from-fuchsia-500 to-pink-600",
  },
  {
    label: "Fees collected",
    value: "82%",
    note: "Rs 4.2M of 5.1M",
    icon: "solar:wallet-money-bold-duotone",
    g: "from-yellow-400 to-amber-600",
  },
];

const WEEK = [
  { d: "Mon", v: 92 },
  { d: "Tue", v: 95 },
  { d: "Wed", v: 89 },
  { d: "Thu", v: 96 },
  { d: "Fri", v: 91 },
  { d: "Sat", v: 84 },
];

const NOTICES = [
  { t: "Annual sports day on 28 Oct", s: "2h ago" },
  { t: "Mid-term exam schedule published", s: "Yesterday" },
  { t: "Parent-teacher meeting on Friday", s: "2 days ago" },
];

export default function App() {
  const [open, setOpen] = useState(() => window.innerWidth >= 1024);
  const [active, setActive] = useState("Home");
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) =>
      !menuRef.current?.contains(e.target as Node) && setMenu(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const go = (name: string) => {
    setActive(name);
    if (window.innerWidth < 1024) setOpen(false);
  };
  const logout = () => alert("Logged out"); // yahan apna logout logic lagayen
  const tiles = MODULES.filter((m) =>
    m.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-slate-800">
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#1c1e26] text-slate-300 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="School" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold tracking-wide text-white">
              SCHOOL
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <Icon icon="solar:close-circle-bold-duotone" width={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {[
            {
              name: "Home",
              icon: "solar:home-2-bold-duotone",
              g: "from-blue-500 to-indigo-600",
            },
            ...MODULES,
          ].map((m) => (
            <button
              key={m.name}
              onClick={() => go(m.name)}
              className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active === m.name
                  ? "bg-white/10 text-white"
                  : "hover:bg-white/5 hover:text-white"
              }`}
            >
              {active === m.name && (
                <motion.span
                  layoutId="bar"
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-blue-400"
                />
              )}
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br text-white ${m.g}`}
              >
                <Icon icon={m.icon} width={16} />
              </span>
              {m.name}
            </button>
          ))}
        </nav>
      </aside>

      <div
        className={`transition-[padding] duration-300 ${open ? "lg:pl-64" : ""}`}
      >
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between bg-white px-4 shadow-sm sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle sidebar"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Icon icon="solar:hamburger-menu-bold-duotone" width={24} />
            </button>
            <div className="leading-tight">
              <p className="font-semibold">Admin</p>
              <p className="text-xs text-slate-500">Muzafar Ali</p>
            </div>
          </div>

          <div ref={menuRef} className="relative flex items-center gap-2">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100">
              <Icon icon="solar:bell-bold-duotone" width={22} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500" />
            </button>
            <button
              onClick={() => setMenu((m) => !m)}
              className="flex items-center gap-1 rounded-full p-1 hover:bg-slate-100"
            >
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt="Profile"
                className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-500"
              />
              <Icon icon="solar:alt-arrow-down-linear" width={16} />
            </button>
            <AnimatePresence>
              {menu && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-xl"
                >
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                  >
                    <Icon icon="solar:logout-2-bold-duotone" width={18} />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <main className="space-y-6 p-4 sm:p-6">
          {active !== "Home" ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-xl font-semibold">{active}</h2>
              <p className="mt-1 text-slate-500">
                Is module ka page yahan banayen.
              </p>
            </div>
          ) : (
            <>
              {/* Search */}
              <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
                <Icon
                  icon="solar:magnifer-linear"
                  width={20}
                  className="text-slate-400"
                />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search modules..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm"
                  >
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${s.g}`}
                    >
                      <Icon icon={s.icon} width={28} />
                    </span>
                    <div>
                      <p className="text-sm text-slate-500">{s.label}</p>
                      <p className="text-2xl font-bold">{s.value}</p>
                      <p className="text-xs text-emerald-600">{s.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Module tiles */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {tiles.map((m) => (
                  <motion.button
                    key={m.name}
                    onClick={() => go(m.name)}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex flex-col items-center gap-3 rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-xl"
                  >
                    <span
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${m.g}`}
                    >
                      <Icon icon={m.icon} width={32} />
                    </span>
                    <span className="text-sm font-medium">{m.name}</span>
                  </motion.button>
                ))}
                {tiles.length === 0 && (
                  <p className="col-span-full py-6 text-center text-slate-500">
                    Koi module nahi mila.
                  </p>
                )}
              </div>

              {/* Attendance chart + notices */}
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-2">
                  <h2 className="mb-4 font-semibold">Weekly attendance</h2>
                  <div className="flex h-44 items-end gap-3">
                    {WEEK.map((w, i) => (
                      <div
                        key={w.d}
                        className="flex flex-1 flex-col items-center gap-2"
                      >
                        <span className="text-xs text-slate-500">{w.v}%</span>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${w.v * 1.2}px` }}
                          transition={{ delay: i * 0.07, duration: 0.5 }}
                          className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-400"
                        />
                        <span className="text-xs font-medium">{w.d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <h2 className="mb-4 font-semibold">Notices</h2>
                  <ul className="space-y-4">
                    {NOTICES.map((n) => (
                      <li key={n.t} className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        <div>
                          <p className="text-sm font-medium">{n.t}</p>
                          <p className="text-xs text-slate-500">{n.s}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
