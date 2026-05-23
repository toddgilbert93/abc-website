"use client";

import {
  Shader,
  Blob,
  CursorRipples,
  FilmGrain,
  Glass,
  SolidColor,
  Swirl,
  WaveDistortion,
} from "shaders/react";

export default function LogoShader() {
  return (
    <Shader>
      <SolidColor color="#000000" />
      <Glass
        center={{
          x: 0.5,
          y: 0.5,
        }}
        cutout={true}
        fresnel={0.24}
        fresnelColor="#f0f6ff"
        fresnelSoftness={0.5}
        highlight={0.1}
        highlightColor="#dbe6ff"
        highlightSoftness={0.27}
        lightAngle={289}
        refraction={0.82}
        scale={2}
        shapeSdfUrl="https://data.shaders.com/storage/v1/object/public/user-uploaded-images/user_3D5TyofLU0xsdJTuyVUcJwVBWgX/lzFuivgXVJx9_sdf.bin"
        thickness={0.37}
        visible={true}
      >
        <Swirl
          blend={45}
          colorA="#ffffff"
          colorB="#4a4a4a"
          colorSpace="oklab"
          detail={2.8}
          speed={2}
        />
        <Blob
          blendMode="linearDodge"
          center={{
            type: "mouse-position",
            reach: 0.55,
            originX: 0.5,
            originY: 0.5,
            momentum: 0.3,
            smoothing: 0.3,
          }}
          colorA="#4e587891"
          colorB="#3b4b6b"
          deformation={0.9}
          size={0.15}
          softness={0.7}
        />
        <WaveDistortion
          angle={214}
          edges="mirror"
          frequency={2.2}
          speed={2.5}
          strength={0.15}
          visible={true}
        />
        <CursorRipples
          chromaticSplit={2}
          decay={6.6}
          intensity={20}
          radius={0.7}
          visible={true}
        />
      </Glass>
      <FilmGrain strength={0.075} visible={true} />
    </Shader>
  );
}
