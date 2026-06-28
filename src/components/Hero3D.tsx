"use client";

import { useRef, useEffect, useState } from "react";

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="w-full h-full flex items-center justify-center">
      <div className="w-64 h-64 rounded-full border-2 border-primary/30 animate-pulse" />
    </div>;
  }

  return <IcosahedronScene />;
}

function IcosahedronScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const THREE = await import("three");
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 5);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const geometry = new THREE.IcosahedronGeometry(1.8, 0);
      const edges = new THREE.EdgesGeometry(geometry);
      const material = new THREE.LineBasicMaterial({
        color: 0x00ffd1,
        transparent: true,
        opacity: 0.8,
      });
      const icosahedron = new THREE.LineSegments(edges, material);
      scene.add(icosahedron);

      const innerGeom = new THREE.IcosahedronGeometry(0.8, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x00ffd1,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
      const inner = new THREE.Mesh(innerGeom, innerMat);
      scene.add(inner);

      const particlesGeom = new THREE.BufferGeometry();
      const particleCount = 200;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
      }
      particlesGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x00ffd1,
        size: 0.02,
        transparent: true,
        opacity: 0.5,
      });
      const particles = new THREE.Points(particlesGeom, particleMat);
      scene.add(particles);

      const clock = new THREE.Clock();

      const animate = () => {
        const t = clock.getElapsedTime();
        icosahedron.rotation.x = t * 0.2;
        icosahedron.rotation.y = t * 0.3;
        inner.rotation.x = -t * 0.25;
        inner.rotation.y = -t * 0.35;
        particles.rotation.y = t * 0.05;
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };

      let animationId = requestAnimationFrame(animate);

      const handleResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      cleanup = () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", handleResize);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        geometry.dispose();
        edges.dispose();
        innerGeom.dispose();
        particlesGeom.dispose();
        material.dispose();
        innerMat.dispose();
        particleMat.dispose();
        renderer.dispose();
      };
    };

    init();

    return () => cleanup?.();
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[400px]" />;
}
