#!/bin/bash

cd /Users/asmatayechi/Downloads/EntourageAV/frontend

# Fix all Radix UI imports - add the @ prefix
find src/shared/ui/ui -name "*.tsx" -type f -exec sed -i '' 's/from "radix-ui\//from "@radix-ui\//g' {} +

echo "Fixed Radix UI imports!"