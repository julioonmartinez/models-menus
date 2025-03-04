<!-- src/components/Counter.svelte -->
<script>
    let count = 0;
  
    function increment() {
      count += 1;
    }
  </script>
  
  <style>
    button {
      background-color: #646cff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #535bf2;
    }
  </style>
  
  <h1>Contador: {count}</h1>
  <button on:click={increment}>Incrementar</button>