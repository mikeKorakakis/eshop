export const cloudinaryImageLoader = ({ src }: { src: string }) => {
    // https://res.cloudinary.com/dycmseb5l/image/upload/v1/zenone/preview_ff_22171774_0_z__preview_ctogsz
    return `${src}`
    // return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/${src}`
  }
  