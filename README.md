# cafe-website-s3-hosting

A static cafe website template optimized for deployment on AWS S3, featuring a responsive design and easy customization.

## Features

- Responsive multi-page design (Home, Menu, About, Contact)
- Easily customizable HTML, CSS, JS
- Ready for AWS S3 static hosting
- Step-by-step deployment instructions
- Example assets and structure

## Getting Started

### Prerequisites

- [AWS Account](https://aws.amazon.com/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

### Installation

Clone the repository:
```bash
git clone https://github.com/techgeek68/cafe-website-s3-hosting.git
cd cafe-website-s3-hosting
```

### Customization

- Edit content in `index.html`, `menu.html`, etc.
- Update styles in `css/` folder.
- Replace images in `assets/`.

See [docs/customization.md](docs/customization.md) for detailed guidance.

### Deployment to AWS S3

1. Create an S3 bucket with static website hosting enabled.
2. Run the deploy script or manually upload files.
3. Set bucket policy for public read access.

See [docs/deployment.md](docs/deployment.md) for step-by-step instructions.

## Contributing

Feel free to submit issues or pull requests for improvements and fixes!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
