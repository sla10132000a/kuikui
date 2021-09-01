locals {
  tags = {
    Environment = var.env
    Application = var.app_name
    Terraform   = true
  }

  ########################################
  # VPC
  ########################################
  vpc_name = "vpc-${var.region_tag[var.region]}-${var.env}-${var.app_name}"
  vpc_tags = merge(
    local.tags,
    tomap({
        "VPC-Name" = local.vpc_name
    })
  )

  databse_computed_ingress_with_eks_worker_source_security_group_ids = var.create_eks ? [
    {
      rule                     = "mongodb-27017-tcp"
      source_security_group_id = module.eks.worker_security_group_id
      description              = "mongodb-27017 from EKS SG in private subnet"
    },
    {
      rule                     = "mongodb-27018-tcp"
      source_security_group_id = module.eks.worker_security_group_id
      description              = "mongodb-27018 from EKS SG in private subnet"

    },
    {
      rule                     = "mongodb-27019-tcp"
      source_security_group_id = module.eks.worker_security_group_id
      description              = "mongodb-27019 from EKS SG in private subnet"
    }
  ] : []


  ########################################
  # EKS
  ########################################
  ## EKS ##
  cluster_name = "eks-${var.region_tag[var.region]}-${var.env}-${var.app_name}"

  eks_tags = {
    Environment = var.env
    Application = var.app_name
  }

  kubeconfig_aws_authenticator_env_variables = var.authenticate_using_aws_profile == true ? {
    AWS_PROFILE = var.profile_name
  } : {}
}

data "aws_caller_identity" "this" {}

data "aws_eks_cluster" "cluster" {
  count = var.create_eks ? 1 : 0
  name  = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "cluster" {
  count = var.create_eks ? 1 : 0
  name  = module.eks.cluster_id
}