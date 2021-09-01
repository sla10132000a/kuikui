########################################
# AWS Terraform backend composition
########################################

module "db" {
  source   = "../../infrastructure_modules/rds"

  subnet_ids = var.subnet_ids
}