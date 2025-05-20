# Zapier Automation Platform (Clone Version V1)

A powerful automation platform that allows users to create custom workflows (Zaps) by connecting different triggers and actions.

## 🚀 Quick Start

### Prerequisites
- Bun (latest version)
- Solana account for sending SOL (for blockchain interactions)
- Environment variables set up

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DipakKhade/Zapier
cd Zapier
```

2. Install dependencies:
```bash
# Install root dependencies
bun install

# Install dependencies for each app
cd apps/webapp
bun install

cd ../worker
bun install
```

3. Set up environment variables:
```bash
# Create .env files in both webapp and worker directories
cp .env.example .env
```

Required environment variables:
```env
# Webapp (.env)
NEXT_PUBLIC_API_URL=your_api_url
SOLANA_PRIVATE_KEY=your_private_key
HOOKS_URL=your_hooks_url

# Worker (.env)
SOLANA_PRIVATE_KEY=your_private_key
```

4. Start the development servers:
```bash
# Start webapp
cd apps/webapp
bun dev

# Start worker (in a new terminal)
cd apps/worker
bun dev
```

## 🔧 Key Features

- **Visual Workflow Builder**: Create automation workflows using a drag-and-drop interface
- **Trigger & Action System**: Connect different services through triggers and actions
- **Solana Integration**: Built-in support for Solana blockchain transactions
- **Webhook Support**: Test and monitor webhook integrations
- **Metadata Management**: Configure and manage workflow metadata

## 🛠️ Development

### Available Scripts

```bash
# Webapp
bun dev        # Start development server
bun run build  # Build for production
bun start      # Start production server
bun lint       # Run linter

# Worker
bun dev        # Start worker service
bun run build  # Build worker
bun start      # Start worker in production
```

### Adding New Triggers/Actions

1. Create a new trigger/action in the appropriate directory
2. Register it in the available triggers/actions list
3. Implement the necessary metadata configuration
4. Test the integration

## 🔐 Environment Variables

### Webapp
- `NEXT_PUBLIC_API_URL`: Your API endpoint
- `SOLANA_PRIVATE_KEY`: Private key for Solana transactions
- `HOOKS_URL`: Webhook endpoint URL

### Worker
- `SOLANA_PRIVATE_KEY`: Private key for Solana transactions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
