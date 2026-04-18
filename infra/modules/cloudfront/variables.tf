variable "bucket_regional_domain_name" {
  type = string
}

variable "origin_id" {
  type = string
}

variable "oac_id" {
  type = string
}

variable "domain_name" {
  type = string
}

variable "acm_certificate_arn" {
  type = string
}

variable "default_root_object" {
  type    = string
  default = "index.html"
}

variable "allowed_methods" {
  type    = list(string)
  default = ["GET", "HEAD"]
}

variable "cached_methods" {
  type    = list(string)
  default = ["GET", "HEAD"]
}

variable "viewer_protocol_policy" {
  type    = string
  default = "redirect-to-https"
}

variable "min_ttl" {
  type    = number
  default = 0
}

variable "default_ttl" {
  type    = number
  default = 3600
}

variable "max_ttl" {
  type    = number
  default = 86400
}
