#!/bin/bash
# ============================================================
# 🚀 Deployment Script for vibely.space
# ============================================================
# This script deploys the Dindaaa Sponsor Giveaway website
# to GitHub and Vercel with the domain vibely.space
#
# PREREQUISITES:
# 1. GitHub CLI (gh) installed: https://cli.github.com/
# 2. Vercel CLI installed: npm i -g vercel
# 3. Logged in to both services
# ============================================================

set -e

REPO_NAME="vibely-space"
PROJECT_NAME="vibely-space"
DOMAIN="vibely.space"

echo "🌷 ============================================"
echo "🌷  Deploying vibely.space"
echo "🌷 ============================================"
echo ""

# ---- Step 1: GitHub ----
echo "📦 Step 1: Creating GitHub repository..."
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) not found. Install it first:"
    echo "   → https://cli.github.com/"
    echo "   → brew install gh"
    exit 1
fi

# Check if logged in
if ! gh auth status &> /dev/null; then
    echo "❌ Not logged in to GitHub. Run: gh auth login"
    exit 1
fi

# Create GitHub repo
echo "Creating repository '$REPO_NAME' on GitHub..."
gh repo create "$REPO_NAME" --public --source=. --push --description "🌷 Sponsor Giveaway by Dindaaa ✨ - Website"

echo ""
echo "✅ GitHub repository created!"
echo "   → https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)"
echo ""

# ---- Step 2: Vercel ----
echo "☁️  Step 2: Deploying to Vercel..."
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Install it: npm i -g vercel"
    exit 1
fi

# Deploy to Vercel
echo "Deploying to Vercel (follow the prompts)..."
vercel --prod --yes

echo ""
echo "✅ Deployed to Vercel!"
echo ""

# ---- Step 3: Add Custom Domain ----
echo "🌐 Step 3: Adding custom domain $DOMAIN..."
echo ""

echo "To add your custom domain, run:"
echo "  vercel domains add $DOMAIN"
echo ""
echo "Then configure DNS:"
echo "  Option A (Recommended): Add a CNAME record"
echo "    Name: @"
echo "    Value: cname.vercel-dns.com"
echo ""
echo "  Option B: Add an A record"
echo "    Name: @"
echo "    Value: 76.76.21.21"
echo ""
echo "After DNS is configured, verify:"
echo "  vercel domains inspect $DOMAIN"
echo ""

# ---- Done! ----
echo "🌷 ============================================"
echo "🌷  Deployment Complete! ✨"
echo "🌷 ============================================"
echo ""
echo "🔗 Website: https://$DOMAIN"
echo "📂 GitHub:  https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo 'YOUR_USERNAME/$REPO_NAME')"
echo ""
echo "💕 by Dindaaa ✨"
