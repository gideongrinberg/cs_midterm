<script>
	import Main from '$lib/pages/Main.svelte';
	import SignIn from '$lib/pages/SignIn.svelte';
	import { currentUser, pb } from '$lib/pocketbase';
</script>

{#if $currentUser}
	<Main></Main>
{:else}
	<SignIn></SignIn>
{/if}
