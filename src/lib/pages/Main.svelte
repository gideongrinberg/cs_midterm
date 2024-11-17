<script>
	// @ts-nocheck

	import {
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Navbar,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink
	} from '@sveltestrap/sveltestrap';
	import { getUser, pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { Spinner } from '@sveltestrap/sveltestrap';
	import Booking from './main/Booking.svelte';
	import Admin from './main/Admin.svelte';
	import Settings from './main/Settings.svelte';

	function signout() {
		pb.authStore.clear();
	}

	let user = $state(getUser());
	onMount(async () => {
		user = getUser();
	});

	let viewState = $state('booking');
</script>

{#snippet navroute(text, route)}
	<NavItem>
		<NavLink
			onclick={() => {
				viewState = route;
			}}>{text}</NavLink
		>
	</NavItem>
{/snippet}

{#await user}
	<div class="d-flex align-items-center justify-content-center vh-100">
		<Spinner size="lg" color="primary" type="border"></Spinner>
	</div>
{:then user}
	<Navbar color="primary-subtle" expand="md" container="md">
		<NavbarBrand>Meeting Room Manager</NavbarBrand>
		<Nav class="ms-auto" navbar>
			{@render navroute('Booking Calendar', 'booking')}
			{#if user['isAdmin']}
				{@render navroute('View Bookings', 'admin')}
				{@render navroute('Settings', 'settings')}
			{/if}
			<Dropdown>
				<DropdownToggle nav caret>{user['name']}</DropdownToggle>
				<DropdownMenu end>
					<DropdownItem onclick={signout}>Sign Out</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</Nav>
	</Navbar>
	{#if viewState == 'booking'}
		<Booking></Booking>
	{:else if viewState == 'admin'}
		<Admin></Admin>
	{:else if viewState == 'settings'}
		<Settings></Settings>
	{/if}
{/await}
