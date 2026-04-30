"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  Float,
  MeshDistortMaterial,
  Environment,
  Sphere,
  Box,
  Torus,
  TorusKnot,
  Icosahedron,
  Octahedron,
  Stars,
} from "@react-three/drei"
import * as THREE from "three"

// Refs-based scroll/mouse — no React state, no re-renders
function useScrollRef() {
  const ref = useRef(0)
  useEffect(() => {
    const handle = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      ref.current = h > 0 ? window.scrollY / h : 0
    }
    window.addEventListener("scroll", handle, { passive: true })
    return () => window.removeEventListener("scroll", handle)
  }, [])
  return ref
}

function useMouseRef() {
  const ref = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      ref.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener("mousemove", handle, { passive: true })
    return () => window.removeEventListener("mousemove", handle)
  }, [])
  return ref
}

// Particle wave — 5000 particles (was 15000), GPU-friendly
function ParticleWave({
  scrollRef,
  mouseRef,
}: {
  scrollRef: React.MutableRefObject<number>
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}) {
  const meshRef = useRef<THREE.Points>(null)
  const count = 5000

  const { positions, colors, initialPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const initialPositions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50
      const y = (Math.random() - 0.5) * 50
      const z = (Math.random() - 0.5) * 50

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      initialPositions[i * 3] = x
      initialPositions[i * 3 + 1] = y
      initialPositions[i * 3 + 2] = z

      const t = Math.random()
      if (t < 0.33) {
        colors[i * 3] = 0.4; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 0.95
      } else if (t < 0.66) {
        colors[i * 3] = 0.08; colors[i * 3 + 1] = 0.72; colors[i * 3 + 2] = 0.65
      } else {
        colors[i * 3] = 0.55; colors[i * 3 + 1] = 0.36; colors[i * 3 + 2] = 0.96
      }
    }

    return { positions, colors, initialPositions }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    const scroll = scrollRef.current
    const mouse = mouseRef.current
    const posAttr = meshRef.current.geometry.attributes.position
    const array = posAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const ix = initialPositions[i3]
      const iy = initialPositions[i3 + 1]
      const iz = initialPositions[i3 + 2]

      const waveX = Math.sin(time * 0.5 + iy * 0.1) * (2 + scroll * 5)
      const waveY = Math.cos(time * 0.3 + ix * 0.1) * (2 + scroll * 5)
      const waveZ = Math.sin(time * 0.4 + (ix + iy) * 0.05) * (2 + scroll * 3)

      const angle = scroll * Math.PI * 4 + Math.atan2(iy, ix)
      const radius = Math.sqrt(ix * ix + iy * iy)
      const spiralX = Math.cos(angle) * radius * (1 + scroll * 0.5)
      const spiralY = Math.sin(angle) * radius * (1 + scroll * 0.5)

      const dx = mouse.x * 10 - ix
      const dy = mouse.y * 10 - iy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const force = Math.max(0, 1 - dist / 15) * 3

      array[i3] = ix + waveX + (spiralX - ix) * scroll * 0.3 + dx * force * 0.1
      array[i3 + 1] = iy + waveY + (spiralY - iy) * scroll * 0.3 + dy * force * 0.1
      array[i3 + 2] = iz + waveZ - scroll * 20
    }

    posAttr.needsUpdate = true
    meshRef.current.rotation.y = time * 0.05 + scroll * Math.PI
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

// Morphing sphere — lower poly (was 128x128)
function MorphingSphere({
  scrollRef,
  mouseRef,
}: {
  scrollRef: React.MutableRefObject<number>
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    const scroll = scrollRef.current
    const mouse = mouseRef.current

    meshRef.current.position.x = Math.sin(scroll * Math.PI * 2) * 5 + mouse.x * 2
    meshRef.current.position.y = Math.cos(scroll * Math.PI) * 3 + mouse.y * 2
    meshRef.current.position.z = -5 + scroll * 10

    const scale = 2 + Math.sin(scroll * Math.PI) * 1.5
    meshRef.current.scale.setScalar(scale)

    meshRef.current.rotation.x = time * 0.2 + scroll * 2
    meshRef.current.rotation.y = time * 0.3 + scroll * 3
  })

  return (
    <Sphere ref={meshRef} args={[1, 48, 48]} position={[0, 0, -5]}>
      <MeshDistortMaterial
        color="#6366f1"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.7}
        emissive="#6366f1"
        emissiveIntensity={0.3}
      />
    </Sphere>
  )
}

