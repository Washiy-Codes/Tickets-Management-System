"use client";

import { Placeholder } from "@/components/placeholder";

const Error = ({error}: {error: Error}) => {
  return (
    <Placeholder label={`Error: ${error.message || "Something went wrong"}`} />
    );
  };
 export default Error;