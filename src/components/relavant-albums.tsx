import Image from "next/image";
import React, { ReactNode } from "react";

export default function RelavantAlbums({ children }: { children: ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl text-primary">帶有此風格的專輯：</h2>
      <ul className="grid grid-cols-6">{children}</ul>
    </section>
  );
}
