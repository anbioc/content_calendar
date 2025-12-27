import React from "react";

import { redirect } from "next/navigation";

const page = () => {
  redirect("/company");
  return <div className="flex items-center justify-center">Home</div>;
};

export default page;
