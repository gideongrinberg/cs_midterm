<script>
	import Booking from '$lib/pages/main/Booking.svelte';
	import Main from '$lib/pages/Main.svelte';
	import SignIn from '$lib/pages/SignIn.svelte';
	import { currentUser, pb } from '$lib/pocketbase';
</script>

{#if $currentUser}
	<!-- <Booking></Booking> -->
	 <Main></Main>
{:else}
	<SignIn></SignIn>
{/if}
