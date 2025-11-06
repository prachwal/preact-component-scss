#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Check if file is binary by reading first 512 bytes and checking for null bytes
 */
function isBinaryFile(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    const chunk = buffer.subarray(0, Math.min(512, buffer.length));
    return chunk.includes(0);
  } catch {
    return false;
  }
}

/**
 * Recursively get all files in directory
 */
function getAllFiles(dirPath, baseDir = dirPath) {
  const files = [];
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else if (stat.isFile()) {
      const relativePath = path.relative(baseDir, fullPath);
      const isBinary = isBinaryFile(fullPath);

      files.push({
        path: relativePath,
        content: isBinary ? fs.readFileSync(fullPath).toString('base64') : fs.readFileSync(fullPath, 'utf-8'),
        isBinary
      });
    }
  }

  return files;
}

/**
 * Pack directory into single file
 */
function packDirectory(sourceDir, outputFile) {
  console.log(`📦 Packing directory: ${sourceDir}`);

  if (!fs.statSync(sourceDir).isDirectory()) {
    throw new Error(`Source path is not a directory: ${sourceDir}`);
  }

  const files = getAllFiles(sourceDir);
  const packedData = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    files
  };

  fs.writeFileSync(outputFile, JSON.stringify(packedData, null, 2));
  console.log(`✅ Packed ${files.length} files into: ${outputFile}`);
}

/**
 * Unpack file back to directory structure
 */
function unpackFile(inputFile, outputDir) {
  console.log(`📦 Unpacking file: ${inputFile}`);

  const packedData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

  if (packedData.version !== '1.0.0') {
    console.warn(`⚠️  Warning: File was packed with version ${packedData.version}, current version is 1.0.0`);
  }

  console.log(`📅 Original timestamp: ${packedData.timestamp}`);
  console.log(`📁 Unpacking ${packedData.files.length} files to: ${outputDir}`);

  for (const file of packedData.files) {
    const fullPath = path.join(outputDir, file.path);
    const dirPath = path.dirname(fullPath);

    // Create directory if it doesn't exist
    fs.mkdirSync(dirPath, { recursive: true });

    // Write file content
    if (file.isBinary) {
      fs.writeFileSync(fullPath, Buffer.from(file.content, 'base64'));
    } else {
      fs.writeFileSync(fullPath, file.content, 'utf-8');
    }
  }

  console.log(`✅ Successfully unpacked ${packedData.files.length} files`);
}

/**
 * Main CLI function
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log(`
🔧 File Packer/Unpacker v1.0.0

Usage:
  pack <sourceDir> <outputFile>    - Pack directory into single file
  unpack <inputFile> <outputDir>   - Unpack file back to directory structure

Examples:
  pack src/ src.packed.json
  unpack src.packed.json src-restored/
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

      default:
        throw new Error(`Unknown command: ${command}`);
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Run CLI if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { packDirectory, unpackFile, getAllFiles, isBinaryFile };