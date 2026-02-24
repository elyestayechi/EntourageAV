"""
Run this once to set CORS on your Tigris bucket.
Usage: python set_bucket_cors.py

Set these env vars first (or hardcode temporarily):
  S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY, S3_REGION, S3_BUCKET
"""

import os
import boto3
from botocore.client import Config

s3 = boto3.client(
    "s3",
    endpoint_url=os.environ["S3_ENDPOINT"],
    aws_access_key_id=os.environ["S3_ACCESS_KEY"],
    aws_secret_access_key=os.environ["S3_SECRET_KEY"],
    region_name=os.environ.get("S3_REGION", "auto"),
    config=Config(signature_version="s3v4"),
)

bucket = os.environ["S3_BUCKET"]

cors_config = {
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "HEAD"],
            "AllowedOrigins": [
                "https://entourage-av.vercel.app",
                "http://localhost:3000",
                "http://localhost:5173",
            ],
            "ExposeHeaders": ["ETag", "Content-Length", "Content-Type"],
            "MaxAgeSeconds": 86400,
        }
    ]
}

s3.put_bucket_cors(Bucket=bucket, CORSConfiguration=cors_config)
print(f"✅ CORS set on bucket: {bucket}")

# Verify
result = s3.get_bucket_cors(Bucket=bucket)
print("Current CORS rules:", result["CORSRules"])