# CF-Cache-UI

## Architecture
ProviderView Hosting Entry Pattern with:
- Single CloudFront Distribution (UI + API Behaviors)
- Lambda@Edge for tenant validation and header injection
- S3 with Cross-Region Replication (us-east-2 primary, us-west-2 secondary)
- ALB Origin Group with failover
- Secrets Manager for API keys

## Deployment

### S3 Bucket
- **Primary**: `pdm-poc-payer-migration` (us-east-2)
- **Secondary**: CRR to us-west-2

### CloudFront Distribution
- **Distribution ID**: E1X7R3DVK2IL9
- **Behavior A (UI)**: Path `/*` → S3 with Origin Access Control
- **Behavior B (API)**: Path `/api/*` → ALB with Lambda@Edge

### Deployment Steps
1. Build Angular app:
   ```bash
   cd employee-search
   npm run build
   ```

2. Sync to S3:
   ```bash
   aws s3 sync dist/employee-search s3://pdm-poc-payer-migration --region us-east-2 --delete
   ```

3. Invalidate CloudFront cache:
   ```bash
   aws cloudfront create-invalidation --distribution-id E1X7R3DVK2IL9 --paths "/*" --profile sansahu
   ```

## Features
- Employee Search (route: `/search`)
- Image Management (route: `/images`) - Upload, Search, Download, Delete
- Multi-tenant support via Lambda@Edge
- Tenant-scoped caching with X-Tenant-Id header

## Deployment History
- **2026-03-13 10:38 UTC**: Added Image Management feature, deployed to S3, invalidated CF cache (Invalidation ID: I4CKITHIZCLR6TYVN3V1ARYRAF)
- **2026-03-13 11:04 UTC**: Added Dashboard component for navigation between Employee Search and Image Management, deployed to S3, invalidated CF cache (Invalidation ID: IBZ8ZRNT0DJ74HZLGH8CXBCEKR)
- **2026-03-13 11:08 UTC**: Added Refresh button to Image Management, removed auto-fetch after upload, deployed to S3, invalidated CF cache (Invalidation ID: I693WOVCBSTN9CIM6CM5JL9FC8)
- **2026-03-13 11:13 UTC**: Fixed image service to use {tenantId} placeholder for Lambda@Edge injection, added search by ID functionality, deployed to S3, invalidated CF cache (Invalidation ID: IS4J1A4C0SEQ3677QNXO50IEY)