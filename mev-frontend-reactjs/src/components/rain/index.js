import React, { useEffect } from "react";

const Rain = () => {
  useEffect(() => {
    const canvas = document.getElementById("Matrix");
    const context = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const katakana =
      "0x3a7c85ed2a3098f9a01b1c2c8b4a31d3c3458f5b384d78eab492b297e661c5480x9f78ad458c8d937da5a623d4e4f6495f3a0f3e6340c383b65866533e08e2751c0x7d8a3abf84485a4b87bf03ed558e7ef4f0c5b748ddefe3f849dfdcad82889a9f";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";

    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#0F0";
      context.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        );
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };
    setInterval(draw, 30);
  }, []);
  return (
    <div className="rain-body bg-black h-full overflow-hidden">
      <canvas id="Matrix"></canvas>
    </div>
  );
};

export default Rain;
