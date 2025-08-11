import React, { useEffect, useRef } from "react";
import "wicg-inert";
import * as THREE from "three";
import { gsap } from "gsap";

import f1 from "../media/f1.png";
import f2 from "../media/f2.webp";
import f3 from "../media/f3.webp";
import f4 from "../media/f4.webp";

import "./footer.css";

export default function Footer() {
  const canvasRef = useRef(null);

  // Three.js gradient background setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.position.z = 5;

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(10, 6, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      wireframe: false,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const positionAttribute = geometry.attributes.position;

    function animate() {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        positionAttribute.setZ(i, Math.sin(x * 2 + time) * 0.2);
      }
      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  // Dock floating animation
  useEffect(() => {
    gsap.to(".footer-dock img", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    });
  }, []);

  return (
    <footer className="footer relative overflow-hidden">
      {/* Three.js background */}
      <canvas ref={canvasRef} className="footer-canvas"></canvas>

      {/* Background layers */}
      <div className="footer-bg absolute inset-0 z-0">
        <div className="stars"></div>
        <div className="clouds"></div>
      </div>

      {/* CTA Section */}
      <div inert={true} className="footer-cta relative z-10 text-center py-16">
        <h2 className="text-4xl font-bold mb-4">Get Started With Adaline</h2>
        <p className="text-lg mb-6">Your AI-powered marketing assistant.</p>
        <a
          href="/signup"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Try for Free
        </a>
      </div>

      {/* Floating dock */}
      <div className="footer-dock relative z-10 flex justify-center gap-4 mt-12">
        <img src={f1} alt="Dock item 1" />
        <img src={f2} alt="Dock item 2" />
        <img src={f3} alt="Dock item 3" />
        <img src={f4} alt="Dock item 4" />
      </div>
    </footer>
  );
}
