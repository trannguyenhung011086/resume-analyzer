# resource "docker_registry_image" "backend_resume_analyzer" {
#   name          = "registry.fly.io/${var.app_name}"
#   keep_remotely = false
# }

resource "fly_app" "backend_resume_analyzer" {
  name     = var.app_name
  org      = var.fly_org
}

resource "fly_ip" "exampleIpv4" {
  app = var.app_name
  type = "v4"
  depends_on = [fly_app.backend_resume_analyzer]
}

resource "fly_ip" "exampleIpv6" {
  app        = var.app_name
  type       = "v6"
  depends_on = [fly_ip.exampleIpv4]
}

resource "fly_machine" "my_machine" {
  app = var.app_name
  image = "registry.fly.io/${var.app_name}:latest"
  # image = "nginx" 
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
    },
    {
      ports = [
        {
          port     = 8080
          handlers = ["tls", "http"]
        },
        {
          port     = 8081
          handlers = ["http"]
        }
      ]
      "protocol" : "tcp",
      "internal_port" : 8089
    }
  ]
}