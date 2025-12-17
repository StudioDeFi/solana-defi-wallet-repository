# SSL Certificate Directory

This directory is for storing SSL/TLS certificates for HTTPS support.

## Files to add:

- `fullchain.pem` - Full certificate chain
- `privkey.pem` - Private key

## Obtaining Certificates

### Option 1: Let's Encrypt (Free)
```bash
certbot certonly --standalone -d yourdomain.com
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/
```

### Option 2: Self-signed (Development only)
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/privkey.pem \
  -out nginx/ssl/fullchain.pem \
  -subj "/CN=localhost"
```

## Security Notes

- **Never commit certificates to version control**
- Certificates are automatically ignored via `.gitignore`
- Rotate certificates before expiry
- Use strong private keys (2048+ bit RSA or 256+ bit EC)

## Enabling HTTPS

1. Add certificates to this directory
2. Uncomment the HTTPS server block in `nginx/nginx.conf`
3. Restart nginx: `make restart`
