import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menu = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "Insights", path: "/insights" },
  ];

  return (
    <div className="h-screen w-56 bg-[#D1D1D1]  flex flex-col p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">TaskManager</h1>

      {menu.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          end
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-4 py-2 mb-2 rounded-lg transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-700 hover:bg-blue-50"
            }`
          }
        >
          {item.icon}
          <span>{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
