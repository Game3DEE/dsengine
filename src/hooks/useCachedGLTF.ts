import { useLoader, Loader } from "react-three-fiber";
import { Loader as THREELoader } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Hold on to objects, only load GLTF once
const cache = new Map<string,GLTF>()

class CachedLoader extends THREELoader implements Loader<GLTF> {
    load(
        url: string,
        onLoad?: (result: GLTF) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void,
      ): unknown {
        let result = cache.get(url)
        if (!result) {
            const loader = new GLTFLoader(this.manager)
            return loader.load(url, result => {
                cache.set(url, result)
                console.log(`Loaded GLTF ${url}`)
                onLoad && onLoad(result)
            }, onProgress, onError);
        }

        onLoad && onLoad(result)
      }
}


export function useCachedGLTF(path: string) {
    return useLoader(CachedLoader, path);
}
