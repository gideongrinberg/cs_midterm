<script>
	// @ts-nocheck

	import { pb } from '$lib/pocketbase';
	import { Button } from '@sveltestrap/sveltestrap';
	import TableLayout from './TableLayout.svelte';
</script>

{#snippet cell(bookings, room, period, date)}
	{#if Object.keys(bookings).includes(`${room}-${period}`)}
		<p>Booked by {bookings[`${room}-${period}`].name}</p>
		<p>
			<a href="mailto:{bookings[`${room}-${period}`]['email']}">Email</a>
		</p>
	{:else}
		Available
	{/if}
	<style>
		p, a{
			padding-bottom: 0;
			margin-bottom: 0px;
		}
	</style>
{/snippet}

<TableLayout children={cell}></TableLayout>
