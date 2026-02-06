#!/bin/sh
set -e

echo "=========================================="
echo "  SmartLogi SDMS Frontend Starting..."
echo "=========================================="

# Display environment configuration
echo ""
echo "📍 Environment Configuration:"
echo "   API Base URL: ${VITE_API_BASE_URL:-http://localhost:8080}"
echo "   App Name: ${VITE_APP_NAME:-SmartLogi SDMS}"
echo "   App Version: ${VITE_APP_VERSION:-1.0.0}"
echo ""

# Replace environment variables in JavaScript files at runtime
# This allows the same Docker image to be used in different environments
if [ -n "$VITE_API_BASE_URL" ]; then
    echo "🔧 Configuring runtime environment variables..."
    
    # Find all JS files and replace placeholders
    find /usr/share/nginx/html/assets -type f -name '*.js' 2>/dev/null | while read -r file; do
        if [ -f "$file" ]; then
            # Replace API URL placeholder
            sed -i "s|http://localhost:8080|${VITE_API_BASE_URL}|g" "$file" 2>/dev/null || true
        fi
    done
    
    echo "✅ Environment variables configured successfully!"
else
    echo "ℹ️  Using default API URL: http://localhost:8080"
fi

echo ""
echo "🚀 Starting Nginx web server..."
echo "=========================================="
echo ""

# Execute the main command (nginx)
exec "$@"
