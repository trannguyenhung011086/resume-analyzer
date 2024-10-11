data "docker_image" "local_image" {
  name = "resume_analyzer"
}

resource "docker_container" "resume_analyzer_api" {
  image = data.docker_image.local_image.resume_analyzer  # Uses output from data source
  name         = "resume_analyzer_api"
  build {
    context    = "${path.module}/../Dockerfile"
    dockerfile = "Dockerfile"
  }
  ports {
    internal = 3000
    external = 3000
  }
}

resource "fly_app" "backend_resume_analyzer" {
  name     = "backend_resume_analyzer"
  org      = "Personal"

  config {
    image = "resume_analyzer_api"
    environment_variables = {
      NODE_ENV = "production"
      OPEN_AI_API_KEY = var.OPEN_AI_API_KEY
    }
  }
}
