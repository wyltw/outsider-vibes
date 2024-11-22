import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { ComponentPropsWithoutRef } from "react";

type CardImageProps = ImageProps & ComponentPropsWithoutRef<"img">;

export default function CardImage({
  className,
  alt,
  src,
  ...props
}: CardImageProps) {
  return (
    <Image
      className={cn("h-full w-full object-cover", className)}
      width={400}
      height={400}
      alt={alt}
      src={src}
      quality={50}
      {...props}
    />
  );
}
