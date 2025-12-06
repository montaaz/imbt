(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/three/custom-cursor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomCursor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function CustomCursor() {
    _s();
    const cursorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cursorDotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cursorRingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isHovering, setIsHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isClicking, setIsClicking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomCursor.useEffect": ()=>{
            // Only show custom cursor on desktop
            if (("TURBOPACK compile-time value", "object") !== "undefined" && window.innerWidth < 1024) return;
            const cursor = cursorRef.current;
            const dot = cursorDotRef.current;
            const ring = cursorRingRef.current;
            if (!cursor || !dot || !ring) return;
            let mouseX = 0;
            let mouseY = 0;
            let dotX = 0;
            let dotY = 0;
            let ringX = 0;
            let ringY = 0;
            const handleMouseMove = {
                "CustomCursor.useEffect.handleMouseMove": (e)=>{
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                }
            }["CustomCursor.useEffect.handleMouseMove"];
            const handleMouseDown = {
                "CustomCursor.useEffect.handleMouseDown": ()=>setIsClicking(true)
            }["CustomCursor.useEffect.handleMouseDown"];
            const handleMouseUp = {
                "CustomCursor.useEffect.handleMouseUp": ()=>setIsClicking(false)
            }["CustomCursor.useEffect.handleMouseUp"];
            // Track hoverable elements
            const handleMouseOver = {
                "CustomCursor.useEffect.handleMouseOver": (e)=>{
                    const target = e.target;
                    if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button") || target.classList.contains("hoverable")) {
                        setIsHovering(true);
                    }
                }
            }["CustomCursor.useEffect.handleMouseOver"];
            const handleMouseOut = {
                "CustomCursor.useEffect.handleMouseOut": ()=>setIsHovering(false)
            }["CustomCursor.useEffect.handleMouseOut"];
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mousedown", handleMouseDown);
            window.addEventListener("mouseup", handleMouseUp);
            document.addEventListener("mouseover", handleMouseOver);
            document.addEventListener("mouseout", handleMouseOut);
            // Animation loop
            const animate = {
                "CustomCursor.useEffect.animate": ()=>{
                    // Smooth follow for dot
                    dotX += (mouseX - dotX) * 0.2;
                    dotY += (mouseY - dotY) * 0.2;
                    // Slower follow for ring
                    ringX += (mouseX - ringX) * 0.08;
                    ringY += (mouseY - ringY) * 0.08;
                    if (dot) {
                        dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
                    }
                    if (ring) {
                        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
                    }
                    requestAnimationFrame(animate);
                }
            }["CustomCursor.useEffect.animate"];
            animate();
            // Hide default cursor
            document.body.style.cursor = "none";
            return ({
                "CustomCursor.useEffect": ()=>{
                    window.removeEventListener("mousemove", handleMouseMove);
                    window.removeEventListener("mousedown", handleMouseDown);
                    window.removeEventListener("mouseup", handleMouseUp);
                    document.removeEventListener("mouseover", handleMouseOver);
                    document.removeEventListener("mouseout", handleMouseOut);
                    document.body.style.cursor = "auto";
                }
            })["CustomCursor.useEffect"];
        }
    }["CustomCursor.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cursorRef,
        className: "hidden lg:block pointer-events-none fixed inset-0 z-[9999]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: cursorDotRef,
                className: `fixed top-0 left-0 rounded-full transition-all duration-150 ${isClicking ? "w-3 h-3 bg-accent" : isHovering ? "w-4 h-4 bg-primary mix-blend-difference" : "w-2 h-2 bg-foreground"}`,
                style: {
                    willChange: "transform"
                }
            }, void 0, false, {
                fileName: "[project]/components/three/custom-cursor.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: cursorRingRef,
                className: `fixed top-0 left-0 rounded-full border-2 transition-all duration-300 ${isClicking ? "w-16 h-16 border-accent opacity-50" : isHovering ? "w-16 h-16 border-primary opacity-80" : "w-10 h-10 border-foreground/30 opacity-100"}`,
                style: {
                    willChange: "transform"
                }
            }, void 0, false, {
                fileName: "[project]/components/three/custom-cursor.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: (el)=>{
                    if (el && cursorDotRef.current) {
                    // Follow the dot position for glow
                    }
                },
                className: `fixed top-0 left-0 rounded-full blur-xl transition-all duration-200 pointer-events-none ${isHovering ? "w-20 h-20 bg-primary/30" : "w-8 h-8 bg-primary/20"}`,
                style: {
                    transform: cursorDotRef.current?.style.transform,
                    willChange: "transform"
                }
            }, void 0, false, {
                fileName: "[project]/components/three/custom-cursor.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/three/custom-cursor.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_s(CustomCursor, "XtrwqW+OrzycKy8c60M55qKtouc=");
_c = CustomCursor;
var _c;
__turbopack_context__.k.register(_c, "CustomCursor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/three/custom-cursor.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/three/custom-cursor.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_three_custom-cursor_tsx_547a9f8d._.js.map