import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="flex flex-col w-80 bg-white dark:bg-[#1C2030] border-r border-gray-200 dark:border-gray-700 p-4 shrink-0">
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="BrandFrame Studio Logo" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvekcB5eEC6W_sFRSc85XOLfXoLqV_Ju7JDDffuUaWEdgbqArwKk13jQgAveJHi7ViwyBqCZrzeKMBorwnD_lZ1855RO85O9-7qEWAyJjqmzuchVk6GSvFxY8PQpRZmdusnPVm0XE4IVQwFQhS4pkab7gCgNcCzZaNqEP-lUOnMk2sHrjJpv-5MN3A1mDFs7nulhvPjo71yF6zCeCpUgOPlsRb20BeoJiXt1N7ANGB2Dsj5QMg_UyZ86-1JXxDzBkMyhJPSS7dsvxF")'}}></div>
        <div className="flex flex-col">
          <h1 className="text-[#101218] dark:text-white text-base font-medium leading-normal">BrandFrame</h1>
          <p className="text-[#5e678d] dark:text-gray-400 text-sm font-normal leading-normal">Studio</p>
        </div>
      </div>
      <nav className="flex flex-col gap-2 mt-8">
        <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 dark:bg-primary/20" href="#">
          <span className="material-symbols-outlined text-primary text-2xl">dashboard</span>
          <p className="text-primary text-sm font-medium leading-normal">Dashboard</p>
        </a>
        <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" href="#">
          <span className="material-symbols-outlined text-[#101218] dark:text-gray-300 text-2xl">folder_open</span>
          <p className="text-[#101218] dark:text-gray-300 text-sm font-medium leading-normal">My Projects</p>
        </a>
      </nav>
      <div className="mt-auto flex flex-col gap-1">
        <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" href="#">
          <span className="material-symbols-outlined text-[#101218] dark:text-gray-300 text-2xl">settings</span>
          <p className="text-[#101218] dark:text-gray-300 text-sm font-medium leading-normal">Settings</p>
        </a>
        <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" href="#">
          <span className="material-symbols-outlined text-[#101218] dark:text-gray-300 text-2xl">help</span>
          <p className="text-[#101218] dark:text-gray-300 text-sm font-medium leading-normal">Help</p>
        </a>
      </div>
    </aside>
  );
};
