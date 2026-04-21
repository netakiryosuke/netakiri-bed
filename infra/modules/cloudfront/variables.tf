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

variable "function_name_prefix" {
  type = string
}

