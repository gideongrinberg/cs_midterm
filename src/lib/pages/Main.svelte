<script>
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

	function signout() {
		pb.authStore.clear();
	}

	let user = $state(getUser());
	onMount(async () => {
		user = getUser();
	});

	let viewState = $state('booking');
</script>

{#await user}
	<div class="d-flex align-items-center justify-content-center vh-100">
		<Spinner size="lg" color="primary" type="border"></Spinner>
	</div>
{:then user}
	<Navbar color="primary-subtle" expand="md" container="md">
		<NavbarBrand>Meeting Room Manager</NavbarBrand>
		<Nav class="ms-auto" navbar>
			{#if user['isAdmin']}
				<NavItem>
					<NavLink
						onclick={() => {
							viewState = 'booking';
						}}>Booking Calendar</NavLink
					>
				</NavItem>
				<NavItem>
					<NavLink
						onclick={() => {
							viewState = 'admin';
						}}>View Bookings</NavLink
					>
				</NavItem>
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
	{/if}
{/await}
