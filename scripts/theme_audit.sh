#!/bin/bash
# ellio Theme Audit Script v2.0
# Enforces design system compliance
# Exit code 1 if violations found, 0 if clean

set -o pipefail

VIOLATIONS=0
WARNINGS=0

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "=================================================="
echo "ellio Theme Audit v2.0"
echo "=================================================="
echo ""

# Directories to exclude
EXCLUDE_DIRS="node_modules|.next|out|dist|build|.git|src/theme/ellio-v2.0|src/theme/legacy|scripts"

# 1. Check for hard-coded hex colors in app and src (excluding theme dirs)
echo "1️⃣  Checking for hard-coded hex colors..."
HEX_MATCHES=$(grep -rn "#[0-9a-fA-F]\{6\}" \
  app/ src/ \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude-dir=out \
  --exclude="*.css" \
  --exclude="*.md" \
  --exclude="ellioTokens.ts" \
  --exclude-dir="ellio-v2.0" \
  --exclude-dir="legacy" 2>/dev/null | \
  grep -v "\.map:" | \
  grep -v "postcss" | \
  grep -v "@tailwindcss" | \
  grep -v "#fef8f5" | \
  grep -v "hex:" || true)

if [ -n "$HEX_MATCHES" ]; then
  echo -e "${RED}❌ VIOLATION: Hard-coded hex colors found${NC}"
  echo "$HEX_MATCHES" | head -10
  [ $(echo "$HEX_MATCHES" | wc -l) -gt 10 ] && echo "... and $(( $(echo "$HEX_MATCHES" | wc -l) - 10 )) more"
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo -e "${GREEN}✓ No hard-coded hex colors found${NC}"
fi

echo ""

# 2. Check for raw Tailwind color utilities (should use token mapping)
echo "2️⃣  Checking for raw Tailwind color utilities..."
# Look for patterns like bg-blue-600, text-red-500, etc. (not our brand colors)
RAW_TAILWIND=$(grep -rn "bg-\(blue\|red\|green\|purple\|orange\|pink\|yellow\|gray\|cyan\|indigo\|teal\|slate\)" \
  app/ src/ \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude="*.map" \
  --exclude-dir="ellio-v2.0" \
  --exclude-dir="legacy" 2>/dev/null | \
  grep -v "shadcn\|storybook\|stories" || true)

if [ -n "$RAW_TAILWIND" ]; then
  echo -e "${YELLOW}⚠️  WARNING: Raw Tailwind color utilities found (should use tokens)${NC}"
  echo "$RAW_TAILWIND" | head -5
  [ $(echo "$RAW_TAILWIND" | wc -l) -gt 5 ] && echo "... and $(( $(echo "$RAW_TAILWIND" | wc -l) - 5 )) more"
  WARNINGS=$((WARNINGS + 1))
else
  echo -e "${GREEN}✓ No raw Tailwind color utilities found${NC}"
fi

echo ""

# 3. Check for custom font-family declarations (should use system fonts)
echo "3️⃣  Checking for custom font-family declarations..."
CUSTOM_FONTS=$(grep -rn "fontFamily\|font-family" \
  app/ src/ \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude="*.map" \
  --exclude-dir="ellio-v2.0" \
  --exclude-dir="legacy" 2>/dev/null | \
  grep -v "system-ui\|BlinkMacSystemFont\|Segoe UI\|Helvetica\|Arial\|sans-serif\|typography.family\|ellioTokens" || true)

if [ -n "$CUSTOM_FONTS" ]; then
  echo -e "${RED}❌ VIOLATION: Custom font-family found (use system fonts only)${NC}"
  echo "$CUSTOM_FONTS"
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo -e "${GREEN}✓ System fonts only${NC}"
fi

echo ""

# 4. Check for magic spacing/size values
echo "4️⃣  Checking for magic spacing values (p-, m-, w-, h- with uncommon sizes)..."
MAGIC_SPACING=$(grep -rn "\(p\|m\|w\|h\)-\(3\|5\|7\|9\|11\|13\|15\|17\|18\|19\|21\|22\|23\)" \
  app/ src/ \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude="*.map" \
  --exclude-dir="ellio-v2.0" \
  --exclude-dir="legacy" 2>/dev/null | \
  grep -v "max-w-" | \
  grep -v "min-w-" || true)

if [ -n "$MAGIC_SPACING" ]; then
  echo -e "${YELLOW}⚠️  WARNING: Unusual spacing values found (use ellio spacing scale)${NC}"
  echo "$MAGIC_SPACING" | head -5
  WARNINGS=$((WARNINGS + 1))
else
  echo -e "${GREEN}✓ Spacing values are consistent${NC}"
