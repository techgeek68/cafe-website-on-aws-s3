# Create S3 bucket (us-east-1)
aws s3api create-bucket --bucket labbucket-666 --region us-east-1

# Create S3 bucket (us-west-2)
aws s3api create-bucket --bucket labbucket-777 --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2

# Remove block public access
aws s3api put-public-access-block \
  --bucket labbucket-666 \
  --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false

aws s3api put-public-access-block \
  --bucket labbucket-777 \
  --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false

# Upload website files
aws s3 cp ~/awsS3staticwebsite/cafe-website-on-aws-s3 s3://labbucket-666/ --recursive

# Enable static website hosting
aws s3 website s3://labbucket-666 --index-document index.html --error-document error.html

# Apply bucket policy
aws s3api put-bucket-policy --bucket labbucket-666 --policy file://bucket-policy.json

# Get website endpoint
aws s3api get-bucket-website --bucket labbucket-666

# Enable versioning
aws s3api put-bucket-versioning --bucket labbucket-666 --versioning-configuration Status=Enabled

# Upload new version of index.html
aws s3 cp ~/awsS3staticwebsite/index.html s3://labbucket-666/index.html

# List object versions
aws s3api list-object-versions --bucket labbucket-666 --prefix index.html

# Apply lifecycle policy
aws s3api put-bucket-lifecycle-configuration --bucket labbucket-666 --lifecycle-configuration file://lifecycle.json
aws s3api get-bucket-lifecycle-configuration --bucket labbucket-666

# Create destination bucket for replication
aws s3api create-bucket --bucket labbucket-backup-666 --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2
aws s3api put-bucket-versioning --bucket labbucket-backup-666 --versioning-configuration Status=Enabled

# Apply replication configuration
aws s3api put-bucket-replication --bucket labbucket-666 --replication-configuration file://replication.json

# Test replication
aws s3 ls s3://labbucket-backup-666/

# Remove all files
aws s3 rm s3://labbucket-666 --recursive

# Delete bucket
aws s3api delete-bucket --bucket labbucket-666 --region us-east-1