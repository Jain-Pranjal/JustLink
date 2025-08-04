"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export function DynamicGradient() {
    return (
        <MeshGradient
            colors={["#001c80", "#1ac7ff", "#04ffb1", "#ff1ff1"]}
            speed={0.7}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
            }}
        />
    )
}


// default: ["#001c80", "#1ac7ff", "#04ffb1", "#ff1ff1"],
//   sunset: ["#ff6b6b", "#feca57", "#ff9ff3", "#54a0ff"],
//   ocean: ["#0066cc", "#00d4ff", "#0099ff", "#66ccff"],
//   forest: ["#2d5016", "#68b738", "#a8e6cf", "#88d8a3"],
//   dark: ["#1a1a2e", "#16213e", "#0f3460", "#533483"],
