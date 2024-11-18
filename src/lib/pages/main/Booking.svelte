<script>
	import { Button, Modal, ModalBody, ModalFooter } from '@sveltestrap/sveltestrap';
	import TableLayout from './TableLayout.svelte';
	import { writable } from 'svelte/store';
	import { getUser, pb } from '$lib/pocketbase';

	let displayModal = writable(false);
	let displaySuccess = writable(false);

	let selectedRoom = writable('000');
	let selectedPeriod = writable('Z');
	let selectedDate = writable(new Date());
	// @ts-ignore
	function createBooking(room, period, date) {
		getUser().then((user) => {
			pb.collection('bookings').create({
				index: `${date.toLocaleDateString()}${period}${room}`,
				name: user['name'],
				email: user['email'],
				room: room,
				period: period,
				date: date.toLocaleDateString()
			});

			$displaySuccess = true;
			setTimeout(() => {
				$displayModal = false;
				$displaySuccess = false;
			}, 3000);
		});
	}
</script>

{#snippet button(bookings, room, period, date)}
	<Button
		disabled={Object.keys(bookings).includes(`${room}-${period}`)}
		color={Object.keys(bookings).includes(`${room}-${period}`) ? 'secondary' : 'primary'}
		onclick={() => {
			$selectedRoom = room;
			$selectedPeriod = period;
			$selectedDate = date;
			$displayModal = true;
		}}
	>
		Book
	</Button>
{/snippet}

<TableLayout children={button}></TableLayout>

<Modal isOpen={$displayModal}>
	<div class="modal-header">
		<h5 class="modal-title">Confirm Booking</h5>
	</div>
	<ModalBody>
		You are booking room <strong>{$selectedRoom}</strong> for
		<strong>{$selectedPeriod} band</strong>
		on <strong>{$selectedDate.toLocaleDateString()}</strong>
	</ModalBody>
	<ModalFooter>
		{#if $displaySuccess}
			<p class="text-success">Booking successful</p>
		{:else}
			<Button
				color="secondary"
				on:click={() => {
					$displayModal = false;
				}}>Cancel</Button
			>
			<Button
				color="primary"
				on:click={() => {
					console.log(`${$selectedRoom} ${$selectedPeriod}`);
					createBooking($selectedRoom, $selectedPeriod, $selectedDate);
				}}>Confirm</Button
			>
		{/if}
	</ModalFooter>
</Modal>
