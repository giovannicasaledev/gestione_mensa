import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardUser = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/menus`);
      setMenus(res.data);
    };
    fetchMenus();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      <ul>
        {menus.map(menu => (
          <li key={menu._id}>
            <strong>{new Date(menu.date).toLocaleDateString()}:</strong> {menu.items.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardUser;
