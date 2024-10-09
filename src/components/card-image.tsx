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
      className={cn("h-full min-h-48 w-full min-w-48 object-cover", className)}
      width={400}
      height={400}
      alt={alt}
      src={src}
      {...props}
    />
  );
}
