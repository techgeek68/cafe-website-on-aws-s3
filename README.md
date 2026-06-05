# Bake&Brew — Cafe Website on AWS S3

A modern, responsive cafe website for **Bake&Brew** — featuring artisanal pastries and Himalayan specialty coffee in Kathmandu. Designed for easy customization and fast static hosting on AWS S3, complete with automation scripts for bucket setup, versioning, lifecycle policies, and cross-region replication.

![HTML](https://img.shields.io/badge/HTML-28.8%25-orange?style=flat-square)
![CSS](https://img.shields.io/badge/CSS-46.5%25-blue?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-17.1%25-yellow?style=flat-square)
![Shell](https://img.shields.io/badge/Shell-7.6%25-green?style=flat-square)

---

## Features

- Responsive, mobile-friendly design
- Easy to customize (HTML, CSS, images)
- Fast static hosting on AWS S3
- Sections for menu highlights, about us, and contact
- Interactive image zoom modal
- Smooth fade-in animations and back-to-top button
- Shell automation script for full AWS S3 setup
- S3 bucket policy for public read access
- S3 versioning, lifecycle rules, and cross-region replication support

---

## Technologies Used

| Layer | Technology |
|-------|-----------|
| Structure | HTML (`index.html`) |
| Styling | CSS (`css/styles.css`) — 46.5% of codebase |
| Interactivity | JavaScript (`js/main.js`) |
| Cloud Hosting | AWS S3 (static website hosting) |
| Automation | Shell (`create-bucket.sh`) |

---

## Folder Structure

```
bake-and-brew-website-on-aws-s3/
├── index.html                                # Main cafe website page
├── css/
│   └── styles.css                            # All styles and responsive design
├── js/
│   └── main.js                               # Image zoom, animations, back-to-top
├── images/                                   # Cafe photos and menu images
├── bucket-policy.json                        # S3 public read bucket policy
├── lifecycle.json                            # S3 lifecycle configuration
├── replication.json                          # S3 cross-region replication config
├── create-bucket.sh                          # Shell script: full AWS S3 setup
├── aws-s3-static-website-guide_Version2.md  # Step-by-step deployment guide
├── README.md
└── LICENSE
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/techgeek68/bake-and-brew-website-on-aws-s3.git
cd bake-and-brew-website-on-aws-s3
```

### 2. Customize the Site

- Edit `index.html` to update the cafe name, menu items, hours, and contact details.
- Modify styles in `css/styles.css` to match your branding.
- Replace images in `images/` with your own cafe photos.
- Update `js/main.js` for any custom interactions.

### 3. Deploy to AWS S3

**Option A — Follow the Guide:**  
See [`aws-s3-static-website-guide_Version2.md`](aws-s3-static-website-guide_Version2.md) for a complete step-by-step walkthrough.

**Option B — Use the Shell Script:**  
[`create-bucket.sh`](create-bucket.sh) automates the full S3 setup. Review and update the bucket names inside the script, then run:

```bash
bash create-bucket.sh
```

The script handles:

- Creating S3 buckets in `us-east-1` (primary) and `us-west-2` (secondary)
- Removing public access blocks
- Uploading website files
- Enabling static website hosting
- Applying the bucket policy (`bucket-policy.json`)
- Enabling versioning and uploading new file versions
- Applying lifecycle rules (`lifecycle.json`)
- Setting up cross-region replication (`replication.json`)

---

## AWS S3 Configuration Files

| File | Purpose |
|------|---------|
| `bucket-policy.json` | Grants public `s3:GetObject` access for static website hosting |
| `lifecycle.json` | Defines object lifecycle rules (transitions, expiration) |
| `replication.json` | Configures cross-region replication to a backup bucket |

---

## About Bake&Brew

Bake&Brew is a cozy café located in **Bishalnagar, Chandol, Kathmandu, Nepal**, run by the Shrestha family since 2016. The café serves artisanal pastries, fresh breads, and Himalayan specialty coffee.

**Hours:**
- Weekdays: 6:00 AM – 6:00 PM
- Sunday: 7:00 AM – 7:00 PM
- Closed on Saturday

---

## Contributing

Contributions, suggestions, and improvements are welcome! Please fork the repo and open a pull request.

---

## License

MIT License — see [LICENSE](LICENSE)
