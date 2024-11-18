<script>
	import { pb } from '$lib/pocketbase';
	import { convertIcalToJson } from '$lib/utils/calendar';
	import { Button, Input, InputGroup, Label, Spinner } from '@sveltestrap/sveltestrap';

	let formData = new FormData();
	let files = $state();

	let loading = $state(false);
	let success = $state(false);
	let fileRecord = pb.collection('settings').getOne('__schedule_conf');

	async function submitFile() {
		loading = true;

		formData.set('file', Array.from(files)[0]);
		console.log(formData.get('file'));

		// @ts-ignore
		formData.set('value', JSON.stringify(convertIcalToJson(await formData.get('file').text())));

		await pb.collection('settings').update('__schedule_conf', formData);

		loading = false;
		success = true;
	}
</script>

<div class="container">
	{#await fileRecord then}
		<!-- svelte-ignore a11y_missing_attribute -->
		<iframe
			id="open-web-calendar"
			style="background:url('https://raw.githubusercontent.com/niccokunzmann/open-web-calendar/master/static/img/loaders/circular-loader.gif') center center no-repeat;"
			src="https://open-web-calendar.hosted.quelltext.eu/calendar.html?url=https%3A%2F%2Flonely-cloth.pockethost.io%2Fapi%2Ffiles%2Fsettings%2F__schedule_conf%2Fschool_schedule_manual_6JbU9pkt4E.ics"
			sandbox="allow-scripts allow-same-origin allow-top-navigation"
			allowTransparency="true"
			scrolling="no"
			frameborder="0"
			height="600px"
			width="100%"
		></iframe>
	{/await}
	<Label>Upload a New Calendar</Label>
	<InputGroup>
		<Input type="file" bind:files></Input>
		<Button onclick={submitFile} color="primary">
			{#if loading}
				<Spinner size="sm"></Spinner>
			{:else}
				Submit
			{/if}
		</Button>
	</InputGroup>

	{#if success}
		<Label color="success">Submitted successfully.</Label>
	{/if}
</div>

<style>
	.container {
		margin-top: 2rem;
	}
</style>
