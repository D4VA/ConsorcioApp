export const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className="h-40 mx-auto object-contain" />
);