// Orbiting shapes
function OrbitingShapes({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const shapes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i / 8) * Math.PI * 2,
      radius: 6 + (i % 3) * 2,
      speed: 0.2 + (i * 0.04),
      type: i % 4,
      color: ["#6366f1", "#14b8a6", "#8b5cf6", "#f59e0b"][i % 4],
      scale: 0.3 + (i % 3) * 0.15,
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const scroll = scrollRef.current
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1 + scroll * Math.PI * 2
    groupRef.current.rotation.x = scroll * Math.PI * 0.5
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape) => (
        <OrbitingShape key={shape.id} {...shape} scrollRef={scrollRef} />
      ))}
    </group>
  )
}

function OrbitingShape({
  angle,
  radius,
  speed,
  type,
  color,
  scale,
  scrollRef,
}: {
  angle: number
  radius: number
  speed: number
  type: number
  color: string
  scale: number
  scrollRef: React.MutableRefObject<number>
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    const scroll = scrollRef.current
    const currentAngle = angle + time * speed + scroll * Math.PI * 2
    const currentRadius = radius * (1 + scroll * 0.5)

    meshRef.current.position.x = Math.cos(currentAngle) * currentRadius
    meshRef.current.position.y = Math.sin(time * 0.5 + angle) * 2 + scroll * 5
    meshRef.current.position.z = Math.sin(currentAngle) * currentRadius

    meshRef.current.rotation.x = time * 0.5
    meshRef.current.rotation.y = time * 0.3

    const dynamicScale = scale * (1 + Math.sin(time + angle) * 0.2)
    meshRef.current.scale.setScalar(dynamicScale)
  })

  const ShapeComponent = [Box, Octahedron, Icosahedron, TorusKnot][type]

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <ShapeComponent ref={meshRef} args={(type === 3 ? [0.5, 0.2, 32, 8] : [1]) as any}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={color} emissiveIntensity={0.4} />
      </ShapeComponent>
    </Float>
  )
}

// DNA Helix — reduced sphere count and merged into fewer draw calls
function DNAHelix({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const sphereCount = 24 // was 40

  useFrame((state) => {
    if (!groupRef.current) return
    const scroll = scrollRef.current
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.3 + scroll * Math.PI * 4
    groupRef.current.position.x = -8 + scroll * 16
    groupRef.current.position.y = scroll * 10 - 5
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: sphereCount }, (_, i) => {
        const y = (i - sphereCount / 2) * 0.5
        const angle1 = i * 0.4
        const angle2 = angle1 + Math.PI
        const radius = 1.5

        return (
          <group key={i}>
            <DNASphere
              position={[Math.cos(angle1) * radius, y, Math.sin(angle1) * radius]}
              color="#6366f1"
              index={i}
              scrollRef={scrollRef}
            />
            <DNASphere
              position={[Math.cos(angle2) * radius, y, Math.sin(angle2) * radius]}
              color="#14b8a6"
              index={i}
              scrollRef={scrollRef}
            />
            {i % 4 === 0 && (
              <mesh position={[0, y, 0]} rotation={[0, angle1, Math.PI / 2]}>
                <cylinderGeometry args={[0.02, 0.02, radius * 2, 6]} />
                <meshStandardMaterial
                  color="#8b5cf6"
                  transparent
                  opacity={0.6}
                  emissive="#8b5cf6"
                  emissiveIntensity={0.5}
                />
              </mesh>
            )}
          </group>
        )
      })}
    </group>
  )
}

function DNASphere({
  position,
  color,
  index,
  scrollRef,
}: {
  position: [number, number, number]
  color: string
  index: number
  scrollRef: React.MutableRefObject<number>
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const scroll = scrollRef.current
    const scale = 0.15 + Math.sin(state.clock.elapsedTime * 2 + index * 0.2) * 0.05
    meshRef.current.scale.setScalar(scale * (1 + scroll * 0.5))
  })

  return (
    <Sphere ref={meshRef} args={[1, 10, 10]} position={position}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
    </Sphere>
  )
}

// Wireframe tunnel
function WireframeTunnel({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const ringCount = 14 // was 20

  useFrame((state) => {
    if (!groupRef.current) return
    const scroll = scrollRef.current
    groupRef.current.position.z = scroll * -30
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        child.rotation.z = state.clock.elapsedTime * 0.2 + i * 0.1
        const s = 1 + Math.sin(state.clock.elapsedTime + i * 0.3) * 0.1
        child.scale.setScalar(s)
      }
    })
  })

  return (
    <group ref={groupRef} position={[0, 0, 20]}>
      {Array.from({ length: ringCount }, (_, i) => (
        <Torus
          key={i}
          args={[3 + i * 0.5, 0.02, 8, 64]}
          position={[0, 0, -i * 3]}
          rotation={[Math.PI / 2, 0, i * 0.2]}
        >
          <meshStandardMaterial
            color={i % 2 === 0 ? "#6366f1" : "#14b8a6"}
            transparent
            opacity={0.6 - i * 0.02}
            emissive={i % 2 === 0 ? "#6366f1" : "#14b8a6"}
            emissiveIntensity={0.5}
          />
        </Torus>
      ))}
    </group>
  )
}

