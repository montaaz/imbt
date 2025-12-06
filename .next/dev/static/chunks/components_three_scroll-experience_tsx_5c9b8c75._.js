(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/three/scroll-experience.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollExperience
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Float$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Float.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$MeshDistortMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/MeshDistortMaterial.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$MeshTransmissionMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/MeshTransmissionMaterial.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Environment.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$shapes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/shapes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Stars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Stars.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Global scroll progress
function useScrollProgress() {
    _s();
    const [scrollProgress, setScrollProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useScrollProgress.useEffect": ()=>{
            const handleScroll = {
                "useScrollProgress.useEffect.handleScroll": ()=>{
                    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = window.scrollY / scrollHeight;
                    setScrollProgress(progress);
                }
            }["useScrollProgress.useEffect.handleScroll"];
            window.addEventListener("scroll", handleScroll, {
                passive: true
            });
            return ({
                "useScrollProgress.useEffect": ()=>window.removeEventListener("scroll", handleScroll)
            })["useScrollProgress.useEffect"];
        }
    }["useScrollProgress.useEffect"], []);
    return scrollProgress;
}
_s(useScrollProgress, "mI/zHsdmTwVZEMJ2l0wkvaaiYnI=");
// Mouse tracking
function useMousePosition() {
    _s1();
    const [mouse, setMouse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMousePosition.useEffect": ()=>{
            const handleMouseMove = {
                "useMousePosition.useEffect.handleMouseMove": (e)=>{
                    setMouse({
                        x: e.clientX / window.innerWidth * 2 - 1,
                        y: -(e.clientY / window.innerHeight) * 2 + 1
                    });
                }
            }["useMousePosition.useEffect.handleMouseMove"];
            window.addEventListener("mousemove", handleMouseMove);
            return ({
                "useMousePosition.useEffect": ()=>window.removeEventListener("mousemove", handleMouseMove)
            })["useMousePosition.useEffect"];
        }
    }["useMousePosition.useEffect"], []);
    return mouse;
}
_s1(useMousePosition, "KHDt/qhKJmsmDSdOGQVR96nxAws=");
// Massive particle wave system
function ParticleWave({ scrollProgress, mouse }) {
    _s2();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const count = 15000;
    const { positions, colors, initialPositions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ParticleWave.useMemo": ()=>{
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);
            const initialPositions = new Float32Array(count * 3);
            for(let i = 0; i < count; i++){
                const x = (Math.random() - 0.5) * 50;
                const y = (Math.random() - 0.5) * 50;
                const z = (Math.random() - 0.5) * 50;
                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;
                initialPositions[i * 3] = x;
                initialPositions[i * 3 + 1] = y;
                initialPositions[i * 3 + 2] = z;
                // Gradient colors: indigo -> teal -> purple
                const t = Math.random();
                if (t < 0.33) {
                    colors[i * 3] = 0.4;
                    colors[i * 3 + 1] = 0.4;
                    colors[i * 3 + 2] = 0.95;
                } else if (t < 0.66) {
                    colors[i * 3] = 0.08;
                    colors[i * 3 + 1] = 0.72;
                    colors[i * 3 + 2] = 0.65;
                } else {
                    colors[i * 3] = 0.55;
                    colors[i * 3 + 1] = 0.36;
                    colors[i * 3 + 2] = 0.96;
                }
            }
            return {
                positions,
                colors,
                initialPositions
            };
        }
    }["ParticleWave.useMemo"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "ParticleWave.useFrame": (state)=>{
            if (!meshRef.current) return;
            const time = state.clock.elapsedTime;
            const positionAttribute = meshRef.current.geometry.attributes.position;
            const array = positionAttribute.array;
            for(let i = 0; i < count; i++){
                const i3 = i * 3;
                const ix = initialPositions[i3];
                const iy = initialPositions[i3 + 1];
                const iz = initialPositions[i3 + 2];
                // Wave effect based on scroll
                const waveX = Math.sin(time * 0.5 + iy * 0.1) * (2 + scrollProgress * 5);
                const waveY = Math.cos(time * 0.3 + ix * 0.1) * (2 + scrollProgress * 5);
                const waveZ = Math.sin(time * 0.4 + (ix + iy) * 0.05) * (2 + scrollProgress * 3);
                // Spiral effect on scroll
                const angle = scrollProgress * Math.PI * 4 + Math.atan2(iy, ix);
                const radius = Math.sqrt(ix * ix + iy * iy);
                const spiralX = Math.cos(angle) * radius * (1 + scrollProgress * 0.5);
                const spiralY = Math.sin(angle) * radius * (1 + scrollProgress * 0.5);
                // Mouse attraction
                const dx = mouse.x * 10 - ix;
                const dy = mouse.y * 10 - iy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const force = Math.max(0, 1 - dist / 15) * 3;
                array[i3] = ix + waveX + (spiralX - ix) * scrollProgress * 0.3 + dx * force * 0.1;
                array[i3 + 1] = iy + waveY + (spiralY - iy) * scrollProgress * 0.3 + dy * force * 0.1;
                array[i3 + 2] = iz + waveZ - scrollProgress * 20;
            }
            positionAttribute.needsUpdate = true;
            meshRef.current.rotation.y = time * 0.05 + scrollProgress * Math.PI;
        }
    }["ParticleWave.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: meshRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferGeometry", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                        attach: "attributes-position",
                        count: count,
                        array: positions,
                        itemSize: 3
                    }, void 0, false, {
                        fileName: "[project]/components/three/scroll-experience.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                        attach: "attributes-color",
                        count: count,
                        array: colors,
                        itemSize: 3
                    }, void 0, false, {
                        fileName: "[project]/components/three/scroll-experience.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
                size: 0.08,
                vertexColors: true,
                transparent: true,
                opacity: 0.9,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false,
                sizeAttenuation: true
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/three/scroll-experience.tsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
_s2(ParticleWave, "pKb5nf1h6IMz2YjW3/QS4lwXho8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = ParticleWave;
// Giant morphing sphere
function MorphingSphere({ scrollProgress, mouse }) {
    _s3();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "MorphingSphere.useFrame": (state)=>{
            if (!meshRef.current) return;
            const time = state.clock.elapsedTime;
            // Position changes with scroll
            meshRef.current.position.x = Math.sin(scrollProgress * Math.PI * 2) * 5 + mouse.x * 2;
            meshRef.current.position.y = Math.cos(scrollProgress * Math.PI) * 3 + mouse.y * 2;
            meshRef.current.position.z = -5 + scrollProgress * 10;
            // Scale based on scroll
            const scale = 2 + Math.sin(scrollProgress * Math.PI) * 1.5;
            meshRef.current.scale.setScalar(scale);
            // Rotation
            meshRef.current.rotation.x = time * 0.2 + scrollProgress * 2;
            meshRef.current.rotation.y = time * 0.3 + scrollProgress * 3;
        }
    }["MorphingSphere.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$shapes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sphere"], {
        ref: meshRef,
        args: [
            1,
            128,
            128
        ],
        position: [
            0,
            0,
            -5
        ],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$MeshDistortMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshDistortMaterial"], {
            color: "#6366f1",
            distort: 0.4 + scrollProgress * 0.4,
            speed: 2 + scrollProgress * 3,
            roughness: 0.1,
            metalness: 0.9,
            transparent: true,
            opacity: 0.7,
            emissive: "#6366f1",
            emissiveIntensity: 0.3 + scrollProgress * 0.5
        }, void 0, false, {
            fileName: "[project]/components/three/scroll-experience.tsx",
            lineNumber: 183,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/three/scroll-experience.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
_s3(MorphingSphere, "/vg1AmA8+P3+Fj0/y210JTVKtL0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = MorphingSphere;
// Orbiting geometric shapes
function OrbitingShapes({ scrollProgress }) {
    _s4();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const shapes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OrbitingShapes.useMemo[shapes]": ()=>{
            return Array.from({
                length: 8
            }, {
                "OrbitingShapes.useMemo[shapes]": (_, i)=>({
                        id: i,
                        angle: i / 8 * Math.PI * 2,
                        radius: 6 + i % 3 * 2,
                        speed: 0.2 + Math.random() * 0.3,
                        type: i % 4,
                        color: [
                            "#6366f1",
                            "#14b8a6",
                            "#8b5cf6",
                            "#f59e0b"
                        ][i % 4],
                        scale: 0.3 + Math.random() * 0.4
                    })
            }["OrbitingShapes.useMemo[shapes]"]);
        }
    }["OrbitingShapes.useMemo[shapes]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "OrbitingShapes.useFrame": (state)=>{
            if (!groupRef.current) return;
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1 + scrollProgress * Math.PI * 2;
            groupRef.current.rotation.x = scrollProgress * Math.PI * 0.5;
        }
    }["OrbitingShapes.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        children: shapes.map((shape)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrbitingShape, {
                ...shape,
                scrollProgress: scrollProgress
            }, shape.id, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 222,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/three/scroll-experience.tsx",
        lineNumber: 220,
        columnNumber: 5
    }, this);
}
_s4(OrbitingShapes, "ZTrDSbYYO1cufhYM8gZssUnMhUY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c2 = OrbitingShapes;
function OrbitingShape({ angle, radius, speed, type, color, scale, scrollProgress }) {
    _s5();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "OrbitingShape.useFrame": (state)=>{
            if (!meshRef.current) return;
            const time = state.clock.elapsedTime;
            const currentAngle = angle + time * speed + scrollProgress * Math.PI * 2;
            const currentRadius = radius * (1 + scrollProgress * 0.5);
            meshRef.current.position.x = Math.cos(currentAngle) * currentRadius;
            meshRef.current.position.y = Math.sin(time * 0.5 + angle) * 2 + scrollProgress * 5;
            meshRef.current.position.z = Math.sin(currentAngle) * currentRadius;
            meshRef.current.rotation.x = time * 0.5;
            meshRef.current.rotation.y = time * 0.3;
            const dynamicScale = scale * (1 + Math.sin(time + angle) * 0.2);
            meshRef.current.scale.setScalar(dynamicScale);
        }
    }["OrbitingShape.useFrame"]);
    const ShapeComponent = [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$shapes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$shapes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Octahedron"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$shapes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icosahedron"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$shapes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusKnot"]
    ][type];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Float$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float"], {
        speed: 2,
        rotationIntensity: 0.5,
        floatIntensity: 0.5,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShapeComponent, {
            ref: meshRef,
            args: type === 3 ? [
                0.5,
                0.2,
                64,
                16
            ] : [
                1
            ],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                color: color,
                metalness: 0.9,
                roughness: 0.1,
                emissive: color,
                emissiveIntensity: 0.4
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 270,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/three/scroll-experience.tsx",
            lineNumber: 269,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/three/scroll-experience.tsx",
        lineNumber: 268,
        columnNumber: 5
    }, this);
}
_s5(OrbitingShape, "/vg1AmA8+P3+Fj0/y210JTVKtL0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c3 = OrbitingShape;
// DNA Helix that transforms with scroll
function DNAHelix({ scrollProgress }) {
    _s6();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sphereCount = 40;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "DNAHelix.useFrame": (state)=>{
            if (!groupRef.current) return;
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.3 + scrollProgress * Math.PI * 4;
            groupRef.current.position.x = -8 + scrollProgress * 16;
            groupRef.current.position.y = scrollProgress * 10 - 5;
        }
    }["DNAHelix.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        children: Array.from({
            length: sphereCount
        }, (_, i)=>{
            const y = (i - sphereCount / 2) * 0.5;
            const angle1 = i * 0.4;
            const angle2 = angle1 + Math.PI;
            const radius = 1.5;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DNASphere, {
                        position: [
                            Math.cos(angle1) * radius,
                            y,
                            Math.sin(angle1) * radius
                        ],
                        color: "#6366f1",
                        index: i,
                        scrollProgress: scrollProgress
                    }, void 0, false, {
                        fileName: "[project]/components/three/scroll-experience.tsx",
                        lineNumber: 298,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DNASphere, {
                        position: [
                            Math.cos(angle2) * radius,
                            y,
                            Math.sin(angle2) * radius
                        ],
                        color: "#14b8a6",
                        index: i,
                        scrollProgress: scrollProgress
                    }, void 0, false, {
                        fileName: "[project]/components/three/scroll-experience.tsx",
                        lineNumber: 304,
                        columnNumber: 13
                    }, this),
                    i % 4 === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            y,
                            0
                        ],
                        rotation: [
                            0,
                            angle1,
                            Math.PI / 2
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                                args: [
                                    0.02,
                                    0.02,
                                    radius * 2,
                                    8
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/three/scroll-experience.tsx",
                                lineNumber: 312,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: "#8b5cf6",
                                transparent: true,
                                opacity: 0.6,
                                emissive: "#8b5cf6",
                                emissiveIntensity: 0.5
                            }, void 0, false, {
                                fileName: "[project]/components/three/scroll-experience.tsx",
                                lineNumber: 313,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/three/scroll-experience.tsx",
                        lineNumber: 311,
                        columnNumber: 15
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 297,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/three/scroll-experience.tsx",
        lineNumber: 289,
        columnNumber: 5
    }, this);
}
_s6(DNAHelix, "6IJMYK8+MXZFwT7izzQ7Jqot7FY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c4 = DNAHelix;
function DNASphere({ position, color, index, scrollProgress }) {
    _s7();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "DNASphere.useFrame": (state)=>{
            if (!meshRef.current) return;
            const scale = 0.15 + Math.sin(state.clock.elapsedTime * 2 + index * 0.2) * 0.05;
            meshRef.current.scale.setScalar(scale * (1 + scrollProgress * 0.5));
        }
    }["DNASphere.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$shapes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sphere"], {
        ref: meshRef,
        args: [
            1,
            16,
            16
        ],
        position: position,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
            color: color,
            emissive: color,
            emissiveIntensity: 0.8,
            metalness: 0.9,
            roughness: 0.1
        }, void 0, false, {
            fileName: "[project]/components/three/scroll-experience.tsx",
            lineNumber: 350,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/three/scroll-experience.tsx",
        lineNumber: 349,
        columnNumber: 5
    }, this);
}
_s7(DNASphere, "/vg1AmA8+P3+Fj0/y210JTVKtL0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c5 = DNASphere;
// Wireframe tunnel effect
function WireframeTunnel({ scrollProgress }) {
    _s8();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ringCount = 20;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "WireframeTunnel.useFrame": (state)=>{
            if (!groupRef.current) return;
            groupRef.current.position.z = scrollProgress * -30;
            groupRef.current.children.forEach({
                "WireframeTunnel.useFrame": (child, i)=>{
                    if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"]) {
                        child.rotation.z = state.clock.elapsedTime * 0.2 + i * 0.1;
                        const scale = 1 + Math.sin(state.clock.elapsedTime + i * 0.3) * 0.1;
                        child.scale.setScalar(scale);
                    }
                }
            }["WireframeTunnel.useFrame"]);
        }
    }["WireframeTunnel.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        position: [
            0,
            0,
            20
        ],
        children: Array.from({
            length: ringCount
        }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$shapes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Torus"], {
                args: [
                    3 + i * 0.5,
                    0.02,
                    16,
                    100
                ],
                position: [
                    0,
                    0,
                    -i * 3
                ],
                rotation: [
                    Math.PI / 2,
                    0,
                    i * 0.2
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                    color: i % 2 === 0 ? "#6366f1" : "#14b8a6",
                    transparent: true,
                    opacity: 0.6 - i * 0.02,
                    emissive: i % 2 === 0 ? "#6366f1" : "#14b8a6",
                    emissiveIntensity: 0.5
                }, void 0, false, {
                    fileName: "[project]/components/three/scroll-experience.tsx",
                    lineNumber: 381,
                    columnNumber: 11
                }, this)
            }, i, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 375,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/three/scroll-experience.tsx",
        lineNumber: 373,
        columnNumber: 5
    }, this);
}
_s8(WireframeTunnel, "6IJMYK8+MXZFwT7izzQ7Jqot7FY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c6 = WireframeTunnel;
// Glass crystal
function GlassCrystal({ scrollProgress, mouse }) {
    _s9();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "GlassCrystal.useFrame": (state)=>{
            if (!meshRef.current) return;
            const time = state.clock.elapsedTime;
            meshRef.current.position.x = mouse.x * 5;
            meshRef.current.position.y = mouse.y * 3 + Math.sin(time) * 0.5;
            meshRef.current.position.z = -2 + scrollProgress * 5;
            meshRef.current.rotation.x = time * 0.3 + mouse.y;
            meshRef.current.rotation.y = time * 0.5 + mouse.x;
            const scale = 1.5 + scrollProgress * 1;
            meshRef.current.scale.setScalar(scale);
        }
    }["GlassCrystal.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$shapes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icosahedron"], {
        ref: meshRef,
        args: [
            1,
            0
        ],
        position: [
            0,
            0,
            -2
        ],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$MeshTransmissionMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshTransmissionMaterial"], {
            backside: true,
            samples: 16,
            resolution: 256,
            transmission: 0.95,
            roughness: 0.05,
            thickness: 0.5,
            ior: 1.5,
            chromaticAberration: 0.15,
            anisotropy: 0.3,
            distortion: 0.3,
            distortionScale: 0.5,
            temporalDistortion: 0.2,
            color: "#6366f1"
        }, void 0, false, {
            fileName: "[project]/components/three/scroll-experience.tsx",
            lineNumber: 416,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/three/scroll-experience.tsx",
        lineNumber: 415,
        columnNumber: 5
    }, this);
}
_s9(GlassCrystal, "/vg1AmA8+P3+Fj0/y210JTVKtL0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c7 = GlassCrystal;
// Energy beams
function EnergyBeams({ scrollProgress }) {
    _s10();
    const beamCount = 12;
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "EnergyBeams.useFrame": (state)=>{
            if (!groupRef.current) return;
            groupRef.current.rotation.z = state.clock.elapsedTime * 0.1 + scrollProgress * Math.PI;
        }
    }["EnergyBeams.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        position: [
            0,
            0,
            -10
        ],
        children: Array.from({
            length: beamCount
        }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EnergyBeam, {
                index: i,
                total: beamCount,
                scrollProgress: scrollProgress
            }, i, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 448,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/three/scroll-experience.tsx",
        lineNumber: 446,
        columnNumber: 5
    }, this);
}
_s10(EnergyBeams, "6IJMYK8+MXZFwT7izzQ7Jqot7FY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c8 = EnergyBeams;
function EnergyBeam({ index, total, scrollProgress }) {
    _s11();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const angle = index / total * Math.PI * 2;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "EnergyBeam.useFrame": (state)=>{
            if (!meshRef.current) return;
            const time = state.clock.elapsedTime;
            const length = 15 + Math.sin(time * 2 + index) * 5 + scrollProgress * 10;
            meshRef.current.scale.y = length;
            meshRef.current.position.x = Math.cos(angle + time * 0.2) * (3 + scrollProgress * 2);
            meshRef.current.position.y = Math.sin(angle + time * 0.2) * (3 + scrollProgress * 2);
        }
    }["EnergyBeam.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        ref: meshRef,
        rotation: [
            0,
            0,
            angle + Math.PI / 2
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                args: [
                    0.03,
                    1,
                    0.03
                ]
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 471,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                color: index % 2 === 0 ? "#6366f1" : "#14b8a6",
                emissive: index % 2 === 0 ? "#6366f1" : "#14b8a6",
                emissiveIntensity: 1,
                transparent: true,
                opacity: 0.8
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 472,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/three/scroll-experience.tsx",
        lineNumber: 470,
        columnNumber: 5
    }, this);
}
_s11(EnergyBeam, "/vg1AmA8+P3+Fj0/y210JTVKtL0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c9 = EnergyBeam;
// Main scene with camera animation
function Scene({ scrollProgress, mouse }) {
    _s12();
    const { camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "Scene.useFrame": (state)=>{
            // Camera movement based on scroll and mouse
            camera.position.x = mouse.x * 2 + Math.sin(scrollProgress * Math.PI * 2) * 3;
            camera.position.y = mouse.y * 1.5 + scrollProgress * 5;
            camera.position.z = 15 - scrollProgress * 10;
            camera.lookAt(0, scrollProgress * 2, -5);
        }
    }["Scene.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    "#0a0a12"
                ]
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 498,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fog", {
                attach: "fog",
                args: [
                    "#0a0a12",
                    10,
                    50
                ]
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 499,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.2
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 501,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    10,
                    10,
                    10
                ],
                intensity: 2,
                color: "#6366f1"
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 502,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    -10,
                    -10,
                    -10
                ],
                intensity: 1.5,
                color: "#14b8a6"
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 503,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    mouse.x * 10,
                    mouse.y * 10,
                    5
                ],
                intensity: 1,
                color: "#8b5cf6",
                distance: 20
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 504,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Stars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stars"], {
                radius: 100,
                depth: 50,
                count: 5000,
                factor: 4,
                saturation: 0,
                fade: true,
                speed: 1
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 506,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ParticleWave, {
                scrollProgress: scrollProgress,
                mouse: mouse
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 508,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MorphingSphere, {
                scrollProgress: scrollProgress,
                mouse: mouse
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 509,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrbitingShapes, {
                scrollProgress: scrollProgress
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 510,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DNAHelix, {
                scrollProgress: scrollProgress
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 511,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WireframeTunnel, {
                scrollProgress: scrollProgress
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 512,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlassCrystal, {
                scrollProgress: scrollProgress,
                mouse: mouse
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 513,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EnergyBeams, {
                scrollProgress: scrollProgress
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 514,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Environment"], {
                preset: "night"
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 516,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s12(Scene, "K6LkdZnP8OJ6UK0tVtTtxiafG3Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c10 = Scene;
// Scroll progress indicator
function ScrollIndicator({ progress }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-1 h-32 bg-border/30 rounded-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full bg-gradient-to-b from-primary to-accent rounded-full transition-all duration-100",
                    style: {
                        height: `${progress * 100}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/three/scroll-experience.tsx",
                    lineNumber: 526,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 525,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-xs text-muted-foreground text-center",
                children: [
                    Math.round(progress * 100),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 531,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/three/scroll-experience.tsx",
        lineNumber: 524,
        columnNumber: 5
    }, this);
}
_c11 = ScrollIndicator;
function ScrollExperience() {
    _s13();
    const scrollProgress = useScrollProgress();
    const mouse = useMousePosition();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 -z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                    camera: {
                        position: [
                            0,
                            0,
                            15
                        ],
                        fov: 60
                    },
                    dpr: [
                        1,
                        2
                    ],
                    gl: {
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Scene, {
                        scrollProgress: scrollProgress,
                        mouse: mouse
                    }, void 0, false, {
                        fileName: "[project]/components/three/scroll-experience.tsx",
                        lineNumber: 552,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/three/scroll-experience.tsx",
                    lineNumber: 543,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 542,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollIndicator, {
                progress: scrollProgress
            }, void 0, false, {
                fileName: "[project]/components/three/scroll-experience.tsx",
                lineNumber: 555,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s13(ScrollExperience, "diABZ92NlH5S60xq6FYmsJcWqME=", false, function() {
    return [
        useScrollProgress,
        useMousePosition
    ];
});
_c12 = ScrollExperience;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12;
__turbopack_context__.k.register(_c, "ParticleWave");
__turbopack_context__.k.register(_c1, "MorphingSphere");
__turbopack_context__.k.register(_c2, "OrbitingShapes");
__turbopack_context__.k.register(_c3, "OrbitingShape");
__turbopack_context__.k.register(_c4, "DNAHelix");
__turbopack_context__.k.register(_c5, "DNASphere");
__turbopack_context__.k.register(_c6, "WireframeTunnel");
__turbopack_context__.k.register(_c7, "GlassCrystal");
__turbopack_context__.k.register(_c8, "EnergyBeams");
__turbopack_context__.k.register(_c9, "EnergyBeam");
__turbopack_context__.k.register(_c10, "Scene");
__turbopack_context__.k.register(_c11, "ScrollIndicator");
__turbopack_context__.k.register(_c12, "ScrollExperience");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/three/scroll-experience.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/three/scroll-experience.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_three_scroll-experience_tsx_5c9b8c75._.js.map