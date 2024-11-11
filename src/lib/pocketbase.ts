import PocketBase from "pocketbase";
import { writable, get } from "svelte/store";

export const pb = new PocketBase("https://lonely-cloth.pockethost.io/");
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log(auth)
    currentUser.set(pb.authStore.model);
});

export function getUser() {
    //@ts-ignore
    return pb.collection('users').getOne(get(currentUser).id)
}