// Glass crystal — replaced MeshTransmissionMaterial with cheaper alternative
function GlassCrystal({
  scrollRef,
  mouseRef,
}: {
  scrollRef: React.MutableRefObject<number>
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    const scroll = scrollRef.current
    const mouse = mouseRef.current

    meshRef.current.position.x = mouse.x * 5
    meshRef.current.position.y = mouse.y * 3 + Math.sin(time) * 0.5
    meshRef.current.position.z = -2 + scroll * 5

    meshRef.current.rotation.x = time * 0.3 + mouse.y
    meshRef.current.rotation.y = time * 0.5 + mouse.x

    const scale = 1.5 + scroll * 1
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <Icosahedron ref={meshRef} args={[1, 0]} position={[0, 0, -2]}>
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.95}
        roughness={0.05}
        transparent
        opacity={0.75}
        emissive="#6366f1"
        emissiveIntensity={0.2}
        wireframe={false}
      />
    </Icosahedron>
  )
}

// Energy beams
function EnergyBeams({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const beamCount = 12
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const scroll = scrollRef.current
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.1 + scroll * Math.PI
  })

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {Array.from({ length: beamCount }, (_, i) => (
        <EnergyBeam key={i} index={i} total={beamCount} scrollRef={scrollRef} />
      ))}
    </group>
  )
}

function EnergyBeam({
  index,
  total,
  scrollRef,
}: {
  index: number
  total: number
  scrollRef: React.MutableRefObject<number>
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const angle = (index / total) * Math.PI * 2

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    const scroll = scrollRef.current
    const length = 15 + Math.sin(time * 2 + index) * 5 + scroll * 10

    meshRef.current.scale.y = length
    meshRef.current.position.x = Math.cos(angle + time * 0.2) * (3 + scroll * 2)
    meshRef.current.position.y = Math.sin(angle + time * 0.2) * (3 + scroll * 2)
  })

  return (
    <mesh ref={meshRef} rotation={[0, 0, angle + Math.PI / 2]}>
      <boxGeometry args={[0.03, 1, 0.03]} />
      <meshStandardMaterial
        color={index % 2 === 0 ? "#6366f1" : "#14b8a6"}
        emissive={index % 2 === 0 ? "#6366f1" : "#14b8a6"}
        emissiveIntensity={1}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// Scene — camera driven by refs, no state
function Scene({
  scrollRef,
  mouseRef,
}: {
  scrollRef: React.MutableRefObject<number>
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}) {
  const { camera } = useThree()

  useFrame(() => {
    const scroll = scrollRef.current
    const mouse = mouseRef.current
    camera.position.x = mouse.x * 2 + Math.sin(scroll * Math.PI * 2) * 3
    camera.position.y = mouse.y * 1.5 + scroll * 5
    camera.position.z = 15 - scroll * 10
    camera.lookAt(0, scroll * 2, -5)
  })

  return (
    <>
      <color attach="background" args={["#0a0a12"]} />
      <fog attach="fog" args={["#0a0a12", 10, 50]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#14b8a6" />

      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      <ParticleWave scrollRef={scrollRef} mouseRef={mouseRef} />
      <MorphingSphere scrollRef={scrollRef} mouseRef={mouseRef} />
      <OrbitingShapes scrollRef={scrollRef} />
      <DNAHelix scrollRef={scrollRef} />
      <WireframeTunnel scrollRef={scrollRef} />
      <GlassCrystal scrollRef={scrollRef} mouseRef={mouseRef} />
      <EnergyBeams scrollRef={scrollRef} />

      <Environment preset="night" />
    </>
  )
}

// Scroll progress indicator — pure CSS, no React state updates
function ScrollIndicator() {
  const barRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0
      if (barRef.current) barRef.current.style.height = `${pct}%`
      if (textRef.current) textRef.current.textContent = `${Math.round(pct)}%`
    }
    window.addEventListener("scroll", handle, { passive: true })
    return () => window.removeEventListener("scroll", handle)
  }, [])

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="w-1 h-32 bg-border/30 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="w-full bg-gradient-to-b from-primary to-accent rounded-full"
          style={{ height: "0%" }}
        />
      </div>
      <div ref={textRef} className="mt-2 text-xs text-muted-foreground text-center">0%</div>
    </div>
  )
}

export default function ScrollExperience() {
  const scrollRef = useScrollRef()
  const mouseRef = useMouseRef()

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          dpr={Math.min(window.devicePixelRatio, 1.5)}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          frameloop="always"
          performance={{ min: 0.5 }}
        >
          <Scene scrollRef={scrollRef} mouseRef={mouseRef} />
        </Canvas>
      </div>
      <ScrollIndicator />
    </>
  )
}
