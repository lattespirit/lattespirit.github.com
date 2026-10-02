#!/usr/bin/env bash
#
# Headless Chrome screenshot helper for this workspace.
#
# WHY IT NEEDS TO RUN UNSANDBOXED
# --------------------------------
# The Codex execution sandbox (a sandbox-exec profile) denies the Mach
# bootstrap calls Chrome requires. Headless Chrome aborts at startup with a
# bare SIGABRT (or "bootstrap_check_in ... Permission denied (1100)") because
# it cannot register with the window server / LaunchServices / crashpad.
# There is no Chrome flag that can get around a sandbox denial, so Chrome must
# be launched OUTSIDE the sandbox.
#
# Two ways to do that in Codex:
#   1. Run the Chrome binary directly as the first token of the command so the
#      approved prefix rule applies (recommended if you persist the rule):
#        /Applications/Google Chrome.app/Contents/MacOS/Google Chrome \
#          --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
#          --virtual-time-budget=1000 --screenshot=out.png \
#          --window-size=470,180 file:///path/to/page.svg
#   2. Or run this script with elevated / unsandboxed permissions (approval).
#
set -euo pipefail

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="${1:?usage: chrome-headless.sh <output.png> <page|url> [width] [height]}"
PAGE="${2:?usage: chrome-headless.sh <output.png> <page|url> [width] [height]}"
W="${3:-1200}"
H="${4:-900}"

profile="$(mktemp -d -t chrome-shot)"
trap 'rm -rf "$profile"' EXIT

# Hard 30s cap so it never hangs the caller even if the browser lingers.
exec perl -e 'alarm shift; exec @ARGV' 30 \
  "$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-sandbox \
  --no-first-run \
  --no-default-browser-check \
  --hide-scrollbars \
  --disable-background-networking \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=1000 \
  --user-data-dir="$profile" \
  --screenshot="$OUT" \
  --window-size="$W,$H" \
  "$PAGE"
