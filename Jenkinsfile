pipeline {

    agent { label 'linux-slave' }

    stages {

        stage ('test'){
            agent { label 'linux-slave' }
            steps {
                sh "echo POSTMAN_API_KEY=80a856812f61421091e2ccb948296523 > .env"
                sh "echo >> .env"
                sh "echo POSTMAN_COLLECTION_UID=5696387-4787f9ce-1443-403c-8e6a-0f76e0f5a14e >> .env"
                sh "echo >> .env"
                sh "echo POSTMAN_ENVIRONMENT_UID=5696387-b195de02-209e-492c-a81a-1b613e9d59bc >> .env"
                sh "npm i"
                sh "npm run test:ci"
            }
        }

        stage ('build-dev') {
            agent { label 'linux-slave' }
            when { branch "develop" }
            steps {
                script {
                    GIT_SHORT_SHA = sh ( script: "git rev-parse --short HEAD", returnStdout: true ).trim()
                    VERSION = sh ( script: "node -pe \"require('./package.json').version\"", returnStdout: true ).trim()
                    S3_LOC = env.OS_LAUNCHPAD_S3_ROOT + '-dev'
                }
                sh "npm i"
                sh "ENTERPRISE=true NODE_ENV=production DEPLOY_LOCATION=\"https://os-launchpad-dev.openfin.co\" npm run build"
                sh "npm run docs"
                sh "npm run build-storybook"
                sh "echo ${GIT_SHORT_SHA} > ./build/SHA.txt"
                sh "aws s3 cp ./build ${S3_LOC}/ --recursive --exclude '*.svg' --exclude 'app.json'"
                sh "aws s3 cp ./build ${S3_LOC}/ --recursive --exclude '*' --include '*.svg' --content-type 'image/svg+xml'"
                sh "aws s3 cp ./build ${S3_LOC}/ --recursive --exclude '*' --include 'app.json' --content-type 'application/json'"
            }
        }

        stage ('build-prod') {
            agent { label 'linux-slave' }
            when { branch "master" }
            steps {
                script {
                    GIT_SHORT_SHA = sh ( script: "git rev-parse --short HEAD", returnStdout: true ).trim()
                    VERSION = sh ( script: "node -pe \"require('./package.json').version\"", returnStdout: true ).trim()
                    S3_LOC = env.OS_LAUNCHPAD_S3_ROOT
                }
                sh "npm i"
                sh "ENTERPRISE=true NODE_ENV=production DEPLOY_LOCATION=\"https://os-launchpad.openfin.co\" npm run build"
                sh "echo ${GIT_SHORT_SHA} > ./build/SHA.txt"
                sh "aws s3 cp ./build ${S3_LOC}/ --recursive --exclude '*.svg' --exclude 'app.json'"
                sh "aws s3 cp ./build ${S3_LOC}/ --recursive --exclude '*' --include '*.svg' --content-type 'image/svg+xml'"
                sh "aws s3 cp ./build ${S3_LOC}/ --recursive --exclude '*' --include 'app.json' --content-type 'application/json'"
            }
        }
    }
}
