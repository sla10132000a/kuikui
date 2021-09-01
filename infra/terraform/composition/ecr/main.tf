########################################
# AWS Terraform backend composition
########################################

module "terraform_remote_backend" {
  source   = "../../../../infrastructure_modules/ecr"
  region = "ap-northeast-1"
  image_name = "nodejs"
  domain = "./test"
}
