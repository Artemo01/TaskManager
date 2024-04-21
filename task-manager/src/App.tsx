import TasksContainer from "./components/TasksContainer/TasksContainer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import "./styles.scss";
import { useEffect, useState } from "react";
import { checkApiStatus } from "./services/api.service";
import ResponseErrorModal from "./components/ResponsErrorModal/ResponseErrorModal";

function App() {
  const [connected, setConnected] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const apiStatus = await checkApiStatus();
        apiStatus === "Healthy" ? setConnected(true) : setConnected(false);
      } catch {
        setConnected(false);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      {connected ? (
        <TasksContainer></TasksContainer>
      ) : (
        <ResponseErrorModal></ResponseErrorModal>
      )}
    </div>
  );
}

export default App;
