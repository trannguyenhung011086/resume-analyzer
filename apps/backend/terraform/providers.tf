provider "docker" {
  host = "unix:///var/run/docker.sock" # For macOS/Linux
}

terraform {
  backend "remote" {
    organization = "Personal_Hung"
    workspaces {
      name = "resume-analyzer"
    }
  }
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
    fly = {
      source = "fly-apps/fly"
      version = "0.0.7"
    }
  }
}

provider "fly" {
  fly_api_token = var.FLY_API_TOKEN
}
