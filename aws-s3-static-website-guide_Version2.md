# Deploy, Manage, and Clean Up a Static Website in Amazon S3 with AWS CLI

---

## Prerequisites

- **AWS CLI installed**  
  *You must have the AWS CLI tool installed on your machine to interact with AWS services via the command line.*  
  [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

- **AWS CLI configured**  
  *Configure your AWS credentials so the CLI commands can access your AWS account.*  
  Run:
  ```bash
  aws configure
  ```
  Enter your AWS Access Key, Secret Key, default region (e.g., `us-east-1`), and output format (`json` is recommended).
  
Verify configuration:
```
 aws configure list
```
```
 aws sts get-caller-identity
```

- **Website Files**  
  *Prepare your static website files locally (e.g., `index.html`, `images/`, etc.).*
```
 mkdir awsS3staticwebsite
```
```
 cd awsS3staticwebsite
```
```
 git clone 
```
---

## Step 1: Create an S3 Bucket (Website Hosting)

*Create a new S3 bucket to store and serve your website files. Bucket names must be globally unique. This is the main container for your website's data in S3.*

Syntax:
```bash
aws s3api create-bucket --bucket <your-bucket-name> --region us-east-1
```
> For `us-east-1`, omit `--create-bucket-configuration`.  
For other regions, add:  
`--create-bucket-configuration LocationConstraint=<region>`

Example 1: Bucket in us-east-1
```
aws s3api create-bucket --bucket labbucket-666 --region us-east-1
```
Example 2: Bucket in us-west-2
```
aws s3api create-bucket --bucket labbucket-777 --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2
```

---

## Step 2: Remove Block Public Access

*By default, S3 buckets block public access to prevent unwanted exposure. You must disable these settings so visitors can access your website files.*

Syntax:
```bash
aws s3api put-public-access-block \
  --bucket <your-bucket-name> \
  --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false
```

Example 1:
```
aws s3api put-public-access-block \
  --bucket labbucket-666 \
  --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false
```
Example 2:
```
aws s3api put-public-access-block \
  --bucket labbucket-777 \
  --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false
```
---

## Step 3: Upload Website Files

*Copy your local website files into the S3 bucket so they can be served to users. This uploads all your site files, such as HTML, CSS, JS, and images.*

Syntax:
```bash
aws s3 cp ./<dir_name> s3://<your-bucket-name>/ --recursive
```
Example:
```
 cd awsS3staticwebsite
```
```
aws s3 cp ~/awsS3staticwebsite s3://labbucket-666/ --recursive
```

---

## Step 4: Enable Static Website Hosting

*Configure the bucket to serve static website content. This tells S3 to treat your files as a website and defines the main page (`index.html`) and an error page.*

Syntax:
```bash
aws s3 website s3://<your-bucket-name>/ --index-document index.html --error-document error.html
```
> If you don’t have `error.html`, omit `--error-document error.html`.

---

## Step 5: Set Bucket Policy for Public Read Access

*Allow everyone to read files in your bucket, so your website is publicly accessible. This step applies a policy that grants public read permissions to all objects.*
Syntax:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<your-bucket-name>/*"
    }
  ]
}
```
Example: Create a file `vim bucket-policy.json`:
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::labbucket-666/*"
    }
  ]
}
```

Apply the policy:

Syntax:
```bash
aws s3api put-bucket-policy --bucket <your-bucket-name> --policy file://bucket-policy.json
```
Example:
```
aws s3api put-bucket-policy --bucket labbucket-666 --policy file://bucket-policy.json
```

---

## Step 6: Get Website Endpoint

*Retrieve the URL where your static website is hosted so you can visit it in a browser. This command shows the endpoint address for your hosted website.*

```bash
aws s3api get-bucket-website --bucket <your-bucket-name>
``` 
Example output: 
```
http://<your-bucket-name>.s3-website-<region>.amazonaws.com
```
- Open it in a browser to view your site.

---

## Step 7: Enable Versioning (Data Protection)

*Turn on versioning to protect against accidental overwrites and deletions. S3 will keep all versions of your files, improving data safety and recovery.*
Syntax:
```bash
aws s3api put-bucket-versioning --bucket <your-bucket-name> --versioning-configuration Status=Enabled
```
Example:
aws s3api put-bucket-versioning --bucket labbucket-666 --versioning-configuration Status=Enabled

---

## Step 8: Upload New Version of a File

*Update your website by uploading a new version of a file (for example, after editing `index.html`). S3 will keep old versions automatically if versioning is enabled.*
Syntax:
```bash
aws s3 cp ./<dir_name/index.html> s3://<your-bucket-name>/index.html
```
Example:
```
 cd awsS3staticwebsite
```
```
vi index.html
```
```
 Change or update something !!
```
```
 aws s3 cp ~/awsS3staticwebsite/index.html s3://labbucket-666/index.html
```

---

## Step 9: List Object Versions

*See all versions of a file in your bucket, which helps track changes, audit modifications, and recover previous states if needed.*
Syntax:
```bash
aws s3api list-object-versions --bucket <your-bucket-name> --prefix index.html
```
Example:
```
aws s3api list-object-versions --bucket labbucket-666 --prefix index.html
```
- Shows all versions of `index.html`.

---

## Step 10: Set Lifecycle Policies (Cost Optimization)

*Manage storage costs by setting rules to move older file versions to cheaper storage or delete them automatically. This helps optimize costs over time.*

Create `vim lifecycle.json`:

```json
{
  "Rules": [
    {
      "ID": "MoveOldVersionsToIA",
      "Status": "Enabled",
      "Filter": {
        "Prefix": ""
      },
      "NoncurrentVersionTransitions": [
        {
          "NoncurrentDays": 30,
          "StorageClass": "STANDARD_IA"
        }
      ]
    },
    {
      "ID": "DeleteOldVersions",
      "Status": "Enabled",
      "Filter": {
        "Prefix": ""
      },
      "NoncurrentVersionExpiration": {
        "NoncurrentDays": 365
      }
    }
  ]
}
```

Apply:

Syntax:
```bash
aws s3api put-bucket-lifecycle-configuration --bucket <your-bucket-name> --lifecycle-configuration file://lifecycle.json
```
Example:
```
aws s3api put-bucket-lifecycle-configuration --bucket labbucket-666 --lifecycle-configuration file://lifecycle.json
```

---

## Step 11: Cross-Region Replication (Disaster Recovery)

*Set up automatic copying of your files to a bucket in another AWS region for backup and disaster recovery. This protects your site from regional outages.*

### a. Create Destination Bucket in Another Region

*Create a second bucket in a different region and enable versioning on it. This is where your backup copies will be stored.*

```bash
aws s3api create-bucket --bucket <your-backup-bucket-name> --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2
```
```
aws s3api put-bucket-versioning --bucket <your-backup-bucket-name> --versioning-configuration Status=Enabled
```
Example:
```
aws s3api create-bucket --bucket labbucket-backup-666 --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2
```
```
aws s3api put-bucket-versioning --bucket labbucket-backup-666 --versioning-configuration Status=Enabled
```

### b. Create IAM Role for Replication

*Create an IAM role with permissions for S3 replication. This role allows S3 to automatically copy files between buckets. Follow AWS documentation for the exact JSON.*

### c. Replication Configuration

*Configure your source bucket to replicate all objects to the destination bucket using the IAM role. This sets the rules for cross-region backup.*

Create `replication.json` (replace with your Account ID and ARNs):

```json
{
  "Role": "arn:aws:iam::<account-id>:role/CafeRole",
  "Rules": [
    {
      "ID": "ReplicateAll",
      "Status": "Enabled",
      "Filter": {},
      "Destination": {
        "Bucket": "arn:aws:s3:::<your-backup-bucket-name>",
        "StorageClass": "STANDARD"
      },
      "DeleteMarkerReplication": {
        "Status": "Enabled"
      }
    }
  ]
}
```
Apply:

```bash
aws s3api put-bucket-replication --bucket <your-bucket-name> --replication-configuration file://replication.json
```

---

## Step 12: Test Replication

*Make sure replication works by uploading a new file version and checking if it appears in the destination bucket. This confirms your backup is active.*

- Upload a new version of `index.html` to the source bucket.
- After a few minutes, check the backup bucket:

```bash
aws s3 ls s3://<your-backup-bucket-name>/
```

---

# Clean Up: Remove Files and Delete Buckets

## Remove All Files

*Delete all files from your bucket to avoid extra charges or prepare for removing the bucket. This erases all objects in your bucket.*

```bash
aws s3 rm s3://<your-bucket-name> --recursive
```

## Delete Bucket

*Remove the empty bucket from your AWS account to fully clean up your resources. Make sure the bucket is empty before deletion.*

```bash
aws s3api delete-bucket --bucket <your-bucket-name> --region us-east-1
```
- Change region for backup bucket as needed.

---