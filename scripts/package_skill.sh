#!/bin/bash
# package_skill.sh — Package skill/ directory into a distributable .skill file
#
# Usage:
#   ./scripts/package_skill.sh                  # creates aws-presentation.skill
#   ./scripts/package_skill.sh v1.0.0           # creates aws-presentation-v1.0.0.skill

set -e

VERSION="${1:-}"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILL_DIR="$REPO_ROOT/skill"

if [ ! -d "$SKILL_DIR" ]; then
  echo "Error: $SKILL_DIR not found"
  exit 1
fi

if [ ! -f "$SKILL_DIR/SKILL.md" ]; then
  echo "Error: $SKILL_DIR/SKILL.md missing"
  exit 1
fi

# Validate YAML frontmatter
if ! head -1 "$SKILL_DIR/SKILL.md" | grep -q "^---$"; then
  echo "Error: SKILL.md missing YAML frontmatter"
  exit 1
fi

if [ -n "$VERSION" ]; then
  OUTPUT="$REPO_ROOT/aws-presentation-$VERSION.skill"
else
  OUTPUT="$REPO_ROOT/aws-presentation.skill"
fi

echo "Packaging skill from: $SKILL_DIR"
echo "Output: $OUTPUT"

cd "$SKILL_DIR"
rm -f "$OUTPUT"
zip -rq "$OUTPUT" . -x "*/__pycache__/*" "*/.DS_Store"

SIZE=$(du -h "$OUTPUT" | cut -f1)
echo "✓ Created $OUTPUT ($SIZE)"
echo ""
echo "Install with:"
echo "  mkdir -p ~/.claude/skills/aws-presentation"
echo "  unzip $OUTPUT -d ~/.claude/skills/aws-presentation/"
