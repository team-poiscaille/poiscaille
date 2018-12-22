 <template>
   <div class="Factory">
     <h1 class="Factory__title">
       생산 세포
     </h1>

     <div class="Factory__counts">
       x <input class="Input Factory__input" type="number" max="99" min="1" v-model="counts" @change="padZero">
     </div>

     <div class="Factory__ingredients" v-for="i in 3">
       <div class="Factory__ingredient">
         <div class="Factory__dnaicon">
           <i class="mdi mdi-dna"></i>
           {{i}}
         </div>

         <transition name="Ingredient">
           <dna-slot class="Factory__dna" key="dna" :dna="ingredients[i]" v-if="ingredients[i]"></dna-slot>
           <div class="Factory__dna Factory__dna--empty" key="empty" v-else></div>
         </transition>
       </div>

       <div class="Factory__formula" v-if="i !== 3">
         +
       </div>
     </div>

     <div class="Factory__result">
       <div class="Factory__preview" :style="factoryColor">
       </div>

       <div class="Factory__nutrients">
         {{needNutrients}} / {{nutrients}}
       </div>
     </div>
   </div>
 </template>
