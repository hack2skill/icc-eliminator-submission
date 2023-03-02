import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useTransition } from "react";
import { View } from "react-native";

const Model = ({ src }) => {

  // let gltf = useGLTF(src);
  // useGLTF.preload(src);
  const [isPending, startTransition] = useTransition();
  const [gltf, setGltf] = useState();
  useEffect(() => {
    try {
      startTransition(() =>
        void new GLTFLoader().load(src, setGltf), [src]
      )
    }
    catch {
      toast('error')
    }
  }, [src])
  // }
  // catch {
  //   toast('texture files are not supported')
  // }
  // useLoader(GLTFLoader, "./gift.glb");

  return (
    <>
      {gltf?.scene && <>
        <directionalLight position={[10, 10, 2]} intensity={1.5} />
        <primitive object={gltf.scene} scale={1.5} />
      </>
      }
    </>
  );
};

export default function Forgltf({ src }) {
  return (
    <View style={{ position: "relative", width: "100%", height: "100%" }}>
      <Suspense fallback={null}>
        <Canvas>
          <Suspense fallback={null}>
            <Model src={src} />
            <OrbitControls />
            {/* <Environment preset="sunset" background /> */}
          </Suspense>
        </Canvas>
      </Suspense>
    </View>
  );
}
//