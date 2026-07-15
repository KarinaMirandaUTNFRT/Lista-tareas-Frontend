export const inputClass = (hasError: boolean, paddingY = "py-2.5"): string =>
  `w-full px-4 ${paddingY} bg-zinc-950 border rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
    hasError ? "border-red-500" : "border-zinc-700"
  }`;
