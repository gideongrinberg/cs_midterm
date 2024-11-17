<script>
	import { DateInput } from 'date-picker-svelte';
	import { Button, Table } from '@sveltestrap/sveltestrap';
	import { getUser, pb } from '$lib/pocketbase';
	import { Spinner } from '@sveltestrap/sveltestrap';

	import BookingButton from '$lib/components/BookingButton.svelte';

	let { children } = $props();

	let periods = ['A', 'B', 'C', 'D', 'E'];
	let selectedDate = $state(new Date());

	async function getBookings() {
		const list = await pb.collection('bookings').getList(1, 40, {
			filter: `date="${selectedDate.toLocaleDateString()}"`
		});

		console.log(list);

		let bookings = {};
		list['items'].forEach((booking) => {
			// @ts-ignore
			bookings[`${booking['room']}-${booking['period']}`] = {
				name: booking['name'],
				email: booking['email'],
				id: booking['id']
			};
		});

		return bookings;
	}
	async function getRooms() {
		return await pb.collection('settings').getOne('_rooms_settings');
	}
</script>

<div class="container container-div">
	<h1 class="text-center">Meeting Room Calendar</h1>
	<div class="date-wrapper">
		<DateInput
			placeholder={selectedDate.toISOString()}
			bind:value={selectedDate}
			format="MM/dd/yyyy"
		></DateInput>
	</div>
	<div class="table-wrapper">
		{#await Promise.all([getBookings(), getRooms()])}
			<Spinner size="lg" color="primary" type="border"></Spinner>
		{:then [bookings, _rooms]}
			{@const rooms = _rooms['value']}
			<Table>
				<thead>
					<tr>
						<th>Period</th>
						{#each rooms as room}
							<th>{room['name']}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each periods as period}
						<tr>
							<th scope="row">{period}</th>
							{#each rooms as room}
								<td>
									<!-- <BookingButton bookings={bookings} room={room} period={period}></BookingButton> -->
									{@render children(bookings, room["name"], period, selectedDate)}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</Table>
		{/await}
	</div>
</div>

<style>
	.container-div {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		justify-content: center;

		min-height: 85vh;
		max-width: 100vw;

		overflow: auto;
	}

	.table-wrapper {
		overflow-x: auto;
		width: 100%;
	}
	.date-wrapper {
		--icon-position: 0.75rem;
		--icon-width: 1rem;
		--icon-date: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(65, 84, 98)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E");
	}
	.date-wrapper :global(.date-time-field input[type='text']) {
		padding-right: calc(var(--icon-width) + var(--icon-position));
		background-image: var(--icon-date);
		background-position: center right var(--icon-position);
		background-size: var(--icon-width) auto;
		background-repeat: no-repeat;
	}
</style>
