import { OrbitControls } from "@react-three/drei";
import React from "react";
import { Canvas, useThree } from "react-three-fiber";
import { Quaternion } from "three";

import { useKeyboard } from "../hooks/useKeyboard";

import { getTileByIndex, getTileCount } from "../TileSets";

import "./AdminPage.css";

function DumpCamera() {
  const { camera } = useThree();
  console.log(camera.position, camera.rotation);
  return <></>;
}

interface Props {
  tileIndex: number
}

function TilePreview({ tileIndex }: Props) {
  const { gl } = useThree()

  const onClick = () => {
    const a = document.createElement('a')
    a.href = gl.domElement.toDataURL().replace("image/png", "image/octet-stream")
    a.download = `${getTileByIndex(tileIndex)!.id}.png`
    a.click()
  }

  return (
    <>
    <directionalLight />
    <ambientLight />
    <group 
      onClick={onClick}
      position-y={-1}>
      {getTileByIndex(tileIndex)!.element}
    </group>
      
    <DumpCamera />
    <OrbitControls />
    </>
  )
}

export default function AdminPage() {
  const [tileIndex, setTileIndex] = React.useState(0);

  useKeyboard((event: KeyboardEvent) => {
    const up = event.type === "keyup";

    switch (event.key.toLowerCase()) {
      case "escape":
        setTileIndex(0);
        break;
      case "[":
        up && tileIndex > 0 && setTileIndex(tileIndex - 1);
        break;
      case "]":
        up && tileIndex < getTileCount() - 1 && setTileIndex(tileIndex + 1);
        break;
    }
  });

  return (
    <div className="container">
      <h1>Admin page</h1>
      <h2>Create tile preview bitmap</h2>
      <div className="icon-preview">
        <Canvas
          gl={{ preserveDrawingBuffer: true }}
          camera={{
            position: [-1.3, 3.4, 4.4],
            quaternion: new Quaternion(-0.65, -0.24, -0.18),
          }}
        >
          <TilePreview tileIndex={tileIndex} />
        </Canvas>
      </div>
      <p>Click on tile to download image</p>
    </div>
  );
}
