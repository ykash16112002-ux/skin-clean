const fs = require('fs');
const path = require('path');

module.exports = async function sliceAssets(page) {
  await page.goto('http://localhost:3000');
  
  const extracted = await page.evaluate(async () => {
    const img = new Image();
    img.src = '/assets/aistudio/image_72db1020.png';
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
    });

    const fullCanvas = document.createElement('canvas');
    fullCanvas.width = img.naturalWidth;
    fullCanvas.height = img.naturalHeight;
    const fullCtx = fullCanvas.getContext('2d');
    fullCtx.drawImage(img, 0, 0);

    const crops = {};

    function getCropDataUrl(x, y, w, h) {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
      return c.toDataURL('image/png');
    }

    // 1. Cleansing foam: x=17, y=355, w=196, h=204
    crops['foam_cleansing'] = getCropDataUrl(16, 355, 196, 204);

    // 2. Droplet glow: x=218, y=355, w=104, h=100
    crops['droplet_glow'] = getCropDataUrl(217, 355, 105, 102);

    // 3. Serum texture / applicator: x=322, y=455, w=84, h=102
    crops['serum_texture'] = getCropDataUrl(322, 455, 84, 102);

    // 4. Anti-age skin: x=16, y=647, w=294, h=154
    crops['antiage_face'] = getCropDataUrl(16, 647, 294, 154);

    // 5. Aesthetic contour: x=320, y=647, w=294, h=154
    crops['contour_jaw'] = getCropDataUrl(320, 647, 294, 154);

    // 6. Cream swirl: x=16, y=810, w=598, h=154
    crops['cream_swirl'] = getCropDataUrl(16, 810, 598, 154);

    // 7. Profile lip: x=16, y=1104, w=196, h=96
    crops['profile_lip'] = getCropDataUrl(16, 1104, 196, 96);

    // 8. Cream wave: x=217, y=1104, w=196, h=96
    crops['cream_wave'] = getCropDataUrl(217, 1104, 196, 96);

    // 9. Tone texture: x=418, y=1104, w=196, h=96
    crops['tone_texture'] = getCropDataUrl(418, 1104, 196, 96);

    // 10. Clean Hero: In hero (0, 0, 736, 260), cover the burned-in text 'Skin', 'clean', etc.
    const heroCanvas = document.createElement('canvas');
    heroCanvas.width = 736;
    heroCanvas.height = 260;
    const heroCtx = heroCanvas.getContext('2d');
    heroCtx.drawImage(img, 0, 0, 736, 260, 0, 0, 736, 260);

    // Inpaint 'Skin' area (x=16 to 196, y=35 to 110) with clean forehead/cheek skin
    heroCtx.drawImage(img, 185, 30, 180, 80, 16, 35, 180, 80);
    // Inpaint 'clean' area (x=335 to 585, y=35 to 115) with clean cheek skin
    heroCtx.drawImage(img, 205, 30, 240, 80, 335, 35, 240, 80);
    // Inpaint 'ЗАПИСАТЬСЯ НА ПРОЦЕДУРУ' (x=16, y=210, w=190, h=35)
    heroCtx.drawImage(img, 16, 175, 190, 35, 16, 210, 190, 35);
    // Inpaint 'пространство...' (x=435, y=125, w=160, h=95)
    heroCtx.drawImage(img, 320, 125, 160, 95, 435, 125, 160, 95);

    crops['hero_clean'] = heroCanvas.toDataURL('image/png');

    return crops;
  });

  const outDir = path.resolve('public/assets/clinic');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const [key, dataUrl] of Object.entries(extracted)) {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    const filePath = path.join(outDir, `${key}.png`);
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    console.log(`Saved: ${filePath}`);
  }
};
