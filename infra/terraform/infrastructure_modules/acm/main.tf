
locals {
  # Use existing (via data source) or create new zone (will fail validation, if zone is not reachable)
  use_existing_route53_zone = true

  domain = var.domain

  # Removing trailing dot from domain - just to be sure :)
  domain_name = trimsuffix(var.domain, ".")
}

resource "aws_route53_zone" "this" {
  name  = local.domain_name
}

data "aws_route53_zone" "this" {
  name         = aws_route53_zone.this.name
  private_zone = false
}

module "acm" {
  source = "terraform-aws-modules/acm/aws"

  domain_name = local.domain_name
  zone_id     = coalescelist(data.aws_route53_zone.this.*.zone_id, aws_route53_zone.this.*.zone_id)[0]

  subject_alternative_names = [
    "*.alerts.${local.domain_name}",
    "new.sub.${local.domain_name}",
    "*.${local.domain_name}",
    "alerts.${local.domain_name}",
  ]

  wait_for_validation = true

  tags = {
    Name = local.domain_name
  }
}