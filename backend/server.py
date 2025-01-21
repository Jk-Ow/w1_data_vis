import http.server
import socketserver
import os

# Set the directory you want to serve
directory = "../frontend/dist"  # Change this to the folder you want to serve
port = 8000  # You can change this to any port you'd like

# Change working directory to the folder you want to serve
os.chdir(directory)

# Set up the handler
Handler = http.server.SimpleHTTPRequestHandler

# Create an HTTP server
with socketserver.TCPServer(("", port), Handler) as httpd:
    print(f"Serving {directory} at http://localhost:{port}")
    httpd.serve_forever()
