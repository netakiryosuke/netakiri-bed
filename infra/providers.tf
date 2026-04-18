provider "aws" {
  region = var.region

  default_tags {
    tags = local.tags
  }
}

provider "aws" {
  alias  = "useast1"
  region = "us-east-1"

  default_tags {
    tags = local.tags
  }
}


terraform {
  backend "s3" {
    #region = ""
    #bucket = ""
    #key    = ""
  }
}
