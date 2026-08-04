"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Sphere, MeshDistortMaterial, Trail, Float } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"

function ParticleSystem({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const count = 5000
  const mouse = useRef({ x: 0, y: 0 })

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Sphere distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 8 + Math.random() * 8

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Gradient colors from indigo to teal
      const t = Math.random()
      colors[i * 3] = 0.4 + t * 0.1 // R
      colors[i * 3 + 1] = 0.3 + t * 0.4 // G
      colors[i * 3 + 2] = 0.9 - t * 0.3 // B
    }
    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime

      // Smooth rotation
      ref.current.rotation.x = time * 0.03
      ref.current.rotation.y = time * 0.05

      // Mouse interaction with smooth lerp
      const targetX = state.pointer.x * 0.3
      const targetY = state.pointer.y * 0.3
      mouse.current.x += (targetX - mouse.current.x) * 0.05
      mouse.current.y += (targetY - mouse.current.y) * 0.05

      ref.current.rotation.x += mouse.current.y * 0.1
      ref.current.rotation.y += mouse.current.x * 0.1
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        opacity={isDark ? 1 : 0.6}
      />
    </Points>
  )
}

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  const spheresCount = 40

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2

      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const offset = i * 0.15
          child.position.y = Math.sin(state.clock.elapsedTime + offset) * 0.2 + child.userData.baseY
          child.scale.setScalar(0.8 + Math.sin(state.clock.elapsedTime * 2 + offset) * 0.2)
        }
      })
    }
  })

  return (
    <group ref={groupRef} position={[5, 0, -3]}>
      {Array.from({ length: spheresCount }).map((_, i) => {
        const y = (i - spheresCount / 2) * 0.25
        const angle = i * 0.3
        const radius = 1
        const x1 = Math.cos(angle) * radius
        const z1 = Math.sin(angle) * radius
        const x2 = Math.cos(angle + Math.PI) * radius
        const z2 = Math.sin(angle + Math.PI) * radius

        return (
          <group key={i}>
            <mesh position={[x1, y, z1]} userData={{ baseY: y }}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#6366f1" : "#14b8a6"}
                emissive={i % 2 === 0 ? "#6366f1" : "#14b8a6"}
                emissiveIntensity={0.5}
              />
            </mesh>
            <mesh position={[x2, y, z2]} userData={{ baseY: y }}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#14b8a6" : "#6366f1"}
                emissive={i % 2 === 0 ? "#14b8a6" : "#6366f1"}
                emissiveIntensity={0.5}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

function MorphingBlob() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3

      // Mouse interaction
      meshRef.current.position.x = -4 + state.pointer.x * 0.5
      meshRef.current.position.y = state.pointer.y * 0.5
    }
  })

  return (
    <Trail width={2} length={8} color="#6366f1" attenuation={(t) => t * t}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={meshRef} args={[1.2, 64, 64]} position={[-4, 0, -2]}>
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.6}
            speed={3}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>
    </Trail>
  )
}

function WireframeTorus() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1

      // Breathing scale
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
    if (materialRef.current) {
      // Color shift
      const hue = (state.clock.elapsedTime * 0.1) % 1
      materialRef.current.color.setHSL(0.7 + hue * 0.1, 0.8, 0.5)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 3, -4]}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          wireframe
          transparent
          opacity={0.6}
          emissive="#6366f1"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

function FloatingIcosahedrons() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.x = state.clock.elapsedTime * (0.2 + i * 0.1)
          child.rotation.y = state.clock.elapsedTime * (0.3 + i * 0.05)

          // Orbit motion
          const orbitRadius = child.userData.orbitRadius || 3
          const speed = child.userData.speed || 0.5
          child.position.x = Math.cos(state.clock.elapsedTime * speed + i) * orbitRadius
          child.position.z = Math.sin(state.clock.elapsedTime * speed + i) * orbitRadius
          child.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i * 2) * 2 + child.userData.baseY
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          userData={{
            orbitRadius: 4 + i * 0.5,
            speed: 0.3 + i * 0.1,
            baseY: (i - 3) * 1.5,
          }}
        >
          <icosahedronGeometry args={[0.3 + i * 0.1, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#6366f1" : "#14b8a6"}
            wireframe
            transparent
            opacity={0.7}
            emissive={i % 2 === 0 ? "#6366f1" : "#14b8a6"}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

function LightRing() {
  const ringRef = useRef<THREE.Points>(null)
  const count = 200

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 6
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.2
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
      ringRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.2
    }
  })

  return (
    <Points ref={ringRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#14b8a6"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = state.pointer.x * 10
      lightRef.current.position.y = state.pointer.y * 10
      lightRef.current.position.z = 5
    }
  })

  return <pointLight ref={lightRef} intensity={2} color="#ffffff" distance={20} />
}

export default function ParticleField() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Decorative background: skip on small screens and for reduced-motion users.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setEnabled(window.innerWidth >= 1024 && !prefersReducedMotion)
  }, [])

  if (!enabled) return null

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={isDark ? 0.3 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 1.5 : 1} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={isDark ? 1 : 0.5} color="#14b8a6" />
        <MouseLight />

        <ParticleSystem isDark={isDark} />
        <DNAHelix />
        <MorphingBlob />
        <WireframeTorus />
        <FloatingIcosahedrons />
        <LightRing />
      </Canvas>
    </div>
  )
}
