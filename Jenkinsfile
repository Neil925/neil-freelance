pipeline {
  agent any

    environment {
      WEBHOOK_URL   = credentials('freelance-webook')
      DATABASE_URL  = credentials('freelance-database-url')
      AUTH_SECRET   = credentials('freelance-auth-secret')
    }

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

