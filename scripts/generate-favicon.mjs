import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const fontkit = require("fontkit");

const FONT_PATH = "/System/Library/Fonts/Supplemental/Iowan Old Style.ttc";
const FONT_POSTSCRIPT_NAME = "IowanOldStyle-Roman";
const OUTPUT = "public/favicon.svg";
const SIZE = 48;
const FONT_SIZE = 22;
const TEXT = "KB";
const BG = "#f5f0eb";
const FG = "#8b4d4f";

function loadFont() {
  const collection = fontkit.create(fs.readFileSync(FONT_PATH));
  const font =
    collection.fonts.find((entry) => entry.postscriptName === FONT_POSTSCRIPT_NAME) ??
    collection.fonts[0];

  if (!font) {
    throw new Error(`Could not load ${FONT_POSTSCRIPT_NAME} from ${FONT_PATH}`);
  }

  return font;
}

function pathData(path) {
  return path.toSVG();
}

function layoutText(font, text, fontSize) {
  const run = font.layout(text);
  const scale = fontSize / font.unitsPerEm;
  const totalWidth = run.positions.reduce(
    (width, position) => width + position.xAdvance * scale,
    0,
  );

  const ascender = font.ascent * scale;
  const descender = font.descent * scale;
  const height = ascender - descender;
  const startX = (SIZE - totalWidth) / 2;
  const baselineY = (SIZE - height) / 2 + ascender;

  let x = startX;

  return run.glyphs
    .map((glyph, index) => {
      const path = glyph.path.scale(scale, -scale).translate(x, baselineY);
      x += run.positions[index].xAdvance * scale;
      return `<path fill="${FG}" d="${pathData(path)}" />`;
    })
    .join("\n  ");
}

const font = loadFont();
const paths = layoutText(font, TEXT, FONT_SIZE);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" fill="none">
  <rect width="${SIZE}" height="${SIZE}" fill="${BG}" />
  <rect x="1.5" y="1.5" width="45" height="45" stroke="${FG}" stroke-width="1" />
  ${paths}
</svg>
`;

fs.writeFileSync(OUTPUT, svg);
console.log(`Favicon generated with ${font.fullName}`);
