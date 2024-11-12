<script>
	import SignInWithGoogle from '$lib/components/SignInWithGoogle.svelte';
	import { pb } from '$lib/pocketbase';
	import {
		Button,
		Form,
		Input,
		Modal,
		ModalBody,
		ModalFooter,
		Navbar,
		NavbarBrand
	} from '@sveltestrap/sveltestrap';

	let showAdminModal = $state(false);
	let adminEmail = $state('');
	let adminPassword = $state('');

	let signInAsAdmin = () => {
		pb.collection('users').authWithPassword(adminEmail, adminPassword);
	};

	let signInWithGoogle = async () => {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
		await pb.collection('users').update(authData.record.id, {
			// @ts-ignore
			name: authData.meta.rawUser.name
		});
	};
</script>

<Navbar color="primary-subtle">
	<NavbarBrand>Tate Library Room Manager</NavbarBrand>
</Navbar>
<div class="container container-div">
	<h2 id="header">Sign In</h2>
	<SignInWithGoogle clickHandler={signInWithGoogle}></SignInWithGoogle>
	<Button color="link" onclick={() => {showAdminModal = true}}>Administrator Sign-In</Button>
</div>

<Modal isOpen={showAdminModal}>
	<div class="modal-header">
		<h5>Sign in as Administrator</h5>
	</div>
	<ModalBody>
		<Form>
			<Input type="email" placeholder="Email" bind:value={adminEmail} class="mb-1"></Input>
			<Input type="password" placeholder="Password" bind:value={adminPassword}></Input>
		</Form>
	</ModalBody>
	<ModalFooter>
		<Button color="secondary" onclick={() => {showAdminModal = false}}>Cancel</Button>
		<Button color="primary" onclick={signInAsAdmin}>Submit</Button>
	</ModalFooter>
</Modal>

<style>
	#header {
		padding-bottom: 2%;
	}

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
</style>
