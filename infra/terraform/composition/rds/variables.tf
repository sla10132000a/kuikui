########################################
# Variables
########################################
variable "region" {
  type = string
  default = "ap-northeast-1"
}

variable "profile_name" {
  type = string
}

variable "subnet_ids" {
  description = "A list of public subnets inside the VPC"
  default     = []
}