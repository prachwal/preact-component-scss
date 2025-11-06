#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'fs';
import { join, relative, dirname } from 'path';

interface FileEntry {
  path: string;
  content: string;
  isBinary: boolean;
}

/**
 * Check if file is binary by reading first 512 bytes and checking for null bytes
 */
function isBinaryFile(filePath: string): boolean {
  try {
    const buffer = readFileSync(filePath);
    const chunk = buffer.subarray(0, Math.min(512, buffer.length));
    return chunk.includes(0);
  } catch {
    return false;
  }
}

/**
 * Recursively get all files in directory
 */
function getAllFiles(dirPath: string, baseDir: string = dirPath): FileEntry[] {
  const files: FileEntry[] = [];
  const items = readdirSync(dirPath);

  for (const item of items) {
    const fullPath = join(dirPath, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else if (stat.isFile()) {
      const relativePath = relative(baseDir, fullPath);
      const isBinary = isBinaryFile(fullPath);

      files.push({
        path: relativePath,
        content: isBinary ? readFileSync(fullPath).toString('base64') : readFileSync(fullPath, 'utf-8'),
        isBinary
      });
    }
  }

  return files;
}

/**
 * Pack directory into single text file with separators
 */
function packDirectory(sourceDir: string, outputFile: string): void {
  console.log(`📦 Packing directory: ${sourceDir}`);

  if (!statSync(sourceDir).isDirectory()) {
    throw new Error(`Source path is not a directory: ${sourceDir}`);
  }

  const files = getAllFiles(sourceDir);
  let packedContent = `// ===== PACKED FILES v2.0.0 =====\n`;
  packedContent += `// Timestamp: ${new Date().toISOString()}\n`;
  packedContent += `// Total files: ${files.length}\n\n`;

  for (const file of files) {
    packedContent += `// ===== FILE: ${file.path} =====\n`;
    if (file.isBinary) {
      packedContent += `[BASE64_BINARY]\n${file.content}\n`;
    } else {
      packedContent += `${file.content}\n`;
    }
    packedContent += `// ===== END_FILE: ${file.path} =====\n\n`;
  }

  writeFileSync(outputFile, packedContent, 'utf-8');
  console.log(`✅ Packed ${files.length} files into: ${outputFile}`);
}

/**
 * Unpack file back to directory structure
 */
function unpackFile(inputFile: string, outputDir: string): void {
  console.log(`📦 Unpacking file: ${inputFile}`);

  const packedContent = readFileSync(inputFile, 'utf-8');
  const lines = packedContent.split('\n');

  // Check version
  if (!lines[0].includes('PACKED FILES v2.0.0')) {
    console.warn(`⚠️  Warning: File might be in old format. Trying to parse anyway.`);
  }

  let currentFile: { path: string; content: string[]; isBinary: boolean } | null = null;
  const files: FileEntry[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('// ===== FILE: ') && line.endsWith(' =====')) {
      // Start of new file
      if (currentFile) {
        files.push({
          path: currentFile.path,
          content: currentFile.content.join('\n'),
          isBinary: currentFile.isBinary
        });
      }

      const filePath = line.replace('// ===== FILE: ', '').replace(' =====', '');
      currentFile = {
        path: filePath,
        content: [],
        isBinary: false
      };
    } else if (line.startsWith('// ===== END_FILE: ') && line.endsWith(' =====')) {
      // End of current file
      if (currentFile) {
        files.push({
          path: currentFile.path,
          content: currentFile.content.join('\n'),
          isBinary: currentFile.isBinary
        });
        currentFile = null;
      }
    } else if (currentFile) {
      if (line === '[BASE64_BINARY]') {
        currentFile.isBinary = true;
        // Skip the [BASE64_BINARY] line and read next line as content
        continue;
      }
      currentFile.content.push(line);
    }
  }

  // Handle last file if not ended
  if (currentFile) {
    files.push({
      path: currentFile.path,
      content: currentFile.content.join('\n'),
      isBinary: currentFile.isBinary
    });
  }

  console.log(`📁 Unpacking ${files.length} files to: ${outputDir}`);

  for (const file of files) {
    const fullPath = join(outputDir, file.path);
    const dirPath = dirname(fullPath);

    // Create directory if it doesn't exist
    mkdirSync(dirPath, { recursive: true });

    // Write file content
    if (file.isBinary) {
      writeFileSync(fullPath, Buffer.from(file.content, 'base64'));
    } else {
      writeFileSync(fullPath, file.content, 'utf-8');
    }
  }

  console.log(`✅ Successfully unpacked ${files.length} files`);
}

/**
 * Extract single file from packed file using regex
 */
function extractFile(inputFile: string, filePath: string, outputFile?: string): void {
  console.log(`📦 Extracting file: ${filePath} from ${inputFile}`);

  const packedContent = readFileSync(inputFile, 'utf-8');

  // Create regex to match the file content between separators
  const fileRegex = new RegExp(
    `// ===== FILE: ${filePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} =====\\n(.*?)\\n// ===== END_FILE: ${filePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} =====`,
    's'
  );

  const match = packedContent.match(fileRegex);

  if (!match) {
    throw new Error(`File ${filePath} not found in packed file`);
  }

  let content = match[1];

  // Check if it's binary
  if (content.startsWith('[BASE64_BINARY]\n')) {
    content = content.replace('[BASE64_BINARY]\n', '');
    const buffer = Buffer.from(content, 'base64');
    if (outputFile) {
      writeFileSync(outputFile, buffer);
      console.log(`✅ Extracted binary file to: ${outputFile}`);
    } else {
      console.log(`Binary file content (base64): ${content}`);
    }
  } else {
    if (outputFile) {
      writeFileSync(outputFile, content, 'utf-8');
      console.log(`✅ Extracted text file to: ${outputFile}`);
    } else {
      console.log(`File content:\n${content}`);
    }
  }
}

/**
 * Main CLI function
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log(`
🔧 File Packer/Unpacker v2.0.0

Usage:
  pack <sourceDir> <outputFile>        - Pack directory into single text file
  unpack <inputFile> <outputDir>       - Unpack file back to directory structure
  extract <inputFile> <filePath> [outputFile] - Extract single file (output to stdout if no outputFile)

Examples:
  pack src/ src.packed.txt
  unpack src.packed.txt src-restored/
  extract src.packed.txt package.json
  extract src.packed.txt src/index.ts extracted.ts
`);
    process.exit(1);
  }

  const command = args[0];

  try {
    switch (command) {
      case 'pack':
        if (args.length !== 3) {
          throw new Error('pack command requires 2 arguments: <sourceDir> <outputFile>');
        }
        packDirectory(args[1], args[2]);
        break;

      case 'unpack':
        if (args.length !== 3) {
          throw new Error('unpack command requires 2 arguments: <inputFile> <outputDir>');
        }
        unpackFile(args[1], args[2]);
        break;

      case 'extract':
        if (args.length < 3) {
          throw new Error('extract command requires at least 2 arguments: <inputFile> <filePath> [outputFile]');
        }
        extractFile(args[1], args[2], args[3]);
        break;

      default:
        throw new Error(`Unknown command: ${command}`);
    }
  } catch (error) {
    console.error(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

// Run CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { packDirectory, unpackFile, extractFile, getAllFiles, isBinaryFile };