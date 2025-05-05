import { useEffect, useState } from "react";
import socket from "../../utils/socketConnection";
import MonitorScreen from "../dashboard/MonitorScreen.jsx";
import { useAuthContext } from "../../contexts/AuthContext";
import "./homepage.css";
export default function Homepage() {
  const [performanceData, setPerformanceData] = useState({});
  const { authUser, logout } = useAuthContext();
  const authKey = authUser.apiKey
  const hostUrl = import.meta.env.VITE_BACKEND_API
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`${text} copied to clipboard`);
  };

  return (
    <>
      <div className="wrapper">
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
        <div className="sasta-nav">
          <div className="client-repo">
            <a
              href="https://github.com/Mickyverma24/client-cli"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get client
            </a>
          </div>

          <div className="copy-box" onClick={() => copyToClipboard(authKey)}>
            <span className="label">Auth key</span>
          </div>

          <div className="copy-box" onClick={() => copyToClipboard(hostUrl)}>
            <span className="label">Host url</span>
          </div>
        </div>

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
      </div>
    </>
  );
}
