interface GalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: GalleryProps) {
  return (
    <div className="mb-8 grid h-[300px] gap-2 md:h-[450px] md:grid-cols-3 md:grid-rows-2 lg:h-[500px]">
      {/* Imagen Principal (Ocupa 2 columnas y 2 filas en desktop) */}
      <div className="relative col-span-1 overflow-hidden rounded-xl md:col-span-2 md:row-span-2">
        <img
          src={images[0]}
          alt="Vista principal"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Imágenes Secundarias (Lado derecho) */}
      <div className="relative hidden overflow-hidden rounded-xl md:block">
        <img
          src={images[1]}
          alt="Vista secundaria 1"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="relative hidden overflow-hidden rounded-xl md:block">
        <img
          src={images[2]}
          alt="Vista secundaria 2"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Capa para ver más fotos */}
        {images.length > 3 && (
          <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 text-lg font-bold text-white transition-colors hover:bg-black/50">
            +{images.length - 3} fotos
          </div>
        )}
      </div>
    </div>
  );
}
