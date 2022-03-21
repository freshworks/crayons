#!groovy

def runNPM(command) {
    def NODE_VERSION = 12;
    utilObj = new Utils();
    envVersion = utilObj.getEnvVersion(NODE_VERSION);
    utilObj.runCmd(command, envVersion)
}

def uploadAndInvalidate(environment) {

  def STATIC_ASSETS = [
    staging: [
      bucketName: 'static.freshcloud.io',
      cdnDistributionId: 'E1NTINA3EQZS8T',
      profile: 'default'
    ],
    release: [
      bucketName: 'crayon-freshworks',
      cdnDistributionId: 'E2L2PEITWYW1LM',
      profile: 'prod'
    ]
  ]

  uploadAssetsToS3('www-dist', "s3://${STATIC_ASSETS[environment].bucketName}", 'us-east-1', true, false, 86400, STATIC_ASSETS[environment].profile)
  uploadAssetsToS3('docs/storybook-dist', "s3://${STATIC_ASSETS[environment].bucketName}/storybook", 'us-east-1', true, false, 86400, STATIC_ASSETS[environment].profile)
  invalidateCDN(STATIC_ASSETS[environment].cdnDistributionId, '\"/*\"', STATIC_ASSETS[environment].profile)
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
                runNPM('HUSKY_SKIP_INSTALL=1 npm install')
            }
        }

        stage ('Code Sanity') {
            steps {
                runNPM('npm run code-sanity')
            }
        }

        stage ('Tests') {
            steps {
                runNPM('npm run test')
            }
        }

        stage ('Build') {
            steps {
                runNPM('npm run build')
            }
        }

        stage ('Deploy to Staging') {
            when {
                expression {
                    params.deployTo == 'staging' && BRANCH_NAME == 'master'
                }
            }
            steps {
                uploadAndInvalidate('staging')
            }
        }

        stage ('Deploy to Release') {
            when {
                expression {
                    params.deployTo == 'release' && BRANCH_NAME == 'master'
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
