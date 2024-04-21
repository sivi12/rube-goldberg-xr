import React from "react";
import { useConvexPolyhedron } from "@react-three/cannon";
import { BufferGeometry, Float32BufferAttribute, Vector3 } from "three";

function Ramp({ position }) {
  // Vertices of a triangular prism
  const vertices = [
    [-1, 0, 1], // Vertex 0
    [1, 0, 1], // Vertex 1
    [1, 0, -1], // Vertex 2
    [-1, 0, -1], // Vertex 3
    [0, 1, 0], // Vertex 4 (Top vertex in the middle)
  ].flat(); // Flatten the array for BufferAttribute usage

  // Indices (faces) of the triangular prism
  const indices = [
    0,
    1,
    4, // Front face
    1,
    2,
    4, // Right face
    2,
    3,
    4, // Back face
    3,
    0,
    4, // Left face
    0,
    3,
    2,
    1, // Bottom face (quad decomposed into two triangles)
  ];

  const [ref] = useConvexPolyhedron(() => ({
    mass: 0,
    vertices: vertices.map(
      (v, i) =>
        new Vector3(vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2])
    ),
    faces: [
      [0, 1, 4],
      [1, 2, 4],
      [2, 3, 4],
      [3, 0, 4],
      [0, 3, 2],
      [2, 1, 0],
    ],
    position,
    material: {
      friction: 0.5,
      restitution: 0.1,
    },
  }));

  return (
    <mesh ref={ref}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={vertices.length / 3}
          array={new Float32Array(vertices)}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={["attributes", "index"]}
          count={indices.length}
          array={new Uint16Array(indices)}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

export default Ramp;
