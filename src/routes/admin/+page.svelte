<script>
	// @ts-nocheck

	import { DateInput } from 'date-picker-svelte';
	import {
		Button,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Modal,
		ModalBody,
		ModalHeader,
		ModalFooter,
		Navbar,
		NavbarBrand,
		Table
	} from '@sveltestrap/sveltestrap';
	import { currentUser, getUser, pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { Spinner } from '@sveltestrap/sveltestrap';

	const rooms = ['301', '302', '303', '304', '305', '306', '307', '308'];
	const periods = ['A', 'B', 'C', 'D', 'E'];

	let selectedDate = $state(new Date());

	async function isBooked(room, period) {
		try {
			console.log(`"${selectedDate.toLocaleDateString()}${period}${room}"`);
			let booking = await pb
				.collection('bookings')
				.getFirstListItem(`index = "${selectedDate.toLocaleDateString()}${period}${room}"`);
			return booking;
		} catch (error) {
			return false;
		}
	}
</script>

<div class="container container-div">
	<h1 class="text-center">Study Room Calendar</h1>
	<div class="date-wrapper">
		<DateInput
			placeholder={selectedDate.toISOString()}
			bind:value={selectedDate}
			format="MM/dd/yyyy"
		></DateInput>
	</div>
	<div class="table-wrapper">
		<Table>
			<thead>
				<tr>
					<th>Band</th>
					{#each rooms as room}
						<th>{room}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each periods as period}
					<tr>
						<th scope="row">{period}</th>
						{#each rooms as room}
							{#await isBooked(room, period)}
								<td> <Spinner size="sm" color="primary" type="border"></Spinner> </td>
							{:then booking}
								<td>
                                    {#if !booking}
                                        <strong>Available</strong>
                                    {:else}
                                        <p>Booked by <strong>{booking["name"]}</strong></p>
                                    {/if}
								</td>
							{/await}
						{/each}
					</tr>
				{/each}
			</tbody>
		</Table>
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
