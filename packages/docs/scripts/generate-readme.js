import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function processMDX() {
  const mdxPath = path.join(process.cwd(), 'src/content/docs.mdx');
  const fileContents = fs.readFileSync(mdxPath, 'utf8');
  const { content } = matter(fileContents);

  // First remove astro blocks completely
  const withoutAstro = content.replace(
    /<Conditional target="astro">[\s\S]*?<\/Conditional>/g,
    ''
  );
  // Then extract content from md blocks (remove the Conditional tags but keep content)
  const final = withoutAstro
    .replace(
      /<Conditional target="md">([\s\S]*?)<\/Conditional>/g,
      (_, content) => content.replace(/^  /gm, '')
    )
    // Replace multiple empty lines with a single empty line
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    // Remove import statements only if they're not inside code blocks
    .replace(/^(?!.*```[\s\S]*?)import\s+[^;]+;(?:\r?\n|\r)/gm, '');
  return final.trim();
}

export async function generateREADME() {
  const content = await processMDX();
  const readmePath = path.join(process.cwd(), '../../README.md');
  fs.writeFileSync(readmePath, String(content));
}

export default generateREADME();
