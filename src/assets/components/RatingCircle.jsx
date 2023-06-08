import React, { useEffect, useRef } from "react";

const RatingCircle = ({ rating }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    const lineWidth = 10;
    const startAngle = -Math.PI / 2;
    const endAngle = (rating / 10) * (2 * Math.PI) + startAngle;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Zeichne den ungefüllten Kreis
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - lineWidth / 2, 0, 2 * Math.PI);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#ccc";
    ctx.stroke();

    // Zeichne den Teil des Kreises entsprechend dem Rating
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - lineWidth / 2, startAngle, endAngle);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#f00"; // Farbe für den gefüllten Teil des Kreises
    ctx.stroke();

    // Schreibe die Rating-Zahl in die Mitte des Kreises
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000"; // Farbe der Rating-Zahl
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(rating.toFixed(1), centerX, centerY);
  }, [rating]);

  return <canvas ref={canvasRef} width={100} height={100} />;
};

export default RatingCircle;
