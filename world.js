import * as THREE from 'three';

export class VoxelWorld {
 constructor(scene,types){this.scene=scene;this.types=types;this.blocks=new Map();this.geometry=new THREE.BoxGeometry(1,1,1);this.group=new THREE.Group();scene.add(this.group)}
 key(x,y,z){return `${x},${y},${z}`}
 hasBlock(x,y,z){return this.blocks.has(this.key(Math.floor(x),Math.floor(y),Math.floor(z)))}
 setBlock(x,y,z,type){x=Math.floor(x);y=Math.floor(y);z=Math.floor(z);const k=this.key(x,y,z);if(this.blocks.has(k))this.removeBlock(x,y,z);if(!this.types[type])return null;const mesh=new THREE.Mesh(this.geometry,this.types[type].material);mesh.position.set(x+.5,y+.5,z+.5);mesh.castShadow=mesh.receiveShadow=true;mesh.userData={x,y,z,type,kind:'normal'};this.group.add(mesh);this.blocks.set(k,{type,mesh});return mesh}
 removeBlock(x,y,z){const k=this.key(Math.floor(x),Math.floor(y),Math.floor(z)),entry=this.blocks.get(k);if(!entry)return false;this.group.remove(entry.mesh);this.blocks.delete(k);return true}
 clear(){for(const e of this.blocks.values())this.group.remove(e.mesh);this.blocks.clear()}
 generateArena(){
  for(const cx of [-10,10])for(let x=cx-5;x<=cx+5;x++)for(let z=-5;z<=5;z++)if((x-cx)**2+z*z<=30)this.setBlock(x,0,z,1);
  for(let x=-7;x<=7;x++)for(let z=-1;z<=1;z++)if(Math.abs(x)<7)this.setBlock(x,0,z,2);
  for(let x=-4;x<=4;x++)for(let z=-4;z<=4;z++)if(Math.abs(x)+Math.abs(z)<=6)this.setBlock(x,0,z,3);
  for(const cx of [-10,10])for(let y=1;y<=4;y++)for(let z of [-5,5])this.setBlock(cx,y,z,4);
  for(let y=1;y<=3;y++)this.setBlock(0,y,0,2);this.setBlock(0,4,0,5);
  for(const [cx,cz] of [[-10,-4],[-10,4],[10,-4],[10,4]]){this.setBlock(cx,1,cz,3);this.setBlock(cx,2,cz,5)}
 }
}
