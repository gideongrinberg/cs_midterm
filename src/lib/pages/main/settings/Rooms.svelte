<script>
	import { pb } from '$lib/pocketbase';
	import { Spinner } from '@sveltestrap/sveltestrap';

	let loading = $state(false);
	let success = $state(false);

	let rooms = $state([{ name: '', capacity: '' }]);

	const addRoom = () => {
		rooms = [...rooms, { name: '', capacity: '' }];
	};

	const submitForm = async () => {
		loading = true;

		await pb.collection('settings').update('_rooms_settings', {
			value: JSON.stringify(rooms)
		});

		loading = false;
		success = true;
	};
</script>

<div class="container">
	<h1 class="mb-4">Room Management</h1>
	<form onsubmit={submitForm}>
		{#each rooms as room, index}
			<div class="row g-3 mb-3">
				<div class="col-md-6">
					{#if index === 0}
						<label for={`roomName${index}`} class="form-label">Room Name</label>
					{/if}
					<input
						type="text"
						class="form-control"
						id={`roomName${index}`}
						bind:value={rooms[index].name}
						placeholder="Enter room name"
						required
					/>
				</div>
				<div class="col-md-4">
					{#if index === 0}
						<label for={`capacity${index}`} class="form-label">Capacity</label>
					{/if}
					<input
						type="number"
						class="form-control"
						id={`capacity${index}`}
						bind:value={rooms[index].capacity}
						placeholder="Enter capacity"
						required
					/>
				</div>
			</div>
		{/each}

		<button type="button" class="btn btn-secondary" onclick={addRoom}> Add Another Room </button>
		{#if loading == false}
			<button type="submit" class="btn btn-primary">Submit</button>
		{:else}
			<Spinner color="primary" size="md"></Spinner>
		{/if}

		{#if success}
			<p class="text-success">Successfully submitted</p>
		{/if}
	</form>
</div>

<style>
	.container {
		margin-top: 2rem;
	}
</style>
