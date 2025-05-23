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

    stage('Build Image') {
      steps {
        sh 'docker build -t freelance-app .'
      }
    }

    stage('Run Container') {
      steps {
        sh 'docker stop freelance-app || true && docker rm freelance-app || true'
          sh '''
          docker run -d \
          -p 3000:3000 \
          --name freelance-app \
          --network elk_elk \
          -e DATABASE_URL=$DATABASE_URL \
          -e AUTH_SECRET=$AUTH_SECRET \
          -e WEBHOOK_URL=$WEBHOOK_URL \
          freelance-app
          '''      }
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

