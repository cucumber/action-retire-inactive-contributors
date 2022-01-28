# inactive-contributor-bot

> A GitHub App built with [Probot](https://github.com/probot/probot) that Retire inactive contributors from one team to another

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t inactive-contributor-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> inactive-contributor-bot
```

## Contributing

If you have suggestions for how inactive-contributor-bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2022 Matt Wynne, Kate Dames, Blaise Pabon <matt@cucumber.io>
