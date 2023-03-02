import { Canvas, useLoader } from "@react-three/fiber";
// import * as THREE from "three"
import { OrbitControls, useFBX, Html, useProgress, Environment } from "@react-three/drei";
import { Suspense, useState } from "react";
import { FBXLoader } from "three-stdlib";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import ReactThreeFbxViewer from 'react-three-fbx-viewer'
import * as material from "@mui/material";
import { useTransition } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { LinearProgress } from "@material-ui/core";
import Forgltf from "./Forgltf";
function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
}
const ThreeDRenderer = ({ src, className, type }) => {
    const canvas = document.querySelector("Canvas")
    const [gltfscene, setGltfScene] = useState()
    const [isPending, startTransition] = useTransition();
    const [FBX, setFBX] = useState({});
    // const gui = new dat.GUI()

    // const [scale,setScale] = useState();
    // let fbx = useFBX(src);
    useEffect(() => {
        if (type === "fbx") {
            startTransition(() =>
                void new FBXLoader().load(src, setFBX), [src]
            )
        }
    }, [src, type])


  
    const appCtx = useSelector((state) => state.app);
    // const gltf = useLoader(GLTFLoader, "/adamHead.gltf");
    function ThreeD() {
        const fbx = useFBX(src);
        return <primitive object={fbx} scale={0.1} />;
    }
    return (
        <>
            {isPending ? (
                <View className="flex flex-col justify-center items-center h-[200px] w-[100%]  ">
                    <Text className="mb-[20px]">Loading...</Text>
                    {/* <LinearProgress color="primary" style={{ width: "80%" }} /> */}
                </View>
            ) : (
                
                type === "fbx" ?
                    <View className={`${className}`}>
                        <Canvas camera={{ fov: 75, position: [300, 150, 300] }}>
                            <Suspense fallback={null}>
                                <ambientLight intensity={0.5} />
                                <directionalLight position={[10, 10, 2]} intensity={1.5} />
                                <primitive object={FBX} sclae={0.5} dispose={null} />
                                <OrbitControls enablePan={true} enableRotate={true} enableZoom={true} />
                            </Suspense>
                        </Canvas>
                    </View>
                    :
                    (type ==="gltf" || type ==="glb") &&
                    <View className={`h-[100%]`}>
                        <Forgltf src={src}/>
                    </View>
            )}
        </>
    );
};

export default ThreeDRenderer;