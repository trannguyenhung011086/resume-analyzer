# resource "docker_registry_image" "backend_resume_analyzer" {
#   name          = "registry.fly.io/${var.app_name}"
#   keep_remotely = false
# }

resource "fly_app" "backend_resume_analyzer" {
  name     = var.app_name
  org      = var.fly_org
}

resource "fly_ip" "ip" {
  app = fly_app.app.name
  type = "v4"
}

resource "fly_machine" "my_machine" {
  app = var.app_name
  image = "registry.fly.io/${var.app_name}:latest"
  region = "hkg"
  services = [
    {
      ports = [
        {
          port     = 443
          handlers = ["tls", "http"]
        },
        {
          port     = 80
          handlers = ["http"]
        }
      ]
      "protocol" : "tcp",
      "internal_port" : 80
    }
 ]
}