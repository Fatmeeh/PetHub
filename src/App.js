import React from 'react';
import './App.css';
import StartFrame from "./components/StartFrame";
import EndFrame from "./components/EndFrame";
import FeedAction from "./components/FeedAction";
import HealthBar from "./components/HealthBar";
import HungerBar from "./components/HungerBar";
import HitAction from "./components/HitAction";
import PetAction from "./components/PetAction";
import PetFrame from "./components/PetFrame";
import setItems from "./utils/setItems" ;
function App() {
  const [health, setHealth] = React.useState(localStorage.getItem('health') || 100);
  const [hunger, setHunger] = React.useState(localStorage.getItem('hunger') || 100);
  const [userData, setUserData] = React.useState(localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null);
  const [alive, setAlive] = React.useState(localStorage.getItem('alive') || true);
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    setItems({
      health,
      hunger,
      userData,
      alive
    });
  }, [health, hunger, userData, alive]);

  React.useEffect(() => {
    if (health <= 0) {
      setAlive(false);
    }
  }, [health]);

  React.useEffect(() => {
    let timer = setInterval(() => {
      setUserData(data => {
        if (data) {
          setHunger(previousHunger => {
            if (previousHunger >= 1) {
              return previousHunger - 1;
            } else {
              setHealth(previousHealth => previousHunger === 0 ? previousHealth - 1 : previousHealth);
              return 0;
            }
          });
        }
        return data;
      });
    }, 500);
    return () => clearInterval(timer);
  }, [userData]);

  if (!alive) {

    return (
      <div className="PetFrame">
        <EndFrame
          setAlive={setAlive}
          setUserData={setUserData}
          setHealth={setHealth}
          setHunger={setHunger}
          setStatus={setStatus} />
      </div>
    );
  } else if (!userData) {
    return (
      <div className="PetFrame">
        <StartFrame
          setUserData={setUserData} />
      </div>
    );
  } else {

    return (
      <div className="PetFrame">

        <PetFrame
          userData={userData}
          status={status} />
        <HealthBar
          health={health} />
        <HungerBar
          hunger={hunger} />

        <div className="actions-container">

          <FeedAction
            setHunger={setHunger}
            setStatus={setStatus} />
          <PetAction
            setHealth={setHealth}
            setStatus={setStatus} />
          <HitAction
            setHealth={setHealth}
            setStatus={setStatus} />

        </div>
      </div>
    );
  }
}

export default App;
