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
         crayonsDialogue: 'Crayons is a design library for developers who build apps for us. Through pre-built components, Crayons offers control and flexibility to build rich interfaces consistent with the Freshworks product design and experience.'
       };
    },
}
</script>

<style lang="scss">
  .dialogue-container {
      margin-top: 5%;
      width: 100%;
      height: 115px;
      background: #EBF1FC;
      border-radius: 10px;
      .dialogue-text {
          color: #4D4D4D;
          padding: 1.5625rem 3.125rem;
          line-height: 30px;
          color: #666666;
          font-family: National-Book;
          font-size: 14.5px;
          font-weight: 300;
          &:before {
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
      background: #EBF1FC;
      border-radius: 10px;
      .dialogue-text {
          color: #4D4D4D;
          line-height: 30px;
          color: #666666;
          font-family: National-Book;
          font-size: 1.5rem;
          font-weight: 300;
          &:before {
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
      background: #EBF1FC;
      border-radius: 10px;
      .dialogue-text {
          color: #4D4D4D;
          line-height: 30px;
          color: #666666;
          font-family: National-Book;
          font-size: 1.25vh;
          font-weight: 300;
          &:before {
            content: 'Introduction:';
            color: #4d4d4d;
            font-weight: 600;
          }
      }
    }
  }  
</style>
