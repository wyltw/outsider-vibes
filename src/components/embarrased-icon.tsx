import Image from "next/image";

export default function EmbarrassedIcon() {
  return (
    <Image
      className="opacity-50"
      src="/images/embarrassed.png"
      alt="oops"
      width={36}
      height={36}
    />
  );
}
