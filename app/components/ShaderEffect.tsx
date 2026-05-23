"use client";

import {
  Shader,
  Ascii,
  BrightnessContrast,
  Grayscale,
  GridDistortion,
  ImageTexture,
  SolidColor,
} from "shaders/react";

export default function ShaderEffect() {
  return (
    <Shader>
      <SolidColor color="#000000" visible={true} />
      <Ascii
        alphaThreshold={1}
        cellSize={8}
        characters="~%#*+=-:."
        fontFamily="Geist Mono"
        gamma={0.25}
        spacing={{
          type: "auto-animate",
          mode: "ping-pong",
          outputMin: 0.65,
          outputMax: 0.95,
          speed: 1,
        }}
        visible={true}
      >
        <BrightnessContrast
          brightness={{
            type: "auto-animate",
            mode: "ping-pong",
            outputMin: 0.02,
            outputMax: 0.07,
            speed: 1,
            easing: "quad",
          }}
          contrast={0.25}
          transform={{ offsetX: -0.05 }}
        >
          <ImageTexture
            transform={{
              anchorY: 0.89,
              rotation: 360,
              scale: 1.22,
            }}
            url="https://data.shaders.com/storage/v1/object/public/user-uploaded-images/user_3D5TyofLU0xsdJTuyVUcJwVBWgX/nST5WgMTzOfM.png"
            visible={true}
          />
        </BrightnessContrast>
      </Ascii>
      <BrightnessContrast
        blendMode="hardLight"
        brightness={1}
        contrast={1}
        visible={true}
      />
      <GridDistortion intensity={0.3} radius={1.3} />
      <Grayscale />
    </Shader>
  );
}
