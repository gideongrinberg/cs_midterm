<script>
	import { Button } from '@sveltestrap/sveltestrap';

	let { bookings, room, period } = $props();
</script>

<Button
	disabled={bookings.includes(`${room}-${period}`)}
	color={bookings.includes(`${room}-${period}`) ? 'secondary' : 'primary'}
	onclick={() => {
		alert(`Activated: ${room} for ${period} band.`);
	}}
>
	Book
</Button>
