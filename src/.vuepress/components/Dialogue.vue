<template>
   <div class="dialogue-container">
       <div class="dialogue-text"> 
         {{ crayonsDialogue }}
       </div>
   </div>
</template>

<script>
export default {
    name: 'dialogue',
    data() {
       return {
         crayonsDialogue: 'Crayons-icon is an svg-icon library and tooling for developers who build apps for us.Crayons Icon librray is an offshoot from the main Crayons project and provides icon assets and respective tooling to make use of icons perfromant.'
       };
    },
}
</script>

<style lang="scss">
  .dialogue-container {
    margin-top: 5%;
    width: 100%;
    height: 115px;
    background: #ebf1fc;
    border-radius: 10px;

    .dialogue-text {
      padding: 1.5625rem 1.125rem;
      line-height: 30px;
      color: #666;
      font-family: 'National-Book', sans-serif;
      font-size: 14.5px;
      font-weight: 300;

      &::before {
        content: 'Introduction:';
        color: #4d4d4d;
        font-weight: 600;
      }
    }
  }

  @media only screen and (max-width: 48rem) {
    .dialogue-container {
      margin: 5% auto;
      width: 80%;
      min-height: 200px;
      background: #ebf1fc;
      border-radius: 10px;

      .dialogue-text {
        line-height: 30px;
        color: #666;
        font-family: 'National-Book', sans-serif;
        font-size: 3vw;
        font-weight: 300;

        &::before {
          content: 'Introduction:';
          color: #4d4d4d;
          font-weight: 600;
        }
      }
    }
  }

  @media only screen and (max-width: 27rem) {
    .dialogue-container {
      margin: 5% auto;
      width: 90%;
      min-height: 200px;
      background: #ebf1fc;
      border-radius: 10px;

      .dialogue-text {
        line-height: 30px;
        color: #666;
        font-family: 'National-Book', sans-serif;
        font-size: 3vw;
        font-weight: 300;

        &::before {
          content: 'Introduction:';
          color: #4d4d4d;
          font-weight: 600;
        }
      }
    }
  }
</style>
