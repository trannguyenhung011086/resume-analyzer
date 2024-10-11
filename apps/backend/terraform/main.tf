resource "docker_image" "my_image" {
  name         = "registry.fly.io/${var.app_name}:${formatdate("YYYYMMDDhhmmss", timestamp())}"
  build {
    context     = "app"
    dockerfile  = "Dockerfile"
    pull_parent = true
    platform    = "linux/amd64"
  }
}

resource "docker_registry_image" "my_registry_image" {
  name          = docker_image.my_image.name
  keep_remotely = false
}

resource "fly_app" "backend_resume_analyzer" {
  name     = var.app_name
  org      = var.fly_org
}
