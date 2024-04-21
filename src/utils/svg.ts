const svgRegex = /<svg\b[^>]*>[\s\S]*?<\/svg>/i;

export function convertSVGToBase64(input: string): string {
  const containsSVG = svgRegex.test(input);
  if (containsSVG) {
    const base64String = Buffer.from(input).toString("base64");
    return `data:image/svg+xml;base64,${base64String}`;
  } else {
    return input;
  }
}
