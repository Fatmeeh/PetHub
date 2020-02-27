import React from "react"


const HitAction = ({ setHealth, setStatus }) => {
    const style = {
        "fontSize": "4rem",
        "paddingBottom": "1.7rem"
    };

    const hit = () => {

        setStatus("💥");

        setHealth(health => {
            let newHealth = health - 6;
            if (newHealth < 0)
                return 0;

            return newHealth;
        });
    };

    return (
        <div onClick={hit} className="button" style={style}>
            💥
        </div>
    );
}

export default HitAction;