# Use the official Nginx base image
FROM nginx:alpine

# Copy the HTML, JS, and CSS files to the Nginx web root directory
COPY templates /usr/share/nginx/html

# If you have other static assets (images, fonts, etc.), you can copy them as well
# COPY static-assets /usr/share/nginx/html

# Expose port 80 (the default port for Nginx)
EXPOSE 80
