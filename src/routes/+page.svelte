<script>
	import Booking from '$lib/pages/Booking.svelte';
	import SignIn from '$lib/pages/SignIn.svelte';
	import { currentUser, pb } from '$lib/pocketbase';
</script>

{#if $currentUser}
	<Booking></Booking>
{:else}
	<SignIn></SignIn>
{/if}
