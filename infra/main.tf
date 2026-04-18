data "aws_route53_zone" "main" {
  name = var.domain_name
}

module "s3" {
  source = "./modules/s3"

  bucket_name = "${var.project}-bucket"
  oac_name    = "${var.project}-oac"
}

module "acm" {
  source = "./modules/acm"

  providers = {
    aws         = aws
    aws.useast1 = aws.useast1
  }

  domain_name = var.domain_name
  zone_id     = data.aws_route53_zone.main.zone_id
}

module "cloudfront" {
  source = "./modules/cloudfront"

  bucket_regional_domain_name = module.s3.bucket_regional_domain_name
  origin_id                   = "${var.project}-s3-origin"
  oac_id                      = module.s3.oac_id
  domain_name                 = var.domain_name
  acm_certificate_arn         = module.acm.certificate_arn
}

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_policy
resource "aws_s3_bucket_policy" "main" {
  bucket = module.s3.bucket_id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontAccess"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${module.s3.bucket_arn}/*"
      Condition = {
        StringEquals = { "AWS:SourceArn" = module.cloudfront.arn }
      }
    }]
  })
}

module "dns" {
  source = "./modules/dns"

  zone_id                   = data.aws_route53_zone.main.zone_id
  domain_name               = var.domain_name
  cloudfront_domain_name    = module.cloudfront.domain_name
  cloudfront_hosted_zone_id = module.cloudfront.hosted_zone_id
}
