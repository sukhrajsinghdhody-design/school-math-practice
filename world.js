import * as THREE from 'three';

export class VoxelWorld {
  constructor(scene, blockTypes) {this.scene=scene;this.blockTypes=blockTypes;this.blocks=new Map();this.geometry=new THREE.BoxGeometry(1,1,1);this.group=new THREE.Group();scene.add(this.group);}
  key(x,y,z){return `${x},${y},${z}`}
  hasBlock(x,y,z){return this.blocks.has(this.key(Math.floor(x),Math.floor(y),Math.floor(z)))}
  setBlock(x,y,z,type){x=Math.floor(x);y=Math.floor(y);z=Math.floor(z);const k=this.key(x,y,z);if(this.blocks.has(k))this.removeBlock(x,y,z);if(!type||!this.blockTypes[type])return;const mesh=new THREE.Mesh(this.geometry,this.blockTypes[type].material);mesh.position.set(x+.5,y+.5,z+.5);mesh.castShadow=mesh.receiveShadow=true;mesh.userData={voxel:true,x,y,z,type};this.group.add(mesh);this.blocks.set(k,{type,mesh});}
  removeBlock(x,y,z){x=Math.floor(x);y=Math.floor(y);z=Math.floor(z);const k=this.key(x,y,z),entry=this.blocks.get(k);if(!entry)return false;this.group.remove(entry.mesh);this.blocks.delete(k);return true}
  generateArena(radius=16){
    for(let x=-radius;x<=radius;x++)for(let z=-radius;z<=radius;z++){const edge=Math.abs(x)===radius||Math.abs(z)===radius,dist=Math.hypot(x,z);this.setBlock(x,0,z,dist<5?2:1);if(edge){const h=(x+z)%2===0?4:3;for(let y=1;y<=h;y++)this.setBlock(x,y,z,y===h?4:2);}}
    for(let x=-3;x<=3;x++)for(let z=-3;z<=3;z++){this.setBlock(x,1,z,3);if(Math.abs(x)<=1&&Math.abs(z)<=1)this.setBlock(x,2,z,2)}
    this.setBlock(0,3,0,5);
    for(const [cx,cz] of [[-9,-9],[9,-9],[-9,9],[9,9]]){for(let y=1;y<=4;y++)this.setBlock(cx,y,cz,4);this.setBlock(cx,5,cz,5)}
    for(const [bx,bz] of [[-6,0],[6,0],[0,-6],[0,6]])for(let o=-1;o<=1;o++){if(bx===0){this.setBlock(bx+o,1,bz,3);if(o===0)this.setBlock(bx+o,2,bz,3)}else{this.setBlock(bx,1,bz+o,3);if(o===0)this.setBlock(bx,2,bz+o,3)}}
  }
}
