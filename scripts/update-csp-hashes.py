#!/usr/bin/env python3
"""Post-build script: extracts inline script SHA-256 hashes from all HTML files
and updates the _headers CSP to use hash-based allowlist instead of 'unsafe-inline'."""

import re
import hashlib
import base64
import glob
import os

BUILD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "build")
HEADERS_FILE = os.path.join(BUILD_DIR, "_headers")


def extract_script_hashes(build_dir: str) -> set[str]:
    hashes = set()
    for html_path in glob.glob(os.path.join(build_dir, "**/*.html"), recursive=True):
        with open(html_path) as f:
            html = f.read()
        scripts = re.findall(r"<script(?:\s[^>]*)?>(.+?)</script>", html, re.DOTALL)
        for script in scripts:
            if script.strip().startswith("{") and '"@context"' in script:
                continue
            digest = base64.b64encode(hashlib.sha256(script.encode()).digest()).decode()
            hashes.add(f"'sha256-{digest}'")
    return hashes


def update_headers(headers_path: str, hashes: set[str]) -> None:
    with open(headers_path) as f:
        content = f.read()

    hash_list = " ".join(sorted(hashes))
    new_script_src = f"script-src 'self' {hash_list}"

    content = re.sub(r"script-src\s+'self'[^;]*", new_script_src, content)

    with open(headers_path, "w") as f:
        f.write(content)


def main() -> None:
    if not os.path.isdir(BUILD_DIR):
        print("Build directory not found. Run 'npm run build' first.")
        return

    hashes = extract_script_hashes(BUILD_DIR)
    if not hashes:
        print("No inline scripts found.")
        return

    update_headers(HEADERS_FILE, hashes)
    print(f"Updated CSP with {len(hashes)} script hash(es).")


if __name__ == "__main__":
    main()
