# Use the official Nginx image as the base image
FROM nginx:latest


# Copy the HTML, CSS, and JS files into the appropriate locations
COPY src/main/resources/templates /usr/share/nginx/html
COPY src/main/resources/templates/static/js /usr/share/nginx/html/js
COPY src/main/resources/templates/static/css /usr/share/nginx/html/css

# Expose port 80 for HTTP
EXPOSE 80

# The CMD instruction sets the command to be executed when the Docker container starts.
CMD ["nginx", "-g", "daemon off;"]
