import { useEffect, useState } from "react";
import socket from "../../utils/socketConnection";
import MonitorScreen from "../dashboard/MonitorScreen.jsx";
import { useAuthContext } from "../../contexts/AuthContext";
import "./homepage.css";
export default function Homepage() {
  const [performanceData, setPerformanceData] = useState({});
  const { authUser, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    if (!authUser) return;

    socket.on("prefData", (data) => {
      setPerformanceData((prevData) => {
        return { ...prevData, [data.mac]: data };
      });
    });

    const interval = setInterval(() => {
      socket.emit("requestPerfData");
    }, 1000);

    return () => {
      socket.off("prefData");
      clearInterval(interval);
    };
  }, [authUser]);

  const arrayOfMonitors = Object.values(performanceData).map((d) => (
    <MonitorScreen data={d} key={d.mac} />
  ));

  return (
    <>
      <button className="button" onClick={handleLogout}>Logout</button>

      <div className="container custom">
        {arrayOfMonitors.length > 0 ? (
          arrayOfMonitors
        ) : (
          <div className="text-center mt-5">
            <h3>No performance data available</h3>
            <p>Waiting for data from connected machines...</p>
          </div>
        )}
      </div>
    </>
  );
}