fi

echo ""

# 5. Check for emoji in code
echo "5️⃣  Checking for emoji in code and UI copy..."
EMOJIS=$(grep -rn "[😀-🙏🌀-🗿🎀-🎿🏀-🏿]" \
  app/ src/ \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude="*.map" \
  --exclude-dir="ellio-v2.0" \
  --exclude-dir="legacy" 2>/dev/null || true)

if [ -n "$EMOJIS" ]; then
  echo -e "${RED}❌ VIOLATION: Emoji found in code (not permitted)${NC}"
  echo "$EMOJIS"
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo -e "${GREEN}✓ No emoji found${NC}"
fi

echo ""

# 6. Check for urgent/pressuring language in copy
echo "6️⃣  Checking for urgency language in UI copy..."
URGENCY=$(grep -rn "ASAP\|immediately\|urgent\|act now\|hurry\|limited time\|expires\|rush" \
  app/ src/ \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude="*.map" \
  --exclude-dir="ellio-v2.0" \
  --exclude-dir="legacy" \
  -i 2>/dev/null || true)

if [ -n "$URGENCY" ]; then
  echo -e "${YELLOW}⚠️  WARNING: Urgency language found (inconsistent with voice)${NC}"
  echo "$URGENCY" | head -5
  WARNINGS=$((WARNINGS + 1))
else
  echo -e "${GREEN}✓ No urgency language found${NC}"
fi

echo ""

# 7. Check for blame language in error messages
echo "7️⃣  Checking for blame language in code..."
BLAME=$(grep -rn "invalid\|failed\|error\|wrong\|incorrect" \
  app/ src/ \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude="*.map" \
  --exclude-dir="ellio-v2.0" \
  --exclude-dir="legacy" \
  -i 2>/dev/null | \
  grep -E "\".*\"|'\''.*'\''" || true)

if [ -n "$BLAME" ]; then
  echo -e "${YELLOW}⚠️  WARNING: Potential blame language found (review for tone)${NC}"
  echo "$BLAME" | head -5
  WARNINGS=$((WARNINGS + 1))
else
  echo -e "${GREEN}✓ Error messages checked${NC}"
fi

echo ""

# 8. Check for missing focus ring styles
echo "8️⃣  Checking for elements without focus styles..."
MISSING_FOCUS=$(grep -rn "outline: none\|outline:none" \
  app/ src/ \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude="*.map" \
  --exclude-dir="ellio-v2.0" \
  --exclude-dir="legacy" 2>/dev/null || true)

if [ -n "$MISSING_FOCUS" ]; then
  echo -e "${RED}❌ VIOLATION: Found 'outline: none' without custom focus (accessibility fail)${NC}"
  echo "$MISSING_FOCUS"
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo -e "${GREEN}✓ Focus styles present${NC}"
fi

echo ""

# 9. Check for token file integrity
echo "9️⃣  Checking token file integrity..."
if [ ! -f "src/theme/ellio-v2.0/index.ts" ]; then
  echo -e "${RED}❌ VIOLATION: Token export file missing (src/theme/ellio-v2.0/index.ts)${NC}"
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo -e "${GREEN}✓ Token export file found${NC}"
fi

if [ ! -f "src/theme/ellio-v2.0/tokens.colors.ts" ]; then
  echo -e "${RED}❌ VIOLATION: Color tokens file missing${NC}"
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo -e "${GREEN}✓ Color tokens file found${NC}"
fi

echo ""

# 10. Check for version consistency
echo "🔟 Checking documentation version..."
THEME_VERSION=$(grep "^\\*\\*Version\\*\\*:" docs/ELLIO_THEME.md | head -1)
if [[ "$THEME_VERSION" =~ "2.0" ]]; then
  echo -e "${GREEN}✓ Theme documentation v2.0 found${NC}"
else
  echo -e "${YELLOW}⚠️  WARNING: Documentation version may be outdated${NC}"
  WARNINGS=$((WARNINGS + 1))
fi

echo ""
echo "=================================================="
echo "Audit Complete"
echo "=================================================="
echo ""

if [ $VIOLATIONS -gt 0 ]; then
  echo -e "${RED}❌ FAILED: $VIOLATIONS violation(s) found${NC}"
  echo "Fix violations before committing."
  exit 1
elif [ $WARNINGS -gt 0 ]; then
  echo -e "${YELLOW}⚠️  PASSED with $WARNINGS warning(s)${NC}"
  echo "Review warnings; they may not block deployment."
  exit 0
else
  echo -e "${GREEN}✅ PASSED: Theme is compliant${NC}"
  echo "Ready to commit."
  exit 0
fi
