import React from "react";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-airforce-50 px-36 py-20">
      <div className="flex w-full max-w-5xl">
        <Logo width={240} height={120} />
        <section className="space-y-4">
          <div>
            <h4>OUTSIDERVIBES</h4>
            <ul>
              <li>Home</li>
              <li>Privacy policy</li>
              <li>Terms & conditions</li>
            </ul>
          </div>
          <div>
            <h4>COPYRIGHT</h4>
            <ul>
              <li>&copy;2024 By wyltw</li>
            </ul>
          </div>
        </section>
      </div>
    </footer>
  );
}
