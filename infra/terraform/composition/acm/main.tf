########################################
# AWS Terraform backend composition
########################################
module "terraform_acm" {
  source   = "../../infrastructure_modules/acm"
  domain = var.domain
}