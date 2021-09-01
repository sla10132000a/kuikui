module "database_security_group" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "database_security_group"
  description = "database_security_group"
  vpc_id      = "vpc-03c7b10cacf8138d3"

  ingress_rules= ["mysql-tcp"]
  ingress_cidr_blocks      = ["0.0.0.0/0"]
  # allow all egress
  egress_rules = ["all-all"]
  # tags         = local.db_security_group_tags
}

module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 3.0"

  identifier = "mysqldb"

  engine            = "mysql"
  engine_version    = "5.7.19"
  instance_class    = "db.t2.micro"
  allocated_storage = 5

  name     = "mysqldb"
  username = "username"
  password = "password"
  port     = "3306"

  iam_database_authentication_enabled = true

  vpc_security_group_ids = [module.database_security_group.security_group_id]

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"

  monitoring_interval = "30"
  monitoring_role_name = "MyRDSMonitoringRole1"
  create_monitoring_role = true

  tags = {
    Owner       = "user"
    Environment = "dev"
  }

  # DB subnet group
  # subnet_ids = ["subnet-03b39336d424df640", "subnet-06eae98ae7fe99819"]
  subnet_ids = var.subnet_ids

  # DB parameter group
  family = "mysql5.7"

  # DB option group
  major_engine_version = "5.7"

  # Database Deletion Protection
  deletion_protection = false

  parameters = [
    {
      name = "character_set_client"
      value = "utf8mb4"
    },
    {
      name = "character_set_server"
      value = "utf8mb4"
    }
  ]

  options = [
    {
      option_name = "MARIADB_AUDIT_PLUGIN"

      option_settings = [
        {
          name  = "SERVER_AUDIT_EVENTS"
          value = "CONNECT"
        },
        {
          name  = "SERVER_AUDIT_FILE_ROTATIONS"
          value = "37"
        },
      ]
    },
  ]
}
