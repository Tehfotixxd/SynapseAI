"use client"

import { useRef, useEffect, useMemo, useState } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

function AIModel({ setAiResponse, chatInteraction }) {
  const pointsRef = useRef()
  const linesRef = useRef()
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  const particlesCount = 2000
  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3)
    const original = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = Math.sin(phi) * Math.cos(theta)
      const y = Math.sin(phi) * Math.sin(theta)
      const z = Math.cos(phi)
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      original.set(pos.slice(i * 3, i * 3 + 3), i * 3)
    }
    return [pos, original]
  }, [])

  const linePositions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 6)
    for (let i = 0; i < particlesCount; i++) {
      const j = (i + 1) % particlesCount
      pos.set(positions.slice(i * 3, i * 3 + 3), i * 6)
      pos.set(positions.slice(j * 3, j * 3 + 3), i * 6 + 3)
    }
    return pos
  }, [positions])

  const [mouseOver, setMouseOver] = useState(false)
  const [hoverEffect, setHoverEffect] = useState(new Float32Array(particlesCount * 3))

  useEffect(() => {
    const handleMouseMove = (event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }

    const handleMouseEnter = () => setMouseOver(true)
    const handleMouseLeave = () => setMouseOver(false)

    const canvas = document.querySelector("canvas")
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mouse])

  useFrame(({ clock, camera }) => {
    if (pointsRef.current && linesRef.current) {
      const time = clock.getElapsedTime()

      // Animate points to form different shapes continuously
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3
        const shapeProgress = (time % 20) / 20 // Full cycle every 20 seconds

        let targetX, targetY, targetZ

        if (shapeProgress < 0.2) {
          // Sphere
          targetX = originalPositions[i3]
          targetY = originalPositions[i3 + 1]
          targetZ = originalPositions[i3 + 2]
        } else if (shapeProgress < 0.4) {
          // Cube
          targetX = Math.sign(originalPositions[i3])
          targetY = Math.sign(originalPositions[i3 + 1])
          targetZ = Math.sign(originalPositions[i3 + 2])
        } else if (shapeProgress < 0.6) {
          // DNA helix
          const angle = (i / particlesCount) * Math.PI * 20 + time
          targetX = Math.cos(angle) * 0.5
          targetY = (i / particlesCount - 0.5) * 2
          targetZ = Math.sin(angle) * 0.5
        } else if (shapeProgress < 0.8) {
          // Torus
          const u = (i / particlesCount) * Math.PI * 2
          const v = time * 0.1
          const radius = 0.7
          const tubeRadius = 0.3
          targetX = (radius + tubeRadius * Math.cos(v)) * Math.cos(u)
          targetY = (radius + tubeRadius * Math.cos(v)) * Math.sin(u)
          targetZ = tubeRadius * Math.sin(v)
        } else {
          // Spiral
          const spiralAngle = 0.1 * i
          const spiralRadius = 1 - i / particlesCount
          targetX = spiralRadius * Math.cos(spiralAngle)
          targetY = 2 * (i / particlesCount - 0.5)
          targetZ = spiralRadius * Math.sin(spiralAngle)
        }

        // Interpolate between current position and target position
        positions[i3] += (targetX - positions[i3]) * 0.02
        positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.02
        positions[i3 + 2] += (targetZ - positions[i3 + 2]) * 0.02

        // Apply chat interaction effect (reduced intensity)
        if (chatInteraction) {
          const pulseIntensity = Math.sin(time * 3 + i * 0.05) * 0.005
          positions[i3] += pulseIntensity * originalPositions[i3]
          positions[i3 + 1] += pulseIntensity * originalPositions[i3 + 1]
          positions[i3 + 2] += pulseIntensity * originalPositions[i3 + 2]
        }

        // Apply gelatinous effect when mouse is over (reduced intensity)
        if (mouseOver) {
          const distanceToMouse = Math.sqrt(
            Math.pow(positions[i3] - mouse.x, 2) +
              Math.pow(positions[i3 + 1] - mouse.y, 2) +
              Math.pow(positions[i3 + 2], 2),
          )
          const effectIntensity = Math.max(0, 1 - distanceToMouse) * 0.02 // Reduced from 0.2 to 0.05
          hoverEffect[i3] = Math.sin(time * 5 + i * 0.1) * effectIntensity
          hoverEffect[i3 + 1] = Math.sin(time * 5 + i * 0.2) * effectIntensity
          hoverEffect[i3 + 2] = Math.sin(time * 5 + i * 0.3) * effectIntensity

          positions[i3] += hoverEffect[i3]
          positions[i3 + 1] += hoverEffect[i3 + 1]
          positions[i3 + 2] += hoverEffect[i3 + 2]
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true

      // Update lines
      for (let i = 0; i < particlesCount; i++) {
        const j = (i + 1) % particlesCount
        const index = i * 6
        linePositions.set(positions.slice(i * 3, i * 3 + 3), index)
        linePositions.set(positions.slice(j * 3, j * 3 + 3), index + 3)
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true

      // Rotate the entire model
      pointsRef.current.rotation.y += 0.0005
      linesRef.current.rotation.y += 0.0005

      // Change colors over time
      const hue = (time * 0.05) % 1
      const color = new THREE.Color().setHSL(hue, 1, 0.5)
      pointsRef.current.material.color = color
      linesRef.current.material.color = color

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(pointsRef.current)

      if (intersects.length > 0) {
        setAiResponse("SynapseAI core active. Morphing visualization engaged. How may I assist you?")
      } else {
        setAiResponse("")
      }
    }
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.02} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial opacity={0.3} transparent={true} />
      </lineSegments>
    </group>
  )
}

export default function Scene3D({ setAiResponse, chatInteraction }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <color attach="background" args={["#020408"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <AIModel setAiResponse={setAiResponse} chatInteraction={chatInteraction} />
      <OrbitControls enableZoom={true} enablePan={false} />
    </Canvas>
  )
}

