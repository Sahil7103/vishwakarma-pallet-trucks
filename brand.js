// Render the original wordmark against the site's light surface.
const brandImages = [...document.querySelectorAll('.brand-image')];
if (brandImages.length) {
  const source = new Image();
  source.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = source.naturalWidth;
    canvas.height = source.naturalHeight;
    const context = canvas.getContext('2d');
    context.drawImage(source, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    const rgba = pixels.data;
    for (let i = 0; i < rgba.length; i += 4) {
      const peak = Math.max(rgba[i], rgba[i + 1], rgba[i + 2]);
      const neutral = peak - Math.min(rgba[i], rgba[i + 1], rgba[i + 2]) < peak * 0.35;
      rgba[i + 3] = Math.min(255, Math.max(0, (peak - 24) * 1.2));
      if (neutral) {
        rgba[i] = 24; rgba[i + 1] = 47; rgba[i + 2] = 41;
      } else {
        rgba[i] = 238; rgba[i + 1] = 156; rgba[i + 2] = 16;
      }
    }
    context.putImageData(pixels, 0, 0);
    const transparentLogo = canvas.toDataURL('image/png');
    brandImages.forEach(image => { image.src = transparentLogo; });
  };
  source.src = brandImages[0].src;
}
