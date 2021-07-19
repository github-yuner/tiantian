<!--  -->
<template>
   <div class='loader'>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
   </div>
</template>

<script>
export default {
    name:'Loading' 
}

</script>

<style scoped>
body{
    margin : 0;
}
  
.loader {
    position : absolute;
    top : 50%;
    left : 40%;
    margin-left : 10%;
    transform : translate3d(-50%,-50%,0);
}

@keyframes slide {
     0% {
        transform : scale(1);
     } 50% {
         opacity: .3;
         transform : scale(2);
     } 10% {
         transform : scale(1);
     }
}

.dot {
    width : 24px;
    height : 24px;
    background : #3ac;
    border-radius : 100%;
    display : inline-block;
    animation : slide 1s infinite;
}
.loader .dot:nth-child(1) {
    animation-delay : .1s;
    background : #32aacc;
}
.loader .dot:nth-child(2) {
    animation-delay : .2s;
    background :#68adce;
}
.loader .dot:nth-child(3) {
    animation-delay : .3s;
    background : #a2b3d1;
}
.loader .dot:nth-child(4) {
    animation-delay : .4s;
    background : #d6c2db;
}
.loader .dot:nth-child(5) {
    animation-delay : .5s;
    background : #fbb0d1;
}


</style>