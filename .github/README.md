# Grand Campaigns

A static HTML website hosted on Cloudflare Pages for Grand Campaigns project.

## Overview

This project contains static HTML pages served via Cloudflare Pages with OAuth2 integration.

## Pages

- **OAuth2 Authentication** - User authentication and authorization flows
- **License** - Software license terms and conditions
- **Privacy Policy** - Data collection and privacy practices
- **Terms of Service** - Usage terms and user agreements
- **About** - Project information and description

## Deployment

Hosted on Cloudflare Pages with automatic deployments from the main branch.

### Requirements

- Cloudflare account with Pages enabled
- OAuth2 provider configuration
- Custom domain (optional)

## Local Development

Open HTML files directly in a browser or use a local server:

```bash
python -m http.server 8000
```

Navigate to `http://localhost:8000`

## OAuth2 Configuration

Configure OAuth2 settings in your Cloudflare Pages environment variables:
- `OAUTH_CLIENT_ID`
- `OAUTH_CLIENT_SECRET`
- `OAUTH_REDIRECT_URI`

## License

See [LICENSE](LICENSE) page for details.

## Contact

For questions or issues, please open an issue in this repository.

This is added text, by pressing Ctrl + S I am able to save this file and it should update on Github Desktop App.