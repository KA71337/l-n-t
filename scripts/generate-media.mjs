/**
 * Regenerates `src/lib/media.ts` from the JPEG artwork in `public/images/games`.
 *
 * Reads the real pixel dimensions and renders a 16px wide JPEG that is inlined
 * as the next/image blur placeholder, so no extra network request is needed for
 * the low quality preview.
 *
 * Usage: npm run media
 */
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.join(process.cwd(), "public", "images", "games");
const OUTPUT_FILE = path.join(process.cwd(), "src", "lib", "media.ts");

async function describe(fileName) {
  const filePath = path.join(IMAGES_DIR, fileName);
  const key = path.basename(fileName, path.extname(fileName));

  const image = sharp(filePath);
  const { width, height } = await image.metadata();
  if (!width || !height) {
    throw new Error(`Could not read dimensions for ${fileName}`);
  }

  const preview = await sharp(filePath).resize({ width: 16 }).jpeg({ quality: 45 }).toBuffer();

  return {
    key,
    width,
    height,
    src: `/images/games/${fileName}`,
    blurDataURL: `data:image/jpeg;base64,${preview.toString("base64")}`,
  };
}

async function main() {
  const files = (await readdir(IMAGES_DIR))
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort();

  if (files.length === 0) {
    throw new Error(`No images found in ${IMAGES_DIR}`);
  }

  const assets = await Promise.all(files.map(describe));

  const body = assets
    .map(
      (asset) =>
        `  "${asset.key}": {\n` +
        `    src: "${asset.src}",\n` +
        `    width: ${asset.width},\n` +
        `    height: ${asset.height},\n` +
        `    blurDataURL:\n      "${asset.blurDataURL}",\n` +
        `  },`,
    )
    .join("\n");

  const contents = [
    "/**",
    " * Generated image registry.",
    " * Run `npm run media` after adding or replacing artwork in",
    " * `public/images/games` to refresh dimensions and blur placeholders.",
    " */",
    "export interface MediaAsset {",
    "  src: string;",
    "  width: number;",
    "  height: number;",
    "  /** Tiny inlined JPEG used as the next/image blur placeholder. */",
    "  blurDataURL: string;",
    "}",
    "",
    "export const media = {",
    body,
    "} satisfies Record<string, MediaAsset>;",
    "",
    "export type MediaKey = keyof typeof media;",
    "",
  ].join("\n");

  await writeFile(OUTPUT_FILE, contents, "utf8");
  console.log(`Wrote ${assets.length} assets to src/lib/media.ts`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
