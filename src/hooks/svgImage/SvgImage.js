const SvgImage = ({
  src,
  size = 20,
  width,
  height,
  className = '',
  onClick,
  color = 'currentColor',
  strokeWidth = 1,
  fill,
  ...props
}) => {
  const appliedWidth = width || size;
  const appliedHeight = height || size;

  let updatedSrc = src;

  // Replace or inject width
  if (/width="[^"]*"/.test(updatedSrc)) {
    updatedSrc = updatedSrc.replace(/width="[^"]*"/, `width="${appliedWidth}px"`);
  } else {
    updatedSrc = updatedSrc.replace('<svg', `<svg width="${appliedWidth}px"`);
  }

  // Replace or inject height
  if (/height="[^"]*"/.test(updatedSrc)) {
    updatedSrc = updatedSrc.replace(/height="[^"]*"/, `height="${appliedHeight}px"`);
  } else {
    updatedSrc = updatedSrc.replace('<svg', `<svg height="${appliedHeight}px"`);
  }

  // Stroke
  updatedSrc = updatedSrc.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
  updatedSrc = updatedSrc.replace(/strokeWidth="[^"]*"/g, `strokeWidth="${strokeWidth}"`);

  // Fill (only if provided)
  if (fill !== undefined) {
    updatedSrc = updatedSrc.replace(/fill="[^"]*"/g, `fill="${fill}"`);
  }

  return (
    <div
      className={`flex cursor-pointer ${className}`}
      onClick={onClick}
      {...props}
      dangerouslySetInnerHTML={{ __html: updatedSrc }}
    />
  );
};

export default SvgImage;
