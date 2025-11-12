#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const LOCAL_PROPERTIES_PATH = path.join(
  __dirname,
  "..",
  "android",
  "local.properties"
);
const BACKUP_PATH = path.join(
  __dirname,
  "..",
  "android",
  "local.properties.backup"
);

// local.properties 백업
if (fs.existsSync(LOCAL_PROPERTIES_PATH)) {
  console.log("📦 Backing up android/local.properties...");
  fs.copyFileSync(LOCAL_PROPERTIES_PATH, BACKUP_PATH);
}

try {
  // prebuild 실행
  console.log("🔨 Running expo prebuild --clean...");
  execSync("npx expo prebuild --clean", { stdio: "inherit" });

  // local.properties 복원
  if (fs.existsSync(BACKUP_PATH)) {
    console.log("✅ Restoring android/local.properties...");
    fs.copyFileSync(BACKUP_PATH, LOCAL_PROPERTIES_PATH);
    fs.unlinkSync(BACKUP_PATH);
    console.log("✨ Done! android/local.properties has been restored.");
  }
} catch (error) {
  console.error("❌ Error during prebuild:", error.message);
  // 에러 발생 시에도 백업 복원 시도
  if (fs.existsSync(BACKUP_PATH)) {
    console.log("🔄 Attempting to restore backup...");
    fs.copyFileSync(BACKUP_PATH, LOCAL_PROPERTIES_PATH);
    fs.unlinkSync(BACKUP_PATH);
  }
  process.exit(1);
}
