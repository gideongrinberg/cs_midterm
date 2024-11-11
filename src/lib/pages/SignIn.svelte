<script>
	import SignInWithGoogle from '$lib/components/SignInWithGoogle.svelte';
	import { pb } from '$lib/pocketbase';
	import { Navbar, NavbarBrand } from '@sveltestrap/sveltestrap';

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
    <a href="/">Administrator Sign-In</a>
</div>

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
