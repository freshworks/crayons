#!groovy

def NODE_VERSION = 10;

def setNVM() {
    sh """#!/bin/bash --login
        set -e
        source /home/jenkins/.nvm/nvm.sh
        nvm use ${NODE_VERSION}
        """
}

def uploadAndInvalidate(environment) {
  def s3Path = "/crayons"

  def STATIC_ASSETS = [
    staging: [
      bucketName: 'static.freshcloud.io',
      cdnDistributionId: 'E1NTINA3EQZS8T',
      profile: 'default'
    ],
    release: [
      bucketName: 'static.freshdev.io',
      cdnDistributionId: 'E2049NOS2OZD9B',
      profile: 'prod'
    ]
  ]

  uploadAssetsToS3('dist/crayons', "s3://${STATIC_ASSETS[environment].bucketName}${s3Path}", 'us-east-1', true, false, 86400, STATIC_ASSETS[environment].profile)
  uploadAssetsToS3('docs-dist', "s3://${STATIC_ASSETS[environment].bucketName}${s3Path}/docs", 'us-east-1', true, false, 86400, STATIC_ASSETS[environment].profile)
  uploadAssetsToS3('storybook-dist', "s3://${STATIC_ASSETS[environment].bucketName}${s3Path}/storybook", 'us-east-1', true, false, 86400, STATIC_ASSETS[environment].profile)
  invalidateCDN(STATIC_ASSETS[environment].cdnDistributionId, "${s3Path}/*", STATIC_ASSETS[environment].profile)
}

pipeline {

    agent any

    parameters {
        choice(choices: 'None\nstaging\nrelease', description: 'Deploys the UI Kit to Staging or Release', name: 'deployTo')
    }

    stages {
        stage('Checkout & Setup') {
            steps {
                checkout scm
                setNVM()
                sh "npm install"
            }
        }

        stage ('Code Sanity') {
            steps {
                setNVM()
                sh "npm run code-sanity"
            }
        }

        stage ('Tests') {
            steps {
                setNVM()
                sh "npm run test"
            }
        }

        stage ('Build') {
            steps {
                setNVM()
                sh "npm run build"
            }
        }

        stage ('Deploy to Staging') {
            when {
                expression {
                    params.deployTo == 'staging'
                }
            }
            steps {
                uploadAndInvalidate('staging')
            }
        }

        stage ('Deploy to Release') {
            when {
                expression {
                    params.deployTo == 'release'
                }
            }
            steps {
                uploadAndInvalidate('release')
            }
        }

    }

    post {
        always {
            sendEmail()
            deleteDir()
        }
    }
}
