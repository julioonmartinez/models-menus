<script lang="ts">
    import { onMount } from 'svelte';
    import type { Dish } from '../../interface/dish';
    import SavedSvelte from '../MicroComponents/SavedSvelte.svelte';
    import RatingSvelte from '../MicroComponents/RatingSvelte.svelte';
    // Recibe el plato como prop
    export let dish : Dish;
    
    // Variable reactiva para la calificación del usuario
    let userRating = 0;
    
    // Función para obtener la calificación del usuario desde localStorage
    // function getUserRating() {
    //   try {
    //     const savedRatingsStr = localStorage.getItem('dishRatings');
    //     if (savedRatingsStr) {
    //       const savedRatings = JSON.parse(savedRatingsStr);
    //       const userRatingObj = savedRatings.find(rating => rating.id === dish._id);
    //       return userRatingObj ? userRatingObj.rating : (dish.rating || 0);
    //     }
    //   } catch (error) {
    //     console.error('Error al obtener rating:', error);
    //   }
    //   return dish.rating || 0;
    // }
    
    // Elemento visible para animación
    let visible = false;
    
    onMount(() => {
      // Obtener calificación cuando el componente se monta
    //   userRating = getUserRating();
      
      // Hacer visible con un pequeño delay para la animación
      setTimeout(() => {
        visible = true;
      }, 100);
    });
  </script>
  
  <div class="grid grid-rows-2 card-content menu-item rounded-xl bg-[var(--color-primary)] overflow-hidden" 
       class:visible={visible}>
    <div class="image h-40 w-full bg-cover bg-center bg-no-repeat relative" 
         style="background-image: url({dish.urlImg})">
      <div class="content-rating absolute top-2 right-2">
        <!-- Componente de estrellas para mostrar la calificación del usuario -->
        <div class="stars-container">
          <RatingSvelte id={dish._id!} rating={dish.userRating || 0 } ></RatingSvelte>
        </div>
      </div>
      <div class="absolute flex items-center justify-between bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
        <h3 class="text-xl font-bold">{dish.name}</h3>
       <SavedSvelte isSaved={dish.userFav} id={dish._id!}  title={dish.name}  ></SavedSvelte>
      </div>
    </div>
    <div class="p-4 flex flex-col h-full justify-between">
      <p class="text-description">{dish.shortDescription}</p>
      <div class="flex justify-between items-center">
        <span class="font-bold text-2xl text-accent">${dish.price}</span>
        <a href={`/dishes/${dish._id}`} class="view-button">
          Ver
        </a>
      </div>
    </div>
  </div>
  
  <style>
    .menu-item {
      opacity: 0;
      transform: scale(0.8);
      transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease;
    }
    
    .menu-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    }
    
    .menu-item.visible {
      opacity: 1;
      transform: scale(1);
    }
    
    .text-description {
      color: var(--color-text);
    }
    
    .text-accent {
      color: var(--color-accent);
    }
    
    .view-button {
      padding: 0.5rem 2rem;
      border-radius: 9999px;
      background-color: var(--color-accent);
      color: var(--color-primary);
      transition: background-color 0.2s;
    }
    
    .view-button:hover {
      opacity: 0.9;
    }
    
  </style>