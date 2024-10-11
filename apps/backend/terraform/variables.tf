variable "FLY_API_TOKEN" {
  type        = string
  sensitive   = true
}

variable "OPEN_AI_API_KEY" {
  type        = string
  sensitive   = true
}

variable "app_name" {
  default = "resume-analyzer-api"
}

variable "fly_org" {
  default = "personal"
}

variable "fly_workspace" {
  default = "resume-analyzer"
}