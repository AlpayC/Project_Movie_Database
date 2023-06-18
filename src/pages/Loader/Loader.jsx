import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

import "./Loader.css";

const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeout(navigate("/home"));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="splash-screen">
        <Audio
          height="120"
          width="120"
          radius="9"
          color="white"
          ariaLabel="loading"
        />
        <div className="logo">
          <h1>
            MOV<span>.</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Loader;
