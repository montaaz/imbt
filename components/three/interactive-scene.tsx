"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei"
import * as THREE from "three"

// Interactive hoverable sphere
function InteractiveSphere({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number]
  color: string
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2

      // Scale on hover
      const targetScale = hovered ? scale * 1.3 : scale
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere
        ref={meshRef}
        args={[1, 64, 64]}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={color}
          distort={hovered ? 0.8 : 0.4}
          speed={hovered ? 5 : 2}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  )
}

// Glass cube with refraction
function GlassCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.95}
          roughness={0.1}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#6366f1"
        />
      </mesh>
    </Float>
  )
}

// Particle explosion on click
function ParticleExplosion() {
  const pointsRef = useRef<THREE.Points>(null)
  const [exploded, setExploded] = useState(false)
  const count = 500

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 0
      pos[i * 3 + 1] = 0
      pos[i * 3 + 2] = 0
    }
    return pos
  }, [])

  const velocities = useMemo(() => {
    const vel = []
    for (let i = 0; i < count; i++) {
      vel.push(new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2))
    }
    return vel
  }, [])

  useFrame((state, delta) => {
    if (pointsRef.current && exploded) {
      const positions = pointsRef.current.geometry.attributes.position
      for (let i = 0; i < count; i++) {
        positions.array[i * 3] += velocities[i].x * delta * 3
        positions.array[i * 3 + 1] += velocities[i].y * delta * 3
        positions.array[i * 3 + 2] += velocities[i].z * delta * 3

        // Gravity
        velocities[i].y -= delta * 0.5
      }
      positions.needsUpdate = true
    }
  })

  return (
    <group onClick={() => setExploded(true)}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointMaterial
          size={0.05}
          color="#14b8a6"
          transparent
          opacity={exploded ? 1 : 0}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {!exploded && (
        <Sphere args={[0.5, 32, 32]} position={[0, -2, 0]}>
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.5} />
        </Sphere>
      )}
    </group>
  )
}

// Orbiting rings
function OrbitRings() {
  const group1 = useRef<THREE.Group>(null)
  const group2 = useRef<THREE.Group>(null)
  const group3 = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group1.current) group1.current.rotation.x = t * 0.5
    if (group2.current) group2.current.rotation.y = t * 0.3
    if (group3.current) group3.current.rotation.z = t * 0.4
  })

  return (
    <>
      <group ref={group1}>
        <mesh>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.8} />
        </mesh>
      </group>
      <group ref={group2}>
        <mesh>
          <torusGeometry args={[3.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.8} />
        </mesh>
      </group>
      <group ref={group3}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4, 0.02, 16, 100]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </>
  )
}

export default function InteractiveScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#14b8a6" />

        <Sparkles count={200} scale={15} size={2} speed={0.5} color="#6366f1" />

        <InteractiveSphere position={[-4, 2, 0]} color="#6366f1" scale={0.8} />
        <InteractiveSphere position={[4, -1, -2]} color="#14b8a6" scale={0.6} />
        <GlassCube position={[0, 0, -3]} />
        <OrbitRings />
        <ParticleExplosion />
      </Canvas>
    </div>
  )
}
