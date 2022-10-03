<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ion-thumbnail class="w-14 h-14 rounded-full">
        <img src="/mypic.png">
      </ion-thumbnail>

    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonThumbnail } from '@ionic/vue';
</script>
