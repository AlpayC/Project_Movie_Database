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

    // Zeichne den ungefüllten Kreis als Hintergrund
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - lineWidth / 2, 0, 2 * Math.PI);
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = `#75d5ab`; // Hintergrundfarbe des Kreises
    ctx.fill();

    // Zeichne den gefüllten Teil des Kreises
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - lineWidth / 2, startAngle, endAngle);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#3B4856"; // Farbe für den gefüllten Teil des Kreises
    ctx.stroke();

    // Schreibe die Rating-Zahl in die Mitte des Kreises
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000"; // Farbe der Rating-Zahl
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(rating.toFixed(1), centerX, centerY);
  }, [rating]);

  return (
    <canvas ref={canvasRef} width={80} height={80} className="rating-circle" />
  );
};

export default RatingCircle;
