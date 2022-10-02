import React from "react";

export default function Mouse() {
  document.addEventListener("mousemove", parallax);
  function parallax(e) {
    this.querySelectorAll(".layer").forEach(layer => {
      const speed = layer.getAttribute("data-speed");

      const x = (window.innerWidth - e.pageX * speed) / 100;
      const y = (window.innerHeight - e.pageY * speed) / 100;

      layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  }
  return (
    <>
      <img
        className="layer"
        src="1.png"
        data-speed="-1"
        alt=""
        style={{
          width: "100px",
          height: "100px",
        }}
      />
      <img
        className="layer"
        src="2.png"
        data-speed="4"
        alt=""
        style={{ width: "100px", height: "100px" }}
      />
      <img
        className="layer"
        src="7.png"
        data-speed="1"
        alt=""
        style={{ width: "100px", height: "100px" }}
      />
      <img
        className="layer"
        src="4.png"
        data-speed="2"
        alt=""
        style={{ width: "150px", height: "100px" }}
      />
      <img
        className="layer"
        src="5.png"
        data-speed="-2"
        alt=""
        style={{ width: "140px", height: "100px" }}
      />
      <img
        className="layer"
        src="6.png"
        data-speed="-6"
        alt=""
        style={{ width: "40px", height: "70px" }}
      />
      <img
        className="layer"
        src="3.png"
        data-speed="3"
        alt=""
        style={{ width: "150px", height: "100px" }}
      />
      <div
        className="layer"
        data-speed="2"
        style={{ textshadow: "0px 0px 10px #111" }}
      >
        Crypto Donate !
      </div>
    </>
  );
}
