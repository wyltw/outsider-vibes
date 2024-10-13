"use client";
//react-spinners需要在client side才能有動畫

import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

export default function Spinner() {
  return <BeatLoader color="#712375" loading size={15} speedMultiplier={1} />;
}
