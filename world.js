import * as THREE from 'three';

export class VoxelWorld {
  constructor(scene,blockTypes){this.scene=scene;this.blockTypes=blockTypes;this.blocks=new Map();this.geometry=new THREE.BoxGeometry(1,1,1);this.group=new THREE.Group();scene.add(this.group)}
  key(x,y,z){return `${x},${y},${z}`}
  hasBlock(x,y,z){return this.blocks.has(this.key(Math.floor(x),Math.floor(y),Math.floor(z)))}
  setBlock(x,y,z,type){x=Math.floor(x);y=Math.floor(y);z=Math.floor(z);const k=this.key(x,y,z);if(this.blocks.has(k))this.removeBlock(x,y,z);if(!type||!this.blockTypes[type])return;const mesh=new THREE.Mesh(this.geometry,this.blockTypes[type].material);mesh.position.set(x+.5,y+.5,z+.5);mesh.castShadow=mesh.receiveShadow=true;mesh.userData={voxel:true,x,y,z,type,kind:'normal',hp:1};this.group.add(mesh);this.blocks.set(k,{type,mesh});return mesh}
  removeBlock(x,y,z){x=Math.floor(x);y=Math.floor(y);z=Math.floor(z);const k=this.key(x,y,z),entry=this.blocks.get(k);if(!entry)return false;this.group.remove(entry.mesh);this.blocks.delete(k);return true}
  clear(){for(const entry of this.blocks.values())this.group.remove(entry.mesh);this.blocks.clear()}
  generateBedWarsArena(){
    for(let x=-13;x<=-7;x++)for(let z=-5;z<=5;z++){if((x+10)*(x+10)+(z*z)>36)continue;this.setBlock(x,0,z,1)}
    for(let x=7;x<=13;x++)for(let z=-5;z<=5;z++){if((x-10)*(x-10)+(z*z)>36)continue;this.setBlock(x,0,z,1)}
    for(let x=-6;x<=6;x++)for(let z=-1;z<=1;z++)this.setBlock(x,0,z,2);
    for(let x=-4;x<=4;x++)for(let z=-4;z<=4;z++)if(Math.abs(x)+Math.abs(z)<6)this.setBlock(x,0,z,3);
    for(const cx of [-10,10])for(let y=1;y<=4;y++)for(let dz=-1;dz<=1;dz++){this.setBlock(cx,y,dz,y===4?5:2)}
  }
}
