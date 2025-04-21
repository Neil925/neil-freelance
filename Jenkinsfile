pipeline {
  agent any

    stages {
      stage('Checkout') {
        steps {
          checkout scm
        }
      }

      stage('Install') {
        steps {
          sh 'npm ci'
        }
      }

      stage('Migrate DB') {
        steps {
          sh 'npx prisma migrate deploy'
        }
      }


      stage('Build') {
        steps {
          sh 'npm run build'
        }
      }

      stage('Deploy') {
        steps {
          sh 'npm run start'
        }
      }
    }

  post {
    success {
      echo 'Build finished successfully!'
    }
    failure {
      echo 'Build failed.'
    }
  }
}

