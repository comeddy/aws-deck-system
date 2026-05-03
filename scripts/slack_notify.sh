#!/bin/bash
# slack_notify.sh — Send notifications to #aws-deck-automation channel
#
# Usage:
#   ./slack_notify.sh release v1.0.0 "Initial release with 7 patterns"
#   ./slack_notify.sh new-sample "Physical AI Workshop deck"
#   ./slack_notify.sh tip "Use \`++pageNum\` not hardcoded numbers"
#   ./slack_notify.sh announcement "Office hours Friday 14:00 KST"
#   ./slack_notify.sh pr-merged 42 "Add Pattern 8 Map + Cards"
#
# Requires:
#   - SLACK_WEBHOOK_URL env var set to #aws-deck-automation channel webhook
#
# Setup the webhook:
#   1. AWS Korea Slack workspace → #aws-deck-automation channel
#   2. Channel settings → Integrations → Add apps → "Incoming Webhooks"
#   3. Copy webhook URL into your shell profile or GitHub Secrets

set -e

WEBHOOK_URL="${SLACK_WEBHOOK_URL:-}"
if [ -z "$WEBHOOK_URL" ]; then
  echo "Error: SLACK_WEBHOOK_URL not set"
  echo ""
  echo "Set it with:"
  echo "  export SLACK_WEBHOOK_URL='https://hooks.slack.com/services/...'"
  exit 1
fi

TYPE="${1:-}"
ARG1="${2:-}"
ARG2="${3:-}"

if [ -z "$TYPE" ]; then
  cat << EOF
Usage:
  $0 <type> <args...>

Types:
  release <version> <notes>      New skill release
  new-sample <name>              New sample deck added
  tip <message>                  Usage tip of the day
  announcement <message>         General announcement
  pr-merged <pr-num> <title>     PR merge notification

Examples:
  $0 release v1.0.0 "Initial release"
  $0 new-sample "Physical AI Workshop deck"
  $0 tip "Use \\\`++pageNum\\\` not hardcoded numbers"
  $0 announcement "Office hours Friday 14:00 KST"
EOF
  exit 1
fi

case "$TYPE" in
  release)
    PAYLOAD=$(cat <<EOF
{
  "blocks": [
    {
      "type": "header",
      "text": { "type": "plain_text", "text": "📦 New Skill Release: $ARG1" }
    },
    {
      "type": "section",
      "text": { "type": "mrkdwn", "text": "$ARG2" }
    },
    {
      "type": "context",
      "elements": [
        { "type": "mrkdwn", "text": "Update: \`git pull && cp -r skill/ ~/.claude/skills/aws-presentation\`" }
      ]
    }
  ]
}
EOF
)
    ;;

  new-sample)
    PAYLOAD=$(cat <<EOF
{
  "blocks": [
    {
      "type": "section",
      "text": { "type": "mrkdwn", "text": "🎨 *New Sample Deck Available*\n*$ARG1*\n\nCheck \`samples/\` directory in the repo." }
    }
  ]
}
EOF
)
    ;;

  tip)
    PAYLOAD=$(cat <<EOF
{
  "blocks": [
    {
      "type": "section",
      "text": { "type": "mrkdwn", "text": "💡 *Tip of the Day*\n$ARG1" }
    }
  ]
}
EOF
)
    ;;

  announcement)
    PAYLOAD=$(cat <<EOF
{
  "blocks": [
    {
      "type": "section",
      "text": { "type": "mrkdwn", "text": "📢 *Announcement*\n$ARG1" }
    }
  ]
}
EOF
)
    ;;

  pr-merged)
    PAYLOAD=$(cat <<EOF
{
  "blocks": [
    {
      "type": "section",
      "text": { "type": "mrkdwn", "text": "✅ *PR #$ARG1 merged*\n$ARG2" }
    }
  ]
}
EOF
)
    ;;

  *)
    echo "Unknown type: $TYPE"
    exit 1
    ;;
esac

echo "Sending to Slack..."
RESPONSE=$(curl -sS -X POST -H 'Content-type: application/json' --data "$PAYLOAD" "$WEBHOOK_URL")

if [ "$RESPONSE" = "ok" ]; then
  echo "✓ Sent successfully"
else
  echo "✗ Failed: $RESPONSE"
  exit 1
fi
