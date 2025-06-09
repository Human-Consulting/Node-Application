import { useState, useMemo } from 'react';
import { ShaderGradient, ShaderGradientCanvas } from 'shadergradient';

const Shader = ({animate, color1, color2, color3, index}) => {

    const urlString = useMemo(() => {
        const params = new URLSearchParams({
            axesHelper: 'off',
            bgColor1: '#000000',
            bgColor2: '#000000',
            brightness: '1.2',
            cAzimuthAngle: '180',
            cDistance: '2.8',
            cPolarAngle: '80',
            cameraZoom: '8.3',
            color1,
            color2,
            color3,
            destination: 'onCanvas',
            embedMode: 'off',
            envPreset: 'city',
            format: 'gif',
            fov: '60',
            frameRate: '10',
            gizmoHelper: 'hide',
            grain: 'on',
            lightType: '3d',
            pixelDensity: '2.4',
            positionX: '-1.3',
            positionY: '0',
            positionZ: '0',
            range: 'enabled',
            rangeEnd: '40',
            rangeStart: '0',
            reflection: '0.1',
            rotationX: '40',
            rotationY: '170',
            rotationZ: '-60',
            shader: 'defaults',
            type: 'sphere',
            uAmplitude: '1.7',
            uDensity: '1.2',
            uFrequency: '0',
            uSpeed: animate ? '0.1' : '0.0',
            uStrength: '2.1',
            uTime: '8',
            wireframe: 'false',
            zoomOut: 'true',
        });

        return `https://www.shadergradient.co/customize?${params.toString()}`;
    }, [color1, color2, color3, animate]);

    return (
            <ShaderGradientCanvas
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: index,
                    pointerEvents: 'none'
                }}
            >
                <ShaderGradient key={urlString} control="query" urlString={urlString} />
            </ShaderGradientCanvas>
    );
}

export default Shader;