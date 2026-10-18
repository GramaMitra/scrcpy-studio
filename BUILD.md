# Building the .exe

[English](BUILD.md) | [Bahasa Indonesia](BUILD.id.md)

## Requirements (once)
1. **Windows 10/11** (the .exe must be built on Windows).
2. **Node.js LTS**: https://nodejs.org (reopen your terminal afterwards).
3. Internet on the first build (downloads about 200 MB).

## Quickest way
Double-click **`build.bat`**. When it finishes, the `dist` folder opens.

## Manual
    npm install
    npm run dist

## Output (`dist`)
| File | Purpose |
|---|---|
| `Scrcpy Studio-Setup-1.0.0.exe` | Installer (folder choice, Desktop and Start Menu shortcuts) |
| `Scrcpy Studio-Portable-1.0.0.exe` | Single file, runs without installing |

Quick test without an installer: `npm run pack`, then open `dist\win-unpacked\Scrcpy Studio.exe`.

## Notes
- scrcpy is **not bundled**. On first launch, choose your scrcpy folder (containing `scrcpy.exe` and `adb.exe`).
- Windows SmartScreen warns about an unknown publisher because the app is unsigned. Click **More info**, then **Run anyway**.
- Change the icon by replacing `icon.ico` (256x256 or larger). Change the version in `package.json`.

## Troubleshooting
| Message | Fix |
|---|---|
| `Cannot create symbolic link` / `winCodeSign` | Run CMD as **Administrator**, or enable **Developer Mode**, then rebuild |
| `npm` not recognized | Install Node.js and open a new CMD |
| Build hangs while downloading | Check your connection or disable VPN, then retry |
| App opens with a blank window | Delete `dist` and `node_modules`, then run `npm install` again |
