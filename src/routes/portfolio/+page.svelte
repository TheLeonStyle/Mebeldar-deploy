<script>
  const { data } = $props();
  // Теперь в data лежат данные сайта и их тут можно использовать
  
	import Intro from '$lib/components/Portfolio/Intro.svelte';
	import Portfolio from '$lib/components/Portfolio/Portfolio.svelte';
	import Feedback from '$lib/components/Portfolio/Feedback.svelte';
</script>

<Intro />
<Portfolio portfolio={data} />
<Feedback />
