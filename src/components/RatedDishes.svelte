<script lang="ts">
  import { onMount } from 'svelte';
  import CardDishSvelte from '../components/CardsDishes/CardDishSvelte.svelte';
  import type { Dish } from '../interface/dish';
  
  // Definimos el tipo en TypeScript
  type DishRating = {
    id: string;
    rating: number;
  };
  
  // Recibe todos los platos como prop
  export let dishes: Dish[] = [];
  
  // Estado para los platos con rating
  let dishesRating: Dish[] = [];
  
  // Estado de carga
  let loading = true;
  let checked = false;
  
  onMount(() => {
    // Simulamos un pequeño retraso para mostrar el loader (puedes ajustar según necesidad)
    setTimeout(() => {
      try {
        // Este código solo se ejecuta en el navegador
        const savedRatingsStr = localStorage.getItem('dishRatingsList');
        const savedRatings: DishRating[] = savedRatingsStr ? JSON.parse(savedRatingsStr) : [];
        
        if (savedRatings && savedRatings.length > 0) {
          // Crear un array temporal para evitar problemas con proxies
          let tempDishesRating: Dish[] = [];
          
          savedRatings.forEach(dishRate => {
            const dishIndex = dishes.findIndex(dish => dishRate.id === dish._id);
            
            if (dishIndex !== -1) {
              // Crear una copia del plato para evitar problemas con proxies
              let dishCopy = {...dishes[dishIndex]};
              dishCopy.userRating = dishRate.rating;
              tempDishesRating.push(dishCopy);
            }
            console.log(tempDishesRating)
          });
          
          // Actualizar el estado una vez procesados todos los platos
          dishesRating = tempDishesRating;
        }
      } catch (error) {
        console.error('Error al cargar ratings:', error);
        dishesRating = [];
      } finally {
        loading = false;
        checked = true;
      }
    }, 800); // Tiempo de espera para el loader
  });
</script>

<div class="ratings-container ">
  {#if loading}
    <div class="loading-container">
      <div class="loader">
        <div class="loader-inner"></div>
      </div>
      <p class="loading-text">Buscando tus platillos favoritos...</p>
    </div>
  {:else if dishesRating.length > 0}
    <div class="rated-dishes">
      <h2 class="section-title">Tus platos calificados</h2>
      <div class="dishes-grid">
        {#each dishesRating as dish (dish._id)}
          <CardDishSvelte {dish} />
        {/each}
      </div>
    </div>
  {:else if checked}
    <div class="no-ratings">
      <div class="empty-state">
        <div class="icon-container">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="empty-title">¡Aún no tienes platos calificados!</h3>
        <p class="empty-description">
          Explora nuestro menú y dale estrellas a tus platos favoritos para encontrarlos fácilmente después.
        </p>
        <a href="/menu" class="explore-button">
          Explorar el menú
          <svg class="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </a>
      </div>
    </div>
  {/if}
</div>

<style>
  .ratings-container {
    min-height: calc(100vh - 71.2px );
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 2rem 1rem;
  }
  
  /* Estilos para el loader */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
  }
  
  .loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;
    border: 3px solid rgba(166, 124, 82, 0.2);
  }
  
  .loader-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border-top: 3px solid var(--color-accent);
    animation: rotate 0.8s linear infinite;
  }
  
  .loading-text {
    margin-top: 1.5rem;
    color: var(--color-text);
    font-size: 1.1rem;
  }
  
  /* Estilos para la lista de platos */
  .rated-dishes {
    width: 100%;
    max-width: 1200px;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--color-text);
    position: relative;
    display: inline-block;
    padding-bottom: 0.5rem;
  }
  
  .section-title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: var(--color-accent);
  }
  
  .dishes-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(1, 1fr);
  }
  
  /* Estilos para el estado vacío */
  .no-ratings {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 600px;
    padding: 2rem;
  }
  
  .empty-state {
    background-color: var(--color-primary);
    border-radius: 1rem;
    padding: 3rem 2rem;
    text-align: center;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease;
  }
  
  .empty-state:hover {
    transform: translateY(-5px);
  }
  
  .icon-container {
    background-color: var(--color-secondary);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  
  .empty-icon {
    width: 40px;
    height: 40px;
    color: var(--color-accent);
  }
  
  .empty-title {
    font-size: 1.5rem;
    color: var(--color-text);
    margin-bottom: 1rem;
  }
  
  .empty-description {
    color: var(--color-text);
    opacity: 0.8;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  .explore-button {
    display: flex;
    align-items: center;
    background-color: var(--color-accent);
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 2rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .explore-button:hover {
    background-color: var(--color-text);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .arrow-icon {
    width: 20px;
    height: 20px;
    margin-left: 0.5rem;
  }
  
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  /* Responsive */
  @media (min-width: 640px) {
    .dishes-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .dishes-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>