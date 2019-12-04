#!groovy

def NODE_VERSION = 10;
def STATIC_ASSETS = [
  dev: [
    bucketName: 'static-dev.freshcloud.io',
    cdnDistributionId: 'E22F4XS4AW1DBF'
  ],
  staging: [
    bucketName: 'static.freshcloud.io',
    cdnDistributionId: 'E1NTINA3EQZS8T'
  ],
  release: [
    bucketName: 'static.freshdev.io',
    cdnDistributionId: 'E2049NOS2OZD9B'
  ]
]

node {
  // setBuildProperties()
  try {
    stage('Checkout & Setup') {
      checkoutCode(NODE_VERSION)
    }
    
    stage('Code Sanity') {
      doCodeSanity(NODE_VERSION)
    }

    // stage('Tests') {
    //   runUnitTests(NODE_VERSION)
    // }

    stage('Ship Baby Ship!') {
      if(!params.mergeCode) {
        utilObj = new Utils()
        utilObj.runCmd('yarn build', NODE_VERSION)

        def s3Path = "/freshworks-ui-kit"

        uploadAssetsToS3('dist', "s3://${STATIC_ASSETS[BRANCH_NAME].bucketName}${s3Path}", 'us-east-1', true)
        invalidateCDN(STATIC_ASSETS[BRANCH_NAME].cdnDistributionId, s3Path)
      }
    }

    stage('Publish Reports') {
      publishHTMLReport()
    }

    if(BRANCH_NAME != 'release') {
      def nextStage = (BRANCH_NAME == 'dev' ? 'Staging' : 'Release');
      stage('Promote to ' + "$nextStage") {
        mergeCode(NODE_VERSION);
      }
    }

    currentBuild.result = 'SUCCESS'
  } catch(any) {
      currentBuild.result = 'FAILURE'
      claimBuild()
      throw any
  } finally {
      // sendEmail()
      deleteDir()
  }
}
