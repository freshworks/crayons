#!groovy

def NODE_VERSION = 10;
def STATIC_ASSETS = [
  staging: [
    bucketName: 'static.freshcloud.io',
    cdnDistributionId: 'E1NTINA3EQZS8T'
  ],
  release: [
    bucketName: 'static.freshdev.io',
    cdnDistributionId: 'E2049NOS2OZD9B'
  ]
]

def uploadAndInvalidate(environment) {
  def s3Path = "/freshworks-ui-kit"

  uploadAssetsToS3('dist/freshworks-ui-kit', "s3://${STATIC_ASSETS[environment].bucketName}${s3Path}", 'us-east-1', true)
  uploadAssetsToS3('docs-dist', "s3://${STATIC_ASSETS[environment].bucketName}${s3Path}/docs", 'us-east-1', true)
  uploadAssetsToS3('storybook-dist', "s3://${STATIC_ASSETS[environment].bucketName}${s3Path}/storybook", 'us-east-1', true)
  // invalidateCDN(STATIC_ASSETS[environment].cdnDistributionId, "${s3Path}/*")
}

pipeline {

    agent any

    parameters {
        choice(choices: 'staging\nrelease', description: 'Deploys the UI Kit to Staging or Release', name: 'deployTo')
    }

    stages {
        stage('Checkout & Setup') {
            steps {
                checkoutCode(NODE_VERSION)
            }
        }

        // stage ('Code Sanity') {
        //     steps {
        //         doCodeSanity(NODE_VERSION)
        //     }
        // }

        // stage ('Unit Tests') {
        //     steps {
        //         runUnitTests(NODE_VERSION)
        //     }
        // }

        stage ('Build') {
            steps {
                buildProject(NODE_VERSION)
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

        stage('Publish Reports') {
            steps {
                publishHTMLReport()
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
