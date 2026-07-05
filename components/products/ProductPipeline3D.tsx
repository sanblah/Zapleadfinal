"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * ProductPipeline3D
 *
 * A dual-rail "revenue pipeline" hero background for the products page.
 *   - Top rail (teal)  = Zapreach OS: leads flow in and are worked to booked.
 *   - Bottom rail (green) = Chatpay: messages flow in and are worked to paid.
 * Both rails stream light "packets" left -> right into a central ZapLead
 * engine, which then emits a warm output stream to the right (booked / paid).
 *
 * Directional flow only — no orbit / ring. Continuous motion tells the story;
 * scroll adds a subtle parallax. Mobile uses fewer packets + capped DPR, and
 * prefers-reduced-motion freezes the scene (draws on demand only).
 */

const ZAPREACH = new THREE.Color("#0FB5BA"); // teal
const CHATPAY = new THREE.Color("#25D366"); // green
const OUTPUT = new THREE.Color("#ffe1b8"); // warm = booked / paid

/** Soft circular sprite so points read as glowing packets, not hard squares. */
function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.85)");
    g.addColorStop(0.7, "rgba(255,255,255,0.18)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

type Rail = {
  curve: THREE.CatmullRomCurve3;
  count: number;
  color: THREE.Color;
  speed: number;
  kind: "in" | "out";
};

type PacketBuffer = {
  positions: Float32Array;
  colors: Float32Array;
  phases: Float32Array;
};

function buildPacketBuffer(count: number, color: THREE.Color): PacketBuffer {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    phases[i] = i / count + Math.random() * 0.03;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  return { positions, colors, phases };
}

function RailPackets({
  rail,
  buffer,
  texture,
  reducedMotion,
}: {
  rail: Rail;
  buffer: PacketBuffer;
  texture: THREE.Texture;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const points = ref.current;
    if (!points) return;
    const time = reducedMotion ? 0 : state.clock.getElapsedTime();

    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
    const colAttr = points.geometry.attributes.color as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;
    const colArr = colAttr.array as Float32Array;

    for (let i = 0; i < rail.count; i++) {
      const t = (buffer.phases[i] + time * rail.speed) % 1;
      rail.curve.getPoint(t, tmp);
      posArr[i * 3] = tmp.x;
      posArr[i * 3 + 1] = tmp.y;
      posArr[i * 3 + 2] = tmp.z;

      // Inbound packets brighten as they near the engine; the warm output
      // stream fades as it travels away.
      const bright = rail.kind === "in" ? 0.55 + t * 0.9 : 1 - t * 0.7;
      colArr[i * 3] = rail.color.r * bright;
      colArr[i * 3 + 1] = rail.color.g * bright;
      colArr[i * 3 + 2] = rail.color.b * bright;
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[buffer.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[buffer.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={rail.kind === "out" ? 0.34 : 0.28}
        map={texture}
        vertexColors
        transparent
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function Scene({ mobile, reducedMotion }: { mobile: boolean; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const engineRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Sprite>(null);

  const scrollRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  const dotTexture = useMemo(() => makeDotTexture(), []);

  // Engine anchor differs by layout: right-of-centre on desktop (horizontal
  // flow), just below centre on mobile portrait (vertical flow).
  const enginePos = useMemo<[number, number, number]>(
    () => (mobile ? [0, -1.0, 0] : [2.5, 0, 0]),
    [mobile],
  );

  const rails: Rail[] = useMemo(() => {
    const inCount = mobile ? 5 : 8;
    const outCount = mobile ? 4 : 6;

    if (mobile) {
      // Vertical portrait composition: two rails drop in from the top into the
      // engine, one output stream continues straight down.
      const zap = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.5, 4.6, 0),
        new THREE.Vector3(-1.1, 2.4, 0.2),
        new THREE.Vector3(-0.4, 0.4, 0),
        new THREE.Vector3(0, -0.85, 0),
      ]);
      const chat = new THREE.CatmullRomCurve3([
        new THREE.Vector3(1.5, 4.6, 0),
        new THREE.Vector3(1.1, 2.4, 0.2),
        new THREE.Vector3(0.4, 0.4, 0),
        new THREE.Vector3(0, -0.85, 0),
      ]);
      const out = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -1.35, 0),
        new THREE.Vector3(0.15, -3, 0),
        new THREE.Vector3(0.25, -4.8, 0),
      ]);
      return [
        { curve: zap, count: inCount, color: ZAPREACH, speed: 0.12, kind: "in" },
        { curve: chat, count: inCount, color: CHATPAY, speed: 0.12, kind: "in" },
        { curve: out, count: outCount, color: OUTPUT, speed: 0.15, kind: "out" },
      ];
    }

    // Desktop landscape composition: horizontal dual rails into the engine.
    const top = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-9.5, 1.85, 0),
      new THREE.Vector3(-4.5, 1.8, 0),
      new THREE.Vector3(-1.2, 1.5, 0.2),
      new THREE.Vector3(2.15, 0.2, 0),
    ]);
    const bottom = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-9.5, -1.85, 0),
      new THREE.Vector3(-4.5, -1.8, 0),
      new THREE.Vector3(-1.2, -1.5, 0.2),
      new THREE.Vector3(2.15, -0.2, 0),
    ]);
    const out = new THREE.CatmullRomCurve3([
      new THREE.Vector3(2.95, 0, 0),
      new THREE.Vector3(6, 0.3, 0),
      new THREE.Vector3(10, 0.5, 0),
    ]);
    return [
      { curve: top, count: inCount, color: ZAPREACH, speed: 0.11, kind: "in" },
      { curve: bottom, count: inCount, color: CHATPAY, speed: 0.11, kind: "in" },
      { curve: out, count: outCount, color: OUTPUT, speed: 0.14, kind: "out" },
    ];
  }, [mobile]);

  const buffers = useMemo(
    () => rails.map((r) => buildPacketBuffer(r.count, r.color)),
    [rails],
  );

  useEffect(() => {
    const readScroll = () => {
      const span = Math.max(1, window.innerHeight);
      scrollRef.current = Math.min(1, Math.max(0, window.scrollY / span));
    };
    const readMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);
    if (!reducedMotion) window.addEventListener("mousemove", readMouse);
    return () => {
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
      window.removeEventListener("mousemove", readMouse);
    };
  }, [reducedMotion]);

  useFrame((state) => {
    const time = reducedMotion ? 0 : state.clock.getElapsedTime();

    // Engine: a slowly turning core that pulses as packets arrive.
    if (engineRef.current) {
      engineRef.current.rotation.y = time * 0.4;
      engineRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(time * 2.2) * 0.12;
      const s = 2.6 * pulse;
      glowRef.current.scale.set(s, s, s);
      const mat = glowRef.current.material as THREE.SpriteMaterial;
      mat.opacity = 0.42 + Math.sin(time * 2.2) * 0.08;
    }

    // Subtle parallax (mouse) + gentle scroll drift; never an orbit.
    if (groupRef.current) {
      const g = groupRef.current;
      const targetY = reducedMotion ? 0 : mouse.current.x * 0.12;
      const targetX = reducedMotion ? 0 : -mouse.current.y * 0.06;
      g.rotation.y += (targetY - g.rotation.y) * 0.05;
      g.rotation.x += (targetX - g.rotation.x) * 0.05;
      g.position.y = scrollRef.current * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Faint rail conduits */}
      {rails.map((rail, r) => (
        <mesh key={`tube-${r}`}>
          <tubeGeometry args={[rail.curve, 64, 0.016, 6, false]} />
          <meshBasicMaterial
            color={rail.color}
            transparent
            opacity={0.26}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Flowing packets */}
      {rails.map((rail, r) => (
        <RailPackets
          key={`packets-${r}`}
          rail={rail}
          buffer={buffers[r]}
          texture={dotTexture}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Central ZapLead engine (a processor-like core, not a planet) */}
      <group position={enginePos}>
        <group ref={engineRef}>
          <mesh>
            <boxGeometry args={[1.05, 1.05, 1.05]} />
            <meshBasicMaterial color="#8ff0ff" wireframe transparent opacity={0.5} toneMapped={false} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshBasicMaterial color="#dffaff" transparent opacity={0.92} toneMapped={false} />
          </mesh>
        </group>
        <sprite ref={glowRef}>
          <spriteMaterial
            map={dotTexture}
            color="#6fe6ff"
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </sprite>
      </group>
    </group>
  );
}

export default function ProductPipeline3D() {
  const [ready, setReady] = useState(false);
  const [config, setConfig] = useState({ mobile: false, reducedMotion: false });

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setConfig({ mobile, reducedMotion });
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 12], fov: 42 }}
      dpr={config.mobile ? [1, 1.5] : [1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={config.reducedMotion ? "demand" : "always"}
    >
      <Scene mobile={config.mobile} reducedMotion={config.reducedMotion} />
    </Canvas>
  );
}
