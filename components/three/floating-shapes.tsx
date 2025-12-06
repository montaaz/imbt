"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei"
import type * as THREE from "three"

function GradientSphere({
  position,
  scale,
  speed,
}: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function GridPlane() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[50, 50, "#6366f1", "#1a1a24"]}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, -5, 0]}
    />
  )
}

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#6366f1" />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#14b8a6" />

        <GradientSphere position={[-4, 2, -2]} scale={1.2} speed={1.5} />
        <GradientSphere position={[4, -1, -3]} scale={0.8} speed={2} />
        <GradientSphere position={[0, 3, -4]} scale={0.6} speed={1.8} />

        <GridPlane />
      </Canvas>
    </div>
  )
}
