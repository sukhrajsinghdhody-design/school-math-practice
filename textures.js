import * as THREE from 'three';

function createPixelTexture(draw) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 16;
  const ctx = canvas.getContext('2d');
  draw(ctx);
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function noiseFill(ctx, baseHex, variance = 18) {
  const r = parseInt(baseHex.slice(1,3),16), g = parseInt(baseHex.slice(3,5),16), b = parseInt(baseHex.slice(5,7),16);
  for (let y=0;y<16;y++) for (let x=0;x<16;x++) {
    const d=Math.floor((Math.random()-0.5)*2*variance);
    ctx.fillStyle=`rgb(${Math.max(0,Math.min(255,r+d))},${Math.max(0,Math.min(255,g+d))},${Math.max(0,Math.min(255,b+d))})`;
    ctx.fillRect(x,y,1,1);
  }
}

export function buildBlockMaterials() {
  const grassTop=createPixelTexture(ctx=>noiseFill(ctx,'#4d9a3e',16));
  const dirt=createPixelTexture(ctx=>noiseFill(ctx,'#7a5233',16));
  const grassSide=createPixelTexture(ctx=>{noiseFill(ctx,'#7a5233',16);for(let x=0;x<16;x++){ctx.fillStyle='#4d9a3e';ctx.fillRect(x,0,1,3+(x%3));}});
  const stone=createPixelTexture(ctx=>{noiseFill(ctx,'#7d8287',20);ctx.fillStyle='rgba(0,0,0,.18)';ctx.fillRect(2,5,5,1);ctx.fillRect(9,11,6,1);});
  const planks=createPixelTexture(ctx=>{noiseFill(ctx,'#b88746',12);ctx.fillStyle='#7c5625';for(let y=0;y<16;y+=4)ctx.fillRect(0,y,16,1);ctx.fillRect(7,0,1,4);ctx.fillRect(14,4,1,4);ctx.fillRect(4,8,1,4);ctx.fillRect(11,12,1,4);});
  const brick=createPixelTexture(ctx=>{noiseFill(ctx,'#9e4338',14);ctx.fillStyle='#cbd5e1';for(let y=0;y<16;y+=4){ctx.fillRect(0,y,16,1);const o=(y/4)%2===0?0:4;ctx.fillRect(o,y,1,4);ctx.fillRect((o+8)%16,y,1,4);}});
  const glow=createPixelTexture(ctx=>{noiseFill(ctx,'#f59e0b',20);ctx.fillStyle='#fef08a';ctx.fillRect(3,3,10,10);ctx.fillStyle='#fff';ctx.fillRect(6,6,4,4);});
  return {
    1:{name:'Grass',swatch:'#4d9a3e',material:[new THREE.MeshStandardMaterial({map:grassSide}),new THREE.MeshStandardMaterial({map:grassSide}),new THREE.MeshStandardMaterial({map:grassTop}),new THREE.MeshStandardMaterial({map:dirt}),new THREE.MeshStandardMaterial({map:grassSide}),new THREE.MeshStandardMaterial({map:grassSide})]},
    2:{name:'Stone',swatch:'#7d8287',material:new THREE.MeshStandardMaterial({map:stone,roughness:.85})},
    3:{name:'Planks',swatch:'#b88746',material:new THREE.MeshStandardMaterial({map:planks,roughness:.75})},
    4:{name:'Brick',swatch:'#9e4338',material:new THREE.MeshStandardMaterial({map:brick,roughness:.8})},
    5:{name:'Lantern',swatch:'#f59e0b',material:new THREE.MeshStandardMaterial({map:glow,emissive:new THREE.Color('#f59e0b'),emissiveIntensity:.65})}
  };
}
