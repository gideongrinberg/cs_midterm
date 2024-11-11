// @ts-nocheck
import PocketBase from "pocketbase/cjs";

const pb = new PocketBase("https://lonely-cloth.pockethost.io");

async function main() {
    await pb.collection("users").authWithPassword("test@example.com", "xGnNGAO9uNF7mwF");
    const list = await pb.collection("bookings").getList(1, 40, {
        filter: `date="${new Date().toLocaleDateString()}"`
    });

    console.log(list)

    let bookings = []
    list["items"].forEach(booking => {
        bookings.push(`${booking["room"]}-${booking["period"]}`);
    });

    return bookings;
}

main().then((bookings) => {
    console.log(bookings)
})