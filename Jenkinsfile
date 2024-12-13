pipeline {
    agent any

    environment {
        REPO_NAME = 'nestjs-be-mvc'
        DOCKER_CREDENTIAL_ID = 'nestjs_be'
        DOCKER_IMAGE = 'nestjs_be'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/kelvinward1010/nestjs-be-mvc.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'docker-compose run nestjs_be npm test'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_CREDENTIAL_ID) {
                        docker.build("${DOCKER_IMAGE}:${env.BUILD_ID}").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
