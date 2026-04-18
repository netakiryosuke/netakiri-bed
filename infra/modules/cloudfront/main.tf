# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution
resource "aws_cloudfront_distribution" "main" {
  enabled             = true
  default_root_object = var.default_root_object

  origin {
    domain_name              = var.bucket_regional_domain_name
    origin_id                = var.origin_id
    origin_access_control_id = var.oac_id
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/${var.default_root_object}"
  }

  default_cache_behavior {
    allowed_methods = var.allowed_methods
    cached_methods  = var.cached_methods

    target_origin_id = var.origin_id

    viewer_protocol_policy = var.viewer_protocol_policy

    min_ttl     = var.min_ttl
    default_ttl = var.default_ttl
    max_ttl     = var.max_ttl

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = [var.domain_name]

  viewer_certificate {
    acm_certificate_arn = var.acm_certificate_arn
    ssl_support_method  = "sni-only"
  }
}
