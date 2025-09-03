# Deploying Cafe Website to AWS S3

## 1. Create an S3 Bucket

- Log in to AWS Console.
- Go to S3 and create a new bucket.
- Enable static website hosting in bucket properties.

## 2. Set Bucket Policy

- Allow public read access for static file hosting.

## 3. Upload Files

- Use AWS CLI:
  ```bash
  aws s3 sync . s3://YOUR_BUCKET_NAME --exclude ".git/*" --delete
  ```
- Or upload via AWS Console.

## 4. Access Your Site

- Find the Bucket Website Endpoint in S3 settings and open in browser.

## 5. (Optional) Automatic Deployment

- Use the provided GitHub Actions workflow for CI/CD to S3 when you push to `main`.

## Troubleshooting

- Ensure all files are in the root or correct folders.
- Check permissions if your site does not load correctly.
