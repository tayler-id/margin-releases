# Margin

Margin is a Markdown notebook in the macOS menu bar. Press ⌃⌥N from any app and a panel drops down with one field: type to find a note, press Return to open it or create it, and write. Every note is a plain `.md` file in a folder you pick, so Obsidian, git, iCloud Drive and any other editor keep working on the same files.

This repository holds Margin's release downloads. The source is kept elsewhere.

## Install

Margin needs macOS 26 or later.

```sh
brew tap tayler-id/margin
brew trust tayler-id/margin
brew install --cask margin
```

Homebrew loads a cask from another person's tap only once you trust that tap. To update later, run `brew upgrade --cask margin`.

The current build is signed with Developer ID but not yet notarized, so macOS stops its first launch. Open System Settings, then Privacy & Security, and click Open Anyway beside Margin.

Each release also lists its zip and the zip's SHA-256, under [Releases](https://github.com/tayler-id/margin-releases/releases).
