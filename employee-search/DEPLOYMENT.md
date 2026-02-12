# Deployment Instructions

## AWS SSO Configuration
```
aws configure sso --profile sansahu
```

## Local Development
```
npm start
```
App runs at: http://localhost:4101
API: http://localhost:5100

## Production Build for AWS
```
npm run build:prod
```
Output: `dist/employee-search/`

## Deploy to S3
```
aws s3 sync dist/employee-search/ s3://pdm-poc-payer-migration --delete --profile sansahu
```

## Get CloudFront Distribution ID
```
aws cloudfront list-distributions --query "DistributionList.Items[?DomainName=='d26vwpezge610k.cloudfront.net'].Id" --output text --profile sansahu
```

## Invalidate CloudFront Cache
```
aws cloudfront create-invalidation --distribution-id E1X7R3DVK2IL9 --paths "/*" --profile sansahu
```

## Environment Configuration
- **Local**: Uses `environment.ts` → http://localhost:5100/api/employee
- **Production**: Uses `environment.prod.ts` → https://d26vwpezge610k.cloudfront.net/api/employee